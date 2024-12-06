# TCC - Desenvolvimento de um Ambiente Integrado para Testes de Múltiplas LLMs no Mesmo Contexto

## Requisitos
Para a realizações de testes e posteriormente alterações no projeto, é necessário a instalação do Node Js, Python e PostgresSQL
- NodeJS: https://nodejs.org/en/download/package-manager
- Python: https://www.python.org/downloads/
- PostgresSQL: https://www.postgresql.org/download/

## Como Rodar Nosso Sistema
```
git clone https://github.com/ViniciusAriel/TCC-LLMs-App.git
cd ./frontend
npm install
npm start

Subir a database criada do PostgresSQL pelo terminal SQLShell ou PgAdmin.
Alterar o nome da database e o user em backend/tcc_llm/tcc_llm/settings.py.

cd ../backend

Criar um arquivo '.env' na pasta backend/tcc_llm/tcc_llm e adicionar uma variável para ser a senha de acesso ao banco de dados.
Ela deve ser a mesma senha configurada ao baixar o postgres.
Exemplo:
DATABASE_PASSWORD='MY_POSTGRES_PASSWORD123'

Criar um arquivo '.env' na pasta backend/tcc_llm/chat e adicionar as chaves de API para cada LLM desejado.
Exemplo:
MISTRAL_API_KEY=<SUA_CHAVE_MISTRAL>
GROQ_API_KEY=<SUA_CHAVE_GROQ>
LLAMA_API_KEY=<SUA_CHAVE_LLAMA>
OPENAI_API_KEY=<SUA_CHAVE_OPENAI>

Opcional: criar um ambiente virtual para instalar os pacotes sem conflitos
pip install virtualenv
virtualenv env
env/Scripts/activate

pip install -r requirements.txt
cd tcc_llm
python ./manage.py makemigrations
python ./manage.py migrate
python ./manage.py runserver
```
