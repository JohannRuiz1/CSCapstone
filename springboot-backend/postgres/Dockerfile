FROM postgres:16.3

COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
COPY ./seed.sql /docker-entrypoint-initdb.d/seed.sql

ENV POSTGRES_DB=vtrc
ENV POSTGRES_PASSWORD=mypass
ENV POSTGRES_USER=postgres

EXPOSE 5432
