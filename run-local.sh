#!/bin/bash

# Ensure all the environment variables are defined in .env file (See README in the backend directory)

# Navigate to root directory
cd "$(dirname "$0")"

# Navigate to backend directory
cd backend || exit

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
sleep 3 &

# Navigate to frontend directory
cd ../frontend || exit

# Install frontend dependencies
npm install
sleep 3

# Run frontend server
npm run dev
