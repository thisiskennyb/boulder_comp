# Need to add api key and url environment variables?

export SECRET_KEY=abc123
export DEBUG=True
export POSTGRES_DB=boulder_comp
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export EMAIL=kendbonnette@gmail.com
export GMAIL_APP_PASSWORD="vnhx rzwo owhq retc"
export DB_NAME=db
export DB_PORT=5432
export HOST=localhost:80
# export VITE_HOST=$1
# export DJANGO_HOST=$2





COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10
docker exec boulder_comp-api-1 python /src/manage.py makemigrations 
docker exec boulder_comp-api-1 python /src/manage.py migrate