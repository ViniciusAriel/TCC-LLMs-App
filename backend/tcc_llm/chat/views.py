from django.shortcuts import render
from django.http import HttpResponse
import os

# Create your views here.

def index(request):
    # return render(request, '../frontend/public/index.html')
    file_path = os.path.join('..', '..', 'frontend', 'public', 'index.html')

    with open(file_path, 'r') as file:
            html_content = file.read()
    return HttpResponse(html_content)