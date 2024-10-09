from django.shortcuts import render
from django.http import HttpResponse
from django.http import FileResponse
from django.http import JsonResponse
import os
import json

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import ChatUser, Chat, Message
from .serializers import ChatUserSerializer, ChatSerializer, MessageSerializer
from .utils import get_chat_response, duplicate_messages, create_chat_log

# Create your views here.

class ChatView(ModelViewSet):
     
     serializer_class = ChatSerializer;
      
     def retrieve(self, request, pk):
          queryset = Chat.objects.filter(pk=pk).first()

          if not queryset:
               return Response(status=status.HTTP_404_NOT_FOUND)
          
          serializer = ChatSerializer(queryset)

          return Response(serializer.data, status=status.HTTP_200_OK)

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
               chat_response = get_chat_response(message_content, body_data.get("chat"))
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