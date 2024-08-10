# rc-backend

## Prerequistes
- Java 17

## Starting Database

    docker compose -f docker-compose-pg.yml up -d --build

## Building

    ./gradlew clean build

## Starting application locally

    Go to 'Gradle Projects' Extension tab on the left -> vtresearchconnect -> Tasks -> application -> bootRun

## Tearing down Database

    docker compose -f docker-compose-pg.yml down -v

    Note: Keep the data in their, remove the -v flag

## Starting application in container (depends on database being up and after building)

    docker compose -f docker-compose-spring.yml up -d --build

## Tearing down application

    docker compose -f docker-compose-spring.yml down -v

## Start it all up

    docker compose up --build -d

## Login :
    curl -X POST http://localhost:8080/api/login \
    -H "Content-Type: application/json" \
    -d '{"username":"username", "password":"password"}' -i


## Testing Backend Signup Curl Command:
    curl -i -X POST http://localhost:8080/api/signup \
    -H "Content-Type: application/json" \
    -d '{"username": "user5", "password": "password5", "role": "STUDENT"}'


## testing BAckend Login using Curl command
    curl -i -X POST http://localhost:8080/api/login \
    -H "Content-Type: application/json" \
    -d '{"username": "user5", "password": "password5"}'
