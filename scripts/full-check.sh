#!/bin/bash

echo "=============================="
echo "EAAS SHOWCASE FULL CHECK"
echo "=============================="

echo
docker compose ps

echo
curl -s http://127.0.0.1:8001/health

echo
curl -s http://127.0.0.1:8001/features

echo
curl -s http://127.0.0.1:8001/about

echo
curl -s http://127.0.0.1:8001/roadmap

echo
curl -s http://127.0.0.1:8001/feedback
