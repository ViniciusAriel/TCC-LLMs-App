from django.shortcuts import render
from django.http import HttpResponse
import os

# Create your views here.

# class ChatView(ModelViewSet)

def index(request):
    file_path = os.path.join('..', '..', 'frontend', 'public', 'index.html')

    with open(file_path, 'r') as file:
            html_content = file.read()
    return HttpResponse(html_content)