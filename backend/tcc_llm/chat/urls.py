from django.urls import path
from .import views
from .views import ChatView, UserView, MessageView, HarpiaLogView

urlpatterns = [
    path('', views.index, name="index"),

    path('chat/<int:pk>', ChatView.as_view(actions={"get": "retrieve", "delete": "delete"})),
    path('user/<int:pk>', UserView.as_view(actions={"get": "retrieve"})),

    path('user/create', UserView.as_view(actions={"post": "create"})),
    path('chat/create', ChatView.as_view(actions={"post": "create"})),
    path('message/create', MessageView.as_view(actions={"post": "create"})),

    path('chat/duplicate/<int:pk>', ChatView.as_view(actions={"post": "duplicate"})),
    path('chat/download_log/<int:pk>', ChatView.as_view(actions={"get": "download_log"})),
    path('chat/prompt/<int:pk>', ChatView.as_view(actions={"put": "edit_prompt", "get": "get_prompt"})),

    path('chat/comet_metric/<int:pk>', ChatView.as_view(actions={"get": "comet_metric"})),
    path('chat/bertscore_metric/<int:pk>', ChatView.as_view(actions={"get": "bertscore_metric"})),
    path('chat/bleu_metric/<int:pk>', ChatView.as_view(actions={"get": "bleu_metric"})),
    path('chat/cer_metric/<int:pk>', ChatView.as_view(actions={"get": "cer_metric"})),

    path('harpia/log_input', HarpiaLogView.as_view(actions={"post": "upload_tests"})),
]