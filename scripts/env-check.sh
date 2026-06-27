#!/bin/bash

echo "========== EAAS ENVIRONMENT =========="

ENV_FILE="/opt/eaas/eaas-showcase/backend/.env"

if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: .env file not found"
    exit 1
fi

echo ".env file found"

echo

grep "^PROJECT_NAME=" "$ENV_FILE"
grep "^API_HOST=" "$ENV_FILE"
grep "^API_PORT=" "$ENV_FILE"
grep "^SUPABASE_URL=" "$ENV_FILE"

echo

echo "Required variables"

for VAR in SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY
do
    if grep -q "^${VAR}=" "$ENV_FILE"; then
        echo "$VAR : OK"
    else
        echo "$VAR : MISSING"
    fi
done

echo
echo "Environment verification completed successfully."
