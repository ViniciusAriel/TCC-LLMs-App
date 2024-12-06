@echo off

REM Check for Python
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Python is installed.
) else (
    echo Python is not installed. Please install Python.
    exit /b 1
)

REM Check for PostgreSQL
sc query | findstr /i "postgresql"
if %ERRORLEVEL% equ 0 (
    echo PostgreSQL service is running.
) else (
    echo PostgreSQL is not installed or running.
    exit /b 1
)


REM Check for Node.js
where node >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Node.js is installed.
) else (
    echo Node.js is not installed. Please install Node.js.
    exit /b 1
)

cd .\backend\
python -m venv env
call .\env\Scripts\activate.bat

call .\env\Scripts\pip.exe install -r requirements.txt

cd .\tcc_llm\
python ./manage.py makemigrations
python ./manage.py migrate

cd ..\..\frontend\
call npm install