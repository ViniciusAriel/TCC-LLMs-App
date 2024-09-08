from django.db import models

# Create your models here.

class ChatUser(models.Model):
    name = models.CharField(max_length=225, null=False, blank=False)
    email = models.EmailField(max_length=255, unique=True, null=False, blank=False)

    def __str__(self):
        return str(self.name)
    
class Chat(models.Model):
    user_id = models.PositiveBigIntegerField(unique=True)
    llm = models.CharField(max_length=255, null=False)
    title = models.CharField(max_length=255)
    date = models.DateField()

    def __str__(self):
        return str(self.title)

class Message(models.Model):
    chat_id = models.PositiveBigIntegerField()
    content = models.CharField(max_length=1024)
    sender_is_llm = models.BooleanField(blank=False)
    date = models.DateField()

    def __str__(self):
        return str(self.content)