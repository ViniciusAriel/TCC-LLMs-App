# TCC - Desenvolvimento de um Ambiente Integrado para Testes de Múltiplas LLMs no Mesmo Contexto

## Requisitos
Para a realizações de testes e posteriormente alterações no projeto, é necessário a instalação do Node Js, Python e PostgresSQL
- NodeJS: https://nodejs.org/en/download/package-manager
- Python: https://www.python.org/downloads/
- PostgresSQL: https://www.postgresql.org/download/

## Setup Inicial
```
Clonar o arquivo em um diretório pelo comando: git clone https://github.com/ViniciusAriel/TCC-LLMs-App.git
Em um terminal, execute o arquivo 'initial_setup.bat' na pasta TCC-LLMs-APP pelo comando: ./initial_setup.bat
```

## Como Rodar Nosso Sistema
```
Criar um arquivo '.env' na pasta backend/tcc_llm/tcc_llm e adicionar uma variável para ser a senha de acesso ao banco de dados.
Ela deve ser a mesma senha configurada ao baixar o postgres.
Exemplo:
DATABASE_PASSWORD='MY_POSTGRES_PASSWORD123'

Subir a database criada do PostgresSQL pelo terminal SQLShell ou PgAdmin.
Alterar o nome da database e o user em backend/tcc_llm/tcc_llm/settings.py.

Criar um arquivo '.env' na pasta backend/tcc_llm/chat e adicionar as chaves de API para cada LLM desejado.
Exemplo:
MISTRAL_API_KEY=<SUA_CHAVE_MISTRAL>
GROQ_API_KEY=<SUA_CHAVE_GROQ>
LLAMA_API_KEY=<SUA_CHAVE_LLAMA>
OPENAI_API_KEY=<SUA_CHAVE_OPENAI>

Num terminal, executar:
cd ./frontend
npm start

Numa outra aba de terminal executar

cd ./backend
env_llm/Scripts/activate

cd ./tcc_llm
python ./manage.py runserver
```
