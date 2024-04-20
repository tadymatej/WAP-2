#!/bin/bash

# Define environment variables
POSTGRES_DB=schools
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_CONTAINER_NAME=my_postgres_container2

# Run the SQL script
cat db/schools.sql | docker exec -i $POSTGRES_CONTAINER_NAME psql -U $POSTGRES_USER -d $POSTGRES_DB