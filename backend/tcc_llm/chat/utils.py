from .models import Message, Chat, ChatUser, LLM
from datetime import datetime
import os
from dotenv import load_dotenv, find_dotenv
import json
from copy import copy

from langchain.prompts import ChatPromptTemplate

from langchain_openai.chat_models import ChatOpenAI
from langchain_mistralai.chat_models import ChatMistralAI
from langchain_groq import ChatGroq

from comet import download_model, load_from_checkpoint
from evaluate import load

_ = load_dotenv(find_dotenv())

openai_key = os.getenv('OPENAI_API_KEY')
llama_key = os.getenv('LLAMA_API_KEY')
mistral_key = os.getenv('MISTRAL_API_KEY')
groq_key = os.getenv('GROQ_API_KEY')

# os.environ["HF_ALLOW_CODE_EVAL"] = "1"` 
# Essa linha de código deve ser descomentada ao utilizar a métrica HumanEval
# A métrica existe para executar código gerado por modelos não confiáveis
# não sendo recomendado a sua execução em ambientes não seguros e robusto.
# Antes de rodar a métrica tome as devidas precauções.
# Utilize por sua própria conta e risco

# Seleciona a LLM sendo usada
def select_llm(llm_type):
        if llm_type == LLM.GROQ_GEMMA:
                llm = ChatGroq(model="gemma-7b-it", api_key=groq_key)
        elif llm_type == LLM.GROQ_GEMMA_2:
                llm = ChatGroq(model="gemma2-9b-it", api_key=groq_key)
        elif llm_type == LLM.GROQ_LLAMA_3_8B:
                llm = ChatGroq(model="llama3-8b-8192", api_key=groq_key)
        elif llm_type == LLM.GROQ_LLAMA_3_70B:
                llm = ChatGroq(model="llama3-70b-8192", api_key=groq_key)
        elif llm_type == LLM.GROQ_LLAMA_3_1_8B:
                llm = ChatGroq(model="llama-3.1-8b-instant", api_key=groq_key)
        elif llm_type == LLM.GROQ_LLAMA_3_1_70B:
                llm = ChatGroq(model="llama-3.1-70b-versatile", api_key=groq_key)
        elif llm_type == LLM.GROQ_LLAMA_3_2_1B:
                llm = ChatGroq(model="llama-3.2-1b-preview", api_key=groq_key)
        elif llm_type == LLM.GROQ_LLAMA_3_2_3B:
                llm = ChatGroq(model="llama-3.2-3b-preview", api_key=groq_key)
        elif llm_type == LLM.GROQ_MIXTRAL:
                llm = ChatGroq(model="mixtral-8x7b-32768", api_key=groq_key)
        elif llm_type == LLM.MISTRAL_NEMO:
                llm = ChatMistralAI(model_name="open-mistral-nemo", api_key=mistral_key)
        elif llm_type == LLM.MISTRAL_SMALL:
                llm = ChatMistralAI(api_key=mistral_key)
        elif llm_type == LLM.MISTRAL_PIXTRAL:
                llm = ChatMistralAI(model_name="pixtral-12b-2409", api_key=mistral_key)
        elif llm_type == LLM.GPT_3_5:
                llm = ChatOpenAI(model="gpt-3.5-turbo", api_key=openai_key)
        else:
                llm = ChatGroq(model="llama-3.1-8b-instant", api_key=groq_key)

        return llm


def get_chat_response(prompt, chat_id, llm_type, prompt_array, is_main_llm):

        llm = select_llm(llm_type=llm_type)

        # Prepara o prompt array para o ChatPromptTemplate
        prompt_messages = [(item["role"], item["content"]) for item in prompt_array]

        # Adiciona a mensagem final do usuário
        prompt_messages.append(('human', '{text}'))

        # Cria o template do prompt com as mensagens
        prompt_template = ChatPromptTemplate(prompt_messages)

        # Cria a chain e chama a resposta do llm
        llm_chain = prompt_template | llm
        chat_response = llm_chain.invoke({'text': prompt}).content

        # Prepara a mensagem para salvar
        chat_message = Message()
        chat_message.chat = Chat.objects.filter(pk=chat_id).first()
        chat_message.content = chat_response
        chat_message.sender_is_llm = True
        chat_message.sender_is_main_llm = is_main_llm
        chat_message.date = datetime.now()

        chat_message.save()
        return chat_message

def duplicate_messages(messages, new_chat):
        for message in messages:
                if(not message.sender_is_llm):
                        new_user_message = Message()
                        new_user_message.chat = new_chat
                        new_user_message.content = message.content
                        new_user_message.sender_is_llm = False
                        new_user_message.date = datetime.now()

                        new_user_message.save()

                        get_chat_response(prompt=message.content, chat_id=new_chat.id)

def create_chat_log(messages):
        data = { "instances": [] }

        message_data = {}

        for message in messages:
                if not message.sender_is_llm:
                        message_data = {}
                        message_data["id"] = 0
                        message_data["input"] = message.content
                elif message.sender_is_main_llm:
                        message_data["expected_output"] = [message.content]
                else:
                        message_data["actual_output"] = message.content
                        data["instances"].append(message_data)

        return data

def calculate_bertscore_metric(messages):
        bertscore = load("bertscore")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append(message.content)

        results = bertscore.compute(predictions=predictions, references=references, model_type="distilbert-base-uncased")

        return results

def calculate_bleu_metric(messages):
        bleu = load("bleu")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append([message.content])
                else:
                        predictions.append(message.content)

        results = bleu.compute(predictions=predictions, references=references)
        return results["bleu"]

def calculate_cer_metric(messages):
        cer = load("cer")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append(message.content)

        results = cer.compute(predictions=predictions, references=references)
        return results

def calculate_character_metric(messages):
        character = load("character")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append(message.content)

        results = character.compute(predictions=predictions, references=references)
        return results["cer_score"]

def calculate_chrf_metric(messages):
        chrf = load("chrf")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append([message.content])
                else:
                        predictions.append(message.content)

        results = chrf.compute(predictions=predictions, references=references)
        return results["score"]

def calculate_codeeval_metric(messages):
        code_eval = load("code_eval")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append([message.content])

        results = code_eval.compute(predictions=predictions, references=references, k=[1])
        return results

def calculate_comet_metric(messages):
        data = []

        message_data = {}

        for message in messages:
                if not message.sender_is_llm:
                        message_data["src"] = message.content
                elif message.sender_is_main_llm:
                        message_data["ref"] = message.content
                else:
                        message_data["mt"] = message.content
                        data.append(message_data)

        model_path = download_model("Unbabel/wmt22-comet-da")
        model = load_from_checkpoint(model_path)

        model_output = model.predict(data, batch_size=8, gpus=1)

        return model_output.system_score

def calculate_google_bleu_metric(messages):
        google_bleu = load("google_bleu")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append([message.content])

        results = google_bleu.compute(predictions=predictions, references=references)
        return results

def calculate_meteor_metric(messages):
        meteor = load("meteor")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append(message.content)

        results = meteor.compute(predictions=predictions, references=references)
        return results

def calculate_rouge_score(messages):
        rouge = load("rouge")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append(message.content)

        results = rouge.compute(predictions=predictions, references=references)
        return results

def calculate_sacrebleu_metric(messages):
        sacrebleu = load("sacrebleu")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append(message.content)

        results = sacrebleu.compute(predictions=predictions, references=references)
        return results
                        
def calculate_ter_metric(messages):
        ter = load("ter")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append([message.content])
                else:
                        predictions.append(message.content)

        results = ter.compute(predictions=predictions, references=references)
        return results["score"]

def calculate_wer_metric(messages):
        wer = load("wer")

        predictions = []
        references = []

        for message in messages:
                if not message.sender_is_llm:
                        continue
                elif message.sender_is_main_llm:
                        references.append(message.content)
                else:
                        predictions.append(message.content)

        results = wer.compute(predictions=predictions, references=references)
        return results

def create_harpia_log(data_str, prompt_array, llm_choices):
        data_array = []

        data = json.loads(data_str)

        for llm_name in llm_choices:
                llm_data = {}
                llm_instances = []

                llm = select_llm(llm_type=llm_name)

                for instance in data["instances"]:
                        # Prepara o prompt array para o ChatPromptTemplate
                        prompt_messages = [(item["role"], item["content"]) for item in prompt_array]

                        # Adiciona a mensagem final do usuário
                        prompt_messages.append(('human', '{text}'))

                        # Cria o template do prompt com as mensagens
                        prompt_template = ChatPromptTemplate(prompt_messages)

                        # Cria a chain e chama a resposta do llm
                        llm_chain = prompt_template | llm
                        chat_response = llm_chain.invoke({'text': instance["input"]}).content

                        print("RESPONSE:")
                        print(chat_response)

                        new_instance = copy(instance)
                        new_instance["actual_output"] = chat_response
                        llm_instances.append(new_instance)

                llm_data["instances"] = copy(llm_instances)
                llm_data["metrics"] = data["metrics"] if "metrics" in data else []
                llm_data["llm_model"] = llm_name
                copied_data = copy(llm_data)
                data_array.append(copied_data)
        
        return data_array
