#!/bin/sh

# The Dockerhub account where the images are stored
export DOCKERHUB_UNAME=$7

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export DEBUG=$2
# export POSTGRES_DB=$3
# export POSTGRES_USER=$4
# export POSTGRES_PASSWORD=$5
export NEW_VERSION=$6


docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec boulder_comp-api-1 python /src/manage.py makemigrations 
docker exec boulder_comp-api-1 python /src/manage.py migrate