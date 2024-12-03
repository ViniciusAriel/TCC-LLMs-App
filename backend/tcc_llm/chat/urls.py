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

    path('chat/bertscore_metric/<int:pk>', ChatView.as_view(actions={"get": "bertscore_metric"})),
    path('chat/bleu_metric/<int:pk>', ChatView.as_view(actions={"get": "bleu_metric"})),
    path('chat/cer_metric/<int:pk>', ChatView.as_view(actions={"get": "cer_metric"})),
    path('chat/character_metric/<int:pk>', ChatView.as_view(actions={"get": "character_metric"})),
    path('chat/chrf_metric/<int:pk>', ChatView.as_view(actions={"get": "chrf_metric"})),
    path('chat/codeeval_metric/<int:pk>', ChatView.as_view(actions={"get": "codeeval_metric"})),
    path('chat/comet_metric/<int:pk>', ChatView.as_view(actions={"get": "comet_metric"})),
    path('chat/googlebleu_metric/<int:pk>', ChatView.as_view(actions={"get": "google_bleu_metric"})),
    path('chat/meteor_metric/<int:pk>', ChatView.as_view(actions={"get": "meteor_metric"})),
    path('chat/rouge_metric/<int:pk>', ChatView.as_view(actions={"get": "rouge_metric"})),
    path('chat/sacrebleu_metric/<int:pk>', ChatView.as_view(actions={"get": "sacrebleu_metric"})),
    path('chat/ter_metric/<int:pk>', ChatView.as_view(actions={"get": "ter_metric"})),
    path('chat/wer_metric/<int:pk>', ChatView.as_view(actions={"get": "wer_metric"})),

    path('chat/single_message_metric/<int:pk>', ChatView.as_view(actions={"post": "analyse_single_message"})),

    path('harpia/log_input', HarpiaLogView.as_view(actions={"post": "upload_tests"})),
]