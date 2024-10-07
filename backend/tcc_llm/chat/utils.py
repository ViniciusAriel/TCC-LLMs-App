from .models import Message, Chat, ChatUser
from datetime import datetime
import os
from dotenv import load_dotenv, find_dotenv
import json

from langchain.prompts import ChatPromptTemplate

from langchain_openai import OpenAI
from langchain_ollama.chat_models import ChatOllama
from langchain_mistralai.chat_models import ChatMistralAI

_ = load_dotenv(find_dotenv())

openai_key = os.getenv('OPENAI_API_KEY')
llama_key = os.getenv('LLAMA_API_KEY')
mistral_key = os.getenv('MISTRAL_API_KEY')

chat_openai = OpenAI(model="gpt-3.5-turbo", api_key=openai_key)
chat_ollama = ChatOllama(model="llama3.1", api_key=llama_key)
chat_mistral = ChatMistralAI(api_key=mistral_key)

template_string = """{text}"""
prompt_template = ChatPromptTemplate.from_template(template_string)

openai_chain = prompt_template | chat_openai
llama_chain = prompt_template | chat_ollama
mistral_chain = prompt_template | chat_mistral

def get_chat_response(prompt, chat_id):
        llm_prompt = prompt_template.format_messages(text=prompt)

        # chat_response = openai_chain.invoke(llm_prompt).content
        # chat_response = llama_chain.invoke(llm_prompt).content
        chat_response = mistral_chain.invoke(llm_prompt).content

        chat_message = Message()
        chat_message.chat = Chat.objects.filter(pk=chat_id).first()
        chat_message.content = chat_response
        chat_message.sender_is_llm = True
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
                        message_data["expected_output"] = []
                else:
                        message_data["actual_output"] = message.content
                        data["instances"].append(message_data)

        return data