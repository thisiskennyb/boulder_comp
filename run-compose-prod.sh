#!/bin/sh

# The Dockerhub account where the images are stored


# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export DEBUG=$2
export NEW_VERSION=$3
export DOCKERHUB_UNAME=$4
export HOST=$5
export POSTGRES_DB=$6
export POSTGRES_USER=$7
export POSTGRES_PASSWORD=$8
export DB_PORT=$9
export EMAIL=${10}
export GMAIL_APP_PASSWORD=${11}
export AWS_ACCESS_KEY_ID=${12}
export AWS_SECRET_ACCESS_KEY=${13}
export BUCKET_NAME=${14}



COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec boulder_comp-api-1 python /src/manage.py makemigrations 
docker exec boulder_comp-api-1 python /src/manage.py migrate