
##########################################################################
##########################################################################
### These are the environment variables docker-compose.dev.yml expects ###
export POSTGRES_DB=boulder_comp
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export HOST=localhost:80
export DB_NAME=db
export DB_PORT=5432



### The Above variables are not necessarily sensitive ###
###     So you may leave some values hard coded       ###
### In production, you will need to pass all of these ###

### So you may consider making your dev and prod scripts match ###
## The prod script will additionally need the container address and image version ###
#####################################################################################
### These are sensitive and should get injected at runtime and shared with no one ###
export EMAIL=$1
export GMAIL_APP_PASSWORD=$2
export AWS_ACCESS_KEY_ID=$3
export AWS_SECRET_ACCESS_KEY=$4
export BUCKET_NAME=$5







COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10
docker exec boulder_comp-api-1 python /src/manage.py makemigrations 
docker exec boulder_comp-api-1 python /src/manage.py migrate