from django.db import models
from django.contrib.postgres.fields import ArrayField

def default_prompt():
    return [
  {
    "role": "system",
    "content": "Traduza as mensagens do português para o inglês, dando como resposota apenas a frase traduzida"
  },
  {
    "role": "human",
    "content": "Olá, bom dia!"
  },
  {
    "role": "ai",
    "content": "Hello, good morning!"
  }
]

# Create your models here.

class LLM(models.TextChoices):
    DATABRICKS_DBRX = 'Databricks DBRX'
    GPT_3_5_TURBO = 'GPT 3.5 Turbo'
    GPT_4 = 'GPT 4'
    GPT_4_TURBO = 'GPT 4 Turbo'
    GPT_4O = 'GPT 4o'
    GPT_4O_MINI = 'GPT 4o Mini'
    GROQ_GEMMA = 'Gemma'
    GROQ_GEMMA_2 = 'Gemma 2'
    GROQ_LLAMA_3_8B = 'Llama 3 8b'
    GROQ_LLAMA_3_70B = 'Llama 3 70b'
    GROQ_LLAMA_3_1_8B = 'Llama 3.1 8b'
    GROQ_LLAMA_3_1_70B = 'Llama 3.1 70b'
    GROQ_LLAMA_3_2_1B = 'Llama 3.2 1b'
    GROQ_LLAMA_3_2_3B = 'Llama 3.2 3b'
    GROQ_MIXTRAL = 'Mixtral 8x7b'
    MISTRAL_NEMO = 'Mistral Nemo'
    MISTRAL_SMALL = 'Mistral Small'
    MISTRAL_PIXTRAL = 'Pixtral 12b'
    UPSTAGE_SOLAR = 'Upstage SOLAR 10.7b'
    QWEN_2_5_7B = 'Qwen 2.5 7B Turbo'

class ChatUser(models.Model):
    name = models.CharField(max_length=225, null=False, blank=False)
    email = models.EmailField(max_length=255, unique=True, null=False, blank=False)

    def __str__(self):
        return str(self.name)
    
class Chat(models.Model):
    user_id = models.ForeignKey(ChatUser, related_name='chats', on_delete=models.CASCADE, default=1)
    main_llm = models.CharField(choices=LLM.choices, null=False)
    secondary_llm = models.CharField(choices=LLM.choices, null=False, default='Groq')
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    prompt = models.JSONField(default=default_prompt)

    def __str__(self):
        return str(self.title)

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE, default=1)
    content = models.CharField(max_length=4096)
    sender_is_llm = models.BooleanField(blank=False)
    sender_is_main_llm = models.BooleanField(blank=False, default=False)
    date = models.DateTimeField()

    def __str__(self):
        return str(self.content)
    

class HarpiaLog(models.Model):
    log_file = models.FileField(upload_to='uploads/')
    llms_to_use = ArrayField(models.CharField(max_length=50, choices=LLM.choices), blank=True, default=list)
    prompt = models.JSONField(default=default_prompt)

    def __str__(self):
        return "json file"