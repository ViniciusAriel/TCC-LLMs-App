from .models import Message, Chat, ChatUser, LLM
from datetime import datetime
import os
from dotenv import load_dotenv, find_dotenv
import json

from langchain.prompts import ChatPromptTemplate

from langchain_openai import OpenAI
from langchain_ollama.chat_models import ChatOllama
from langchain_mistralai.chat_models import ChatMistralAI
from langchain_groq import ChatGroq

_ = load_dotenv(find_dotenv())

openai_key = os.getenv('OPENAI_API_KEY')
llama_key = os.getenv('LLAMA_API_KEY')
mistral_key = os.getenv('MISTRAL_API_KEY')
groq_key = os.getenv('GROQ_API_KEY')


def get_chat_response(prompt, chat_id, llm_type, prompt_array, is_main_llm):

        # Seleciona a LLM sendo usada
        if llm_type == LLM.MISTRAL:
                llm = ChatMistralAI(api_key=mistral_key)
        elif llm_type == LLM.OLLAMA:
                llm = ChatOllama(model="llama3.1", api_key=llama_key)
        elif llm_type == LLM.OPENAI:
                llm = OpenAI(model="gpt-3.5-turbo", api_key=openai_key)
        elif llm_type == LLM.GROQ:
                llm = ChatGroq(model="llama-3.1-8b-instant", api_key=groq_key)
        else:
                llm = ChatMistralAI(api_key=mistral_key)

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

def calculate_comet_metric(messages):
        data = []

        message_data = {}

        for message in messages:
                if not message.sender_is_llm:
                        message_data["src"] = message.content
                elif message.sendder_is_main_llm:
                        message_data["ref"] = message.content
                else:
                        message_data["mt"] = message.content

                

        return "empty"