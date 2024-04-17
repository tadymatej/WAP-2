#!/bin/bash

# Define environment variables
POSTGRES_DB=schools
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_CONTAINER_NAME=my_postgres_container5

# Pull the PostgreSQL image from Docker Hub
docker pull postgres

# Run a new container with the specified environment variables
docker run --name $POSTGRES_CONTAINER_NAME -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -e POSTGRES_USER=$POSTGRES_USER -e POSTGRES_DB=$POSTGRES_DB -p 5432:5432 -d postgres