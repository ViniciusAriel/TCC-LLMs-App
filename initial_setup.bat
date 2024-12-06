cd .\backend\
python -m venv env_llm
call .\env_llm\Scripts\activate.bat

call .\env_llm\Scripts\pip.exe install -r requirements.txt

cd .\tcc_llm\
python ./manage.py makemigrations
python ./manage.py migrate

cd ..\..\frontend\
call npm install