from rest_framework import serializers
from .models import ChatUser, Chat, Message, MultiChat

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class MultiChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultiChat
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = '__all__'
    messages = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = '__all__'

    def get_messages(self, obj):
        recent_messages = obj.messages.order_by('date')
        return MessageSerializer(recent_messages, many=True).data

class ChatSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'title', 'llm', 'date']


class ChatUserSerializer(serializers.ModelSerializer):
    chats = ChatSummarySerializer(many=True, read_only=True)

    class Meta:
        model = ChatUser
        fields = '__all__'