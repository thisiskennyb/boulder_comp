#!/bin/sh

# The Dockerhub account where the images are stored


# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=abc123
export DEBUG=False
export POSTGRES_DB=boulder_comp

## Less sensitive variables above

## Sensitive variables that should be injected and shared with no one

export DOCKERHUB_UNAME=$1
export NEW_VERSION=$2
export HOST=$3

export POSTGRES_USER=$4
export POSTGRES_PASSWORD=$5
export DB_PORT=$6

export EMAIL=$7
export GMAIL_APP_PASSWORD=$8
export AWS_ACCESS_KEY_ID=$9
export AWS_SECRET_ACCESS_KEY=${10}
export BUCKET_NAME=${11}




COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec boulder_comp-api-1 python /src/manage.py makemigrations 
docker exec boulder_comp-api-1 python /src/manage.py migrate