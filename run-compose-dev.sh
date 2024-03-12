
##########################################################################
##########################################################################
### These are the environment variables docker-compose.dev.yml expects ###

    #  Less Sensitive variables 
#################################
export POSTGRES_DB=boulder_comp
export POSTGRES_USER=postgres
export HOST=localhost:80
export PRODUCTION=false
#################################




### The Above variables are not necessarily sensitive ###
###     So you may leave some values hard coded       ###
### In production, you will need to pass most of these ###

### So you may consider making your dev and prod scripts match ###
## The prod script will additionally need the container address and image version ###
#####################################################################################
### These are sensitive and should get injected at runtime and shared with no one ###


    # Variables to Inject
#################################
#################################
export EMAIL=$1
export GMAIL_APP_PASSWORD=$2
export AWS_ACCESS_KEY_ID=$3
export AWS_SECRET_ACCESS_KEY=$4
export BUCKET_NAME=$5
export DB_PASS=$6
#################################
#################################

# All variables exported should get consumed by docker-compose.dev.yml

########### Runs docker-compose.dev.yml with arguments that exist in script   ######################
#### Command may vary on different Machines

COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10
docker exec boulder_comp-api-1 python /src/manage.py makemigrations 
docker exec boulder_comp-api-1 python /src/manage.py migrate