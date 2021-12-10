#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER quizzy WITH PASSWORD '${DB_MASTER_PASS}' SUPERUSER;
    CREATE DATABASE quizzy WITH OWNER quizzy;
    GRANT ALL PRIVILEGES ON DATABASE quizzy TO quizzy;
EOSQL
