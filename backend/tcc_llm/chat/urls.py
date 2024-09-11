from django.urls import path
from .import views
from .views import ChatView, UserView

urlpatterns = [
    path('', views.index, name="index"),
    path('chat/<int:pk>', ChatView.as_view(actions={"get": "retrieve"})),
    path('user/<int:pk>', UserView.as_view(actions={"get": "retrieve"})),
]