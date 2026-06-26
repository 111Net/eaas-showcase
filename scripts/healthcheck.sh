#!/bin/bash

echo "Checking backend..."

curl -s http://127.0.0.1:8000/health

echo
echo "Done."
