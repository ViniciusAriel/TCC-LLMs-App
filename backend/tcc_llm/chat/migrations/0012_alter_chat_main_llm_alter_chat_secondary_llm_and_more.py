# Generated by Django 4.2.16 on 2024-12-06 18:30

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0011_harpialog_alter_chat_user_id_alter_message_chat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='main_llm',
            field=models.CharField(choices=[('GPT 3.5', 'Gpt 3 5'), ('Gemma', 'Groq Gemma'), ('Gemma 2', 'Groq Gemma 2'), ('Llama 3 8b', 'Groq Llama 3 8B'), ('Llama 3 70b', 'Groq Llama 3 70B'), ('Llama 3.1 8b', 'Groq Llama 3 1 8B'), ('Llama 3.1 70b', 'Groq Llama 3 1 70B'), ('Llama 3.2 1b', 'Groq Llama 3 2 1B'), ('Llama 3.2 3b', 'Groq Llama 3 2 3B'), ('Mixtral 8x7b', 'Groq Mixtral'), ('Mistral Nemo', 'Mistral Nemo'), ('Mistral Small', 'Mistral Small'), ('Pixtral 12b', 'Mistral Pixtral')]),
        ),
        migrations.AlterField(
            model_name='chat',
            name='secondary_llm',
            field=models.CharField(choices=[('GPT 3.5', 'Gpt 3 5'), ('Gemma', 'Groq Gemma'), ('Gemma 2', 'Groq Gemma 2'), ('Llama 3 8b', 'Groq Llama 3 8B'), ('Llama 3 70b', 'Groq Llama 3 70B'), ('Llama 3.1 8b', 'Groq Llama 3 1 8B'), ('Llama 3.1 70b', 'Groq Llama 3 1 70B'), ('Llama 3.2 1b', 'Groq Llama 3 2 1B'), ('Llama 3.2 3b', 'Groq Llama 3 2 3B'), ('Mixtral 8x7b', 'Groq Mixtral'), ('Mistral Nemo', 'Mistral Nemo'), ('Mistral Small', 'Mistral Small'), ('Pixtral 12b', 'Mistral Pixtral')], default='Groq'),
        ),
        migrations.AlterField(
            model_name='harpialog',
            name='llms_to_use',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('GPT 3.5', 'Gpt 3 5'), ('Gemma', 'Groq Gemma'), ('Gemma 2', 'Groq Gemma 2'), ('Llama 3 8b', 'Groq Llama 3 8B'), ('Llama 3 70b', 'Groq Llama 3 70B'), ('Llama 3.1 8b', 'Groq Llama 3 1 8B'), ('Llama 3.1 70b', 'Groq Llama 3 1 70B'), ('Llama 3.2 1b', 'Groq Llama 3 2 1B'), ('Llama 3.2 3b', 'Groq Llama 3 2 3B'), ('Mixtral 8x7b', 'Groq Mixtral'), ('Mistral Nemo', 'Mistral Nemo'), ('Mistral Small', 'Mistral Small'), ('Pixtral 12b', 'Mistral Pixtral')], max_length=50), blank=True, default=list, size=None),
        ),
    ]
