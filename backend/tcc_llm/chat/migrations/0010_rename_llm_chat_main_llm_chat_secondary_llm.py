# Generated by Django 4.2.16 on 2024-10-31 14:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0009_remove_chat_is_main_llm_remove_chat_secondary_llm_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chat',
            old_name='llm',
            new_name='main_llm',
        ),
        migrations.AddField(
            model_name='chat',
            name='secondary_llm',
            field=models.CharField(choices=[('MistralAI', 'Mistral'), ('Ollama', 'Ollama'), ('OpenAI', 'Openai'), ('Groq', 'Groq')], default='Groq'),
        ),
    ]
