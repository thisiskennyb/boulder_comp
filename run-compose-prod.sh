#!/bin/sh

# The Dockerhub account where the images are stored


# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.

#####################################
export POSTGRES_DB=boulder_comp
export POSTGRES_USER=postgres
export PRODUCTION=true
#####################################

## Less sensitive variables above

## Sensitive variables that should be injected and shared with no one

#################################
#################################
export DOCKERHUB_UNAME=$1
export NEW_VERSION=$2
export HOST=$3

export DB_PASS=$4

export EMAIL=$5
export GMAIL_APP_PASSWORD=$6

export AWS_ACCESS_KEY_ID=$7
export AWS_SECRET_ACCESS_KEY=$8
export BUCKET_NAME=$9
#################################
#################################


COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec boulder_comp-api-1 python /src/manage.py makemigrations 
docker exec boulder_comp-api-1 python /src/manage.py migrate
docker exec boulder_comp-api-1 python /src/manage.py loaddata boulders_usa