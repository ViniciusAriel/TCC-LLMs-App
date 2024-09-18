from .models import Message, Chat, ChatUser
from datetime import datetime
import os
from dotenv import load_dotenv, find_dotenv

# from langchain_community.chat_models import ChatOpenAI
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

from langchain_ollama.chat_models import ChatOllama

_ = load_dotenv(find_dotenv())

chat_open_ai = ChatOpenAI(temperature=0.0, model="gpt-3.5-turbo")

llama_key = os.getenv('LLAMA_API_KEY')
chat_ollama = ChatOllama(model="llama3.1", api_key=llama_key)

def get_chat_response(prompt, chat_id):
        template_string = """{text}"""

        prompt_template = ChatPromptTemplate.from_template(template_string)
        llm_prompt = prompt_template.format_messages(text=prompt)

        # chat_response = chat_open_ai(prompt)
        # chat_response = chat_ollama(llm_prompt)
        chat_response = "Opa meu patrão"
        chat_message = Message()
        chat_message.chat = Chat.objects.filter(pk=chat_id).first()
        chat_message.content = chat_response
        chat_message.sender_is_llm = True
        chat_message.date = datetime.now()

        chat_message.save()