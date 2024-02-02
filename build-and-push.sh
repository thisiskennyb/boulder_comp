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

# DOCKERHUB_UNAME=thisiskennyb

BASE_URL=$1
NEW_VERSION=$2
DOCKERHUB_UNAME=$3


docker build --build-arg VITE_BASE_URL=$BASE_URL -t $DOCKERHUB_UNAME/book_club_webserver-prod:$NEW_VERSION -f webserver/Dockerfile . --no-cache
docker push $DOCKERHUB_UNAME/book_club_webserver-prod:$NEW_VERSION

# docker build -t VITE_BASE_URL=$BASE_URL $DOCKERHUB_UNAME/book_club_webserver-prod:$NEW_VERSION -f webserver/Dockerfile . --no-cache
# docker push $DOCKERHUB_UNAME/book_club_webserver-prod:$NEW_VERSION

docker build -t $DOCKERHUB_UNAME/book_club_api-prod:$NEW_VERSION -f backend/Dockerfile ./backend --no-cache
docker push $DOCKERHUB_UNAME/book_club_api-prod:$NEW_VERSION