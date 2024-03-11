#!/bin/sh

# The Dockerhub account where the images are stored


# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=abc123
export DEBUG=False
# export HOST=${BASE_URL}
export POSTGRES_DB=boulder_comp


export DOCKERHUB_UNAME=$1
export NEW_VERSION=$2

export POSTGRES_USER=$3
export POSTGRES_PASSWORD=$4
export DB_PORT=$5


export EMAIL=$6
export GMAIL_APP_PASSWORD=$7
export AWS_ACCESS_KEY_ID=$8
export AWS_SECRET_ACCESS_KEY=$9
export BUCKET_NAME=${10}




COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec boulder_comp-api-1 python /src/manage.py makemigrations 
docker exec boulder_comp-api-1 python /src/manage.py migrate