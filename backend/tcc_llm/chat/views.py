from django.shortcuts import render
from django.http import HttpResponse
import os

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import ChatUser, Chat, Message
from .serializers import ChatUserSerializer, ChatSerializer, MessageSerializer

# Create your views here.

class ChatView(ModelViewSet):
      
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

class UserView(ModelViewSet):
     
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
     
     def create(self, request):
         serializer = MessageSerializer(data=request.data)

         if not serializer.is_valid():
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
         
         queryset = Message.objects.create(**serializer.validated_data)
         serializer = MessageSerializer(queryset)

         return Response(serializer.data, status=status.HTTP_201_CREATED)
     
def index(request):
    file_path = os.path.join('..', '..', 'frontend', 'public', 'index.html')

    with open(file_path, 'r') as file:
            html_content = file.read()
    return HttpResponse(html_content)