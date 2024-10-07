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

cd ../backend

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
