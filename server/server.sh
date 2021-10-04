#!/bin/bash

pip install -r requirements.txt

sudo apt-get install postgresql

sudo -u postgres psql -c "CREATE USER budgetadmin WITH PASSWORD 'asdfghjkl';"
sudo -u postgres psql -c "ALTER USER budgetadmin WITH SUPERUSER CREATEDB CREATEROLE;"
sudo -u postgres psql -c "CREATE DATABASE budgetdb OWNER  budgetadmin"

python ./budgettrackerbackend/manage.py migrate

python ./budgettrackerbackend/manage.py loaddata ./budgettrackerbackend/budgets/fixtures/fixtures.json

python ./budgettrackerbackend/manage.py crontab add

python ./budgettrackerbackend/manage.py runserver 0.0.0.0:8000
