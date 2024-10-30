from django.urls import path
from .import views
from .views import ChatView, UserView, MessageView

urlpatterns = [
    path('', views.index, name="index"),

    path('chat/<int:pk>', ChatView.as_view(actions={"get": "retrieve", "delete": "delete"})),
    path('user/<int:pk>', UserView.as_view(actions={"get": "retrieve"})),

    path('user/create', UserView.as_view(actions={"post": "create"})),
    path('chat/create', ChatView.as_view(actions={"post": "create"})),
    path('message/create', MessageView.as_view(actions={"post": "create"})),

    path('chat/duplicate/<int:pk>', ChatView.as_view(actions={"post": "duplicate"})),
    path('chat/download_log/<int:pk>', ChatView.as_view(actions={"get": "download_log"})),
    path('chat/edit_prompt/<int:pk>', ChatView.as_view(actions={"put": "edit_prompt"})),
]