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
]