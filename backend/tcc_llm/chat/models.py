from django.db import models

def default_prompt():
    return [
        ("system", "Responda as mensagens"),
        ("human", "Olá, tudo bem?"),
        ("ai", "Olá! Como posso ajudar?"),
    ]

# Create your models here.

class LLM(models.TextChoices):
    MISTRAL = 'MistralAI'
    OLLAMA = 'Ollama'
    OPENAI = 'OpenAI'
    GROQ = 'Groq'

class ChatUser(models.Model):
    name = models.CharField(max_length=225, null=False, blank=False)
    email = models.EmailField(max_length=255, unique=True, null=False, blank=False)

    def __str__(self):
        return str(self.name)
    
class Chat(models.Model):
    user_id = models.ForeignKey(ChatUser, related_name='chats', on_delete=models.SET_DEFAULT, default=1)
    llm = models.CharField(choices=LLM.choices, null=False)
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    prompt = models.JSONField(default=default_prompt)

    def __str__(self):
        return str(self.title)

class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.SET_DEFAULT, default=1)
    content = models.CharField(max_length=4096)
    sender_is_llm = models.BooleanField(blank=False)
    date = models.DateTimeField()

    def __str__(self):
        return str(self.content)