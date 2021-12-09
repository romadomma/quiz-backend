#!/bin/bash
### Copyright 2021. Plesk International GmbH. All rights reserved.
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Mimic RDS_SUPERUSER, see https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.MasterAccounts.html
    CREATE USER quizzy WITH PASSWORD '${DB_MASTER_PASS}' SUPERUSER;
    CREATE DATABASE quizzy WITH OWNER quizzy;
    GRANT ALL PRIVILEGES ON DATABASE quizzy TO quizzy;
EOSQL
