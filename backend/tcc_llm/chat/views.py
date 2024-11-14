from argparse import Action
from django.shortcuts import render
from django.http import HttpResponse
from django.http import FileResponse
from django.http import JsonResponse
import os
import json
import zipfile
import io

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from .models import ChatUser, Chat, Message, HarpiaLog, default_prompt
from .serializers import ChatPromptSerializer, ChatUserSerializer, ChatSerializer, MessageSerializer, HarpiaLogSerializer
from .utils import *
from .forms import UploadFileForm

# Common used functions

def get_chat(pk):
     queryset = Chat.objects.filter(pk=pk).first()

     if not queryset:
          return Response(status=status.HTTP_404_NOT_FOUND)
          
     serializer = ChatSerializer(queryset)

     return Response(serializer.data, status=status.HTTP_200_OK)

# Create your views here.

class ChatView(ModelViewSet):
     
     serializer_class = ChatSerializer
      
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

          remaining_chats = Chat.objects.all()
          serializer = ChatSerializer(remaining_chats, many=True)

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
     
     def bertscore_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = calculate_bertscore_metric(messages)

          return Response(metric_result, status=status.HTTP_200_OK)
     
     def bleu_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = {}
          metric_result["bleu_score"] = calculate_bleu_metric(messages)

          return Response(metric_result, status=status.HTTP_200_OK)
     
     def cer_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = {}
          metric_result["cer_score"] = calculate_cer_metric(messages)
          
          return Response(metric_result, status=status.HTTP_200_OK)
     
     def character_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_results = {}
          metric_results["character_score"] = calculate_character_metric(messages)

          return Response(metric_results, status=status.HTTP_200_OK)
     
     def chrf_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_results = {}
          metric_results["chrf_score"] = calculate_chrf_metric(messages)

          return Response(metric_results, status=status.HTTP_200_OK)
     
     def comet_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = {}
          metric_result["comet"] = calculate_comet_metric(messages)

          return Response(metric_result, status=status.HTTP_200_OK)
     
     def google_bleu_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = calculate_google_bleu_metric(messages)

          return Response(metric_result, status=status.HTTP_200_OK)
     
     def meteor_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = calculate_meteor_metric(messages)

          return Response(metric_result, status=status.HTTP_200_OK)
     
     def rouge_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = calculate_rouge_score(messages)

          response_data = {}
          response_data["rouge1"] = metric_result["rouge1"]
          response_data["rouge2"] = metric_result["rouge2"]
          response_data["rougeL"] = metric_result["rougeL"]

          return Response(response_data, status=status.HTTP_200_OK)
     
     def sacrebleu_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = {}
          metric_result["sacrebleu_score"] = calculate_sacrebleu_metric(messages)["score"]

          return Response(metric_result, status=status.HTTP_200_OK)
     
     def ter_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_result = {}
          metric_result["ter_score"] = calculate_ter_metric(messages)

          return Response(metric_result, status=status.HTTP_200_OK)
     
     def wer_metric(self, request, pk):
          messages = Message.objects.filter(chat=pk)

          metric_results = {}
          metric_results["wer_score"] = calculate_wer_metric(messages)

          return Response(metric_results, status=status.HTTP_200_OK)
     
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

        # Atualiza o prompt e salva
        chat.prompt = new_prompt
        chat.save()

        # Retorna o chat atualizado
        serializer = ChatPromptSerializer(chat, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

          #main llm response
          if message_content:
               chat_id = body_data.get("chat")
               chat = get_chat(pk=chat_id)
               # llm = chat.data['llm']
               llm = chat.data['main_llm']
               prompt_array = chat.data['prompt']
               chat_response = get_chat_response(message_content, chat_id, llm, prompt_array, True)
               serializer = MessageSerializer(chat_response)
          else:
               return HttpResponse("No message content found", status=400)
          
          response_data["main_llm_response"] = serializer.data
          
          #secondary llm response
          if message_content:
               chat_id = body_data.get("chat")
               chat = get_chat(pk=chat_id)
               # llm = chat.data['llm']
               llm = chat.data['secondary_llm']
               prompt_array = chat.data['prompt']
               chat_response = get_chat_response(message_content, chat_id, llm, prompt_array, False)
               serializer = MessageSerializer(chat_response)
          else:
               return HttpResponse("No message content found", status=400)
          
          response_data["secondary_llm_response"] = serializer.data

          return Response(response_data, status=status.HTTP_201_CREATED)
     
def index(request):
    file_path = os.path.join('..', '..', 'frontend', 'public', 'index.html')

    with open(file_path, 'r') as file:
            html_content = file.read()
    return HttpResponse(html_content)

class HarpiaLogView(ModelViewSet):
     serializer_class = HarpiaLogSerializer;

     def upload_tests(self, request):
          serializer = HarpiaLogSerializer(data=request.data)
          if not serializer.is_valid():
               return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

          body_data = request.data

          file_data = body_data.get("log_file").read().decode('utf-8')
          data_array = create_harpia_log(file_data, default_prompt())

          zip_buffer = io.BytesIO()

          with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
                  # Convert each dictionary to a JSON file and add it to the ZIP archive
                  for i, llm_data in enumerate(data_array):
                          file_name = "output_" + llm_data["llm_model"] + ".json"  # Create a unique name for each file
                          json_content = json.dumps(llm_data, indent=4)  # Convert dictionary to JSON string
                          zip_file.writestr(file_name, json_content)  # Write JSON content to the ZIP file

          zip_buffer.seek(0)
          response = HttpResponse(zip_buffer, content_type="application/zip")
          response['Content-Disposition'] = 'attachment; filename="json_files.zip"'
          return response