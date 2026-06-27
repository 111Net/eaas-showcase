#!/bin/bash

cd /opt/eaas/eaas-showcase/backend

source venv/bin/activate

python3 - <<'EOF'
from app.database import supabase

try:
    result = supabase.table("pg_tables").select("*").limit(1).execute()
    print("Supabase connection successful.")
    print(result)
except Exception as e:
    print("Supabase connection failed.")
    print(e)
EOF
