#!/bin/bash

##############################
# This builds and pushes both the nginx/React image
# and the DRF one.  
#
# The nginx/React image gets built with an environment variable
# that sets the url of the DRF backend REACT_APP_BASE_URL.  Once you
# know the IP address of your EC2 instance, you would pass that in
# instead of localhost
##############################

DOCKERHUB_UNAME=successphil

BASE_URL=$1
NEW_VERSION=$2
# DOCKERHUB_UNAME=$3
# POSTGRES_DB=$4
# POSTGRES_USER=$5
# POSTGRES_PASSWORD=$6
# EMAIL=$7
# GMAIL_APP_PASSWORD=$8
# DB_PORT=$9
# HOST=${10}
# AWS_ACCESS_KEY_ID=${11}
# AWS_SECRET_ACCESS_KEY=${12}



docker build --build-arg VITE_BASE_URL=$BASE_URL -t $DOCKERHUB_UNAME/boulder_comp_webserver-prod:$NEW_VERSION -f webserver/Dockerfile . --no-cache
docker push $DOCKERHUB_UNAME/boulder_comp_webserver-prod:$NEW_VERSION

# docker build -t VITE_BASE_URL=$BASE_URL $DOCKERHUB_UNAME/book_club_webserver-prod:$NEW_VERSION -f webserver/Dockerfile . --no-cache
# docker push $DOCKERHUB_UNAME/book_club_webserver-prod:$NEW_VERSION

docker build -t $DOCKERHUB_UNAME/boulder_comp_api-prod:$NEW_VERSION -f backend/Dockerfile ./backend --no-cache
docker push $DOCKERHUB_UNAME/boulder_comp_api-prod:$NEW_VERSION