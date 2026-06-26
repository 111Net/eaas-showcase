#!/bin/bash

echo "Docker Version"
docker --version

echo

echo "Compose Version"
docker compose version

echo

echo "Containers"
docker compose ps

echo

echo "Backend"
curl -s http://127.0.0.1:8001/health

echo

echo "Frontend"
curl -I http://127.0.0.1:8080
