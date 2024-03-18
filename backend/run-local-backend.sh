#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start the docker container with the postgres database
docker compose up -d
sleep 10

# Make migrations
python manage.py makemigrations
python manage.py migrate

# Run Django server
python manage.py runserver