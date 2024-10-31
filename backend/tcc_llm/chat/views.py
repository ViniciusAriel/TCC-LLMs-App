from django.shortcuts import render
from django.http import HttpResponse
from django.http import FileResponse
from django.http import JsonResponse
import os
import json

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import ChatUser, Chat, Message, MultiChat
from .serializers import ChatUserSerializer, ChatSerializer, MessageSerializer, MultiChatSerializer
from .utils import get_chat_response, duplicate_messages, create_chat_log

# Common used functions

def get_chat(pk):
     queryset = Chat.objects.filter(pk=pk).first()

     if not queryset:
          return Response(status=status.HTTP_404_NOT_FOUND)
          
     serializer = ChatSerializer(queryset)

     return Response(serializer.data, status=status.HTTP_200_OK)

# Create your views here.
class MultiChatView(ModelViewSet):
     serializer_class = MultiChatSerializer;

     def retrieve(seld, request, pk):
          queryset = MultiChat.objects.filter(pk=pk).first()

          if not queryset:
               return Response(status=status.HTTP_404_NOT_FOUND)
          
          serializer = MultiChatSerializer(queryset)
          return Response(serializer.data, status=status.HTTP_200_OK)
     
     def create(self, request):
          serializer = MultiChatSerializer(data=request.data)

          if not serializer.is_valid():
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          
          queryset = MultiChat.objects.create(**serializer.validated_data)
          serializer = MultiChatSerializer(queryset)
          return Response(serializer.data, status=status.HTTP_201_CREATED)
     
     def delete(self, request, pk):
          queryset = MultiChat.objects.filter(pk=pk).first()

          if not queryset:
               return Response(status=status.HTTP_404_NOT_FOUND)
          
          queryset.delete()
          serializer = MultiChatSerializer(queryset)
          return Response(serializer.data, status=status.HTTP_200_OK)
     
     def download_log(self, request, pk):
          chats = Chat.objects.filter(multichat_id=pk)

          # IMPLEMENT
          json_data = create_multi_chat_log(chats)

          return JsonResponse(json_data)
     
     def send_message(self, request, pk):
          body_data = request.data

          # serializer = MessageSerializer(data=request.data)

          # if not serializer.is_valid():
          #      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

          response_data = {}
          response_data["user_message"] = serializer.data
          llm_responses = []

          chats = Chat.objects.filter(multichat_id=pk)

          for chat in chats:
               queryset = Message.objects.create(**serializer.validated_data)
               serializer = MessageSerializer(queryset)

               message_content = body_data.get("content")

               if message_content:
                    chat_id = chat.data['id']
                    llm = chat.data['llm']
                    prompt_array = chat.data['prompt']
                    chat_response = get_chat_response(message_content, chat_id, llm, prompt_array)
                    serializer = MessageSerializer(chat_response)
               else:
                    return HttpResponse("No message content found", status=400)
               
               llm_responses.append(serializer.data)

          response_data["gold_standard_response"] = llm_responses[0]
          response_data["other_llm_responses"] = llm_responses[1:]

          return Response(response_data, status=status.HTTP_201_CREATED)
     
     def get_prompt(self, request, pk):
          chat = Chat.objects.filter(multichat_id=pk).first()
          if not chat:
               return Response({"error": "Chat not found."}, status=status.HTTP_404_NOT_FOUND)

          # Retorna o prompt
          return Response({"prompt": chat.prompt}, status=status.HTTP_200_OK)
     
     def edit_prompt(self, request, pk):
          chats = Chat.objects.filter(multichat_id=pk)

          # Obtém o novo prompt do corpo da requisição
          new_prompt = request.data["prompt"]
          if not isinstance(new_prompt, list):
               return Response({"error": "Prompt must be a list."}, status=status.HTTP_400_BAD_REQUEST)
          
          # Valida se cada item do prompt é uma tupla com duas strings
          for item in new_prompt:
               if not isinstance(item, list) or len(item) != 2 or not all(isinstance(i, str) for i in item):
                    return Response(
                    {"error": "Each prompt entry must be a list with two string elements."},
                    status=status.HTTP_400_BAD_REQUEST,
                    )

          for chat in chats:
               # Atualiza o prompt e salva
               chat.prompt = new_prompt
               chat.save()

          multichat = MultiChat.objects.filter(pk=pk).first()
          serializer = MultiChatSerializer(multichat)
          return Response(serializer.data, status=status.HTTP_200_OK)


class ChatView(ModelViewSet):
     
     serializer_class = ChatSerializer;
      
     def retrieve(self, request, pk):
          return get_chat(pk=pk)

     def create(self, request):
          serializer = ChatSerializer(data=request.data)

          if not serializer.is_valid():
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          
          queryset = Chat.objects.create(**serializer.validated_data)
          serializer = ChatSerializer(queryset)

          return Response(serializer.data, status=status.HTTP_201_CREATED)

     def delete(self, request, pk):
          queryset = Chat.objects.filter(pk=pk).first()

          if not queryset:
               return Response(status=status.HTTP_404_NOT_FOUND)

          queryset.delete()
          serializer = ChatSerializer(queryset)

          return Response(serializer.data, status=status.HTTP_200_OK)

     # duplicate a chat on another LLM, using the same inputs
     def duplicate(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          serializer = ChatSerializer(data=request.data)

          if not serializer.is_valid():
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          
          queryset = Chat.objects.create(**serializer.validated_data)
          serializer = ChatSerializer(queryset)

          duplicate_messages(messages, queryset)

          return Response(serializer.data, status=status.HTTP_201_CREATED)
     
     def download_log(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          json_data = create_chat_log(messages)

          return JsonResponse(json_data)
     
     def get_prompt(self, request, pk):
        # Recupera o chat pelo pk
        chat = Chat.objects.filter(pk=pk).first()
        if not chat:
            return Response({"error": "Chat not found."}, status=status.HTTP_404_NOT_FOUND)

        # Retorna o prompt
        return Response({"prompt": chat.prompt}, status=status.HTTP_200_OK)

     def edit_prompt(self, request, pk):
        # Recupera o chat pelo pk
        chat = Chat.objects.filter(pk=pk).first()
        if not chat:
            return Response({"error": "Chat not found."}, status=status.HTTP_404_NOT_FOUND)

        # Obtém o novo prompt do corpo da requisição
        new_prompt = request.data["prompt"]
        if not isinstance(new_prompt, list):
            return Response({"error": "Prompt must be a list."}, status=status.HTTP_400_BAD_REQUEST)

        # Valida se cada item do prompt é uma tupla com duas strings
        for item in new_prompt:
            if not isinstance(item, list) or len(item) != 2 or not all(isinstance(i, str) for i in item):
                return Response(
                    {"error": "Each prompt entry must be a list with two string elements."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Atualiza o prompt e salva
        chat.prompt = new_prompt
        chat.save()

        # Retorna o chat atualizado
        serializer = ChatSerializer(chat)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserView(ModelViewSet):
     
     serializer_class = ChatUserSerializer;
     
     def retrieve(self, request, pk):
          queryset = ChatUser.objects.filter(pk=pk).first()

          if not queryset:
               return Response(status=status.HTTP_404_NOT_FOUND)
          
          serializer = ChatUserSerializer(queryset)

          return Response(serializer.data, status=status.HTTP_200_OK)
     
     def create(self, request):
         serializer = ChatUserSerializer(data=request.data)

         if not serializer.is_valid():
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         
         queryset = ChatUser.objects.create(**serializer.validated_data)
         serializer = ChatUserSerializer(queryset)

         return Response(serializer.data, status=status.HTTP_201_CREATED)
     
class MessageView(ModelViewSet):
     
     serializer_class = MessageSerializer;
     
     def create(self, request):
          body_data = request.data

          serializer = MessageSerializer(data=request.data)

          if not serializer.is_valid():
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          
          response_data = {}
          
          queryset = Message.objects.create(**serializer.validated_data)
          serializer = MessageSerializer(queryset)

          message_content = body_data.get("content")

          response_data["user_message"] = serializer.data

          if message_content:
               chat_id = body_data.get("chat")
               chat = get_chat(pk=chat_id)
               llm = chat.data['llm']
               prompt_array = chat.data['prompt']
               chat_response = get_chat_response(message_content, chat_id, llm, prompt_array)
               serializer = MessageSerializer(chat_response)
          else:
               return HttpResponse("No message content found", status=400)

          response_data["llm_response"] = serializer.data

          return Response(response_data, status=status.HTTP_201_CREATED)
     
def index(request):
    file_path = os.path.join('..', '..', 'frontend', 'public', 'index.html')

    with open(file_path, 'r') as file:
            html_content = file.read()
    return HttpResponse(html_content)