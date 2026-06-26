#!/bin/bash

echo "HEALTH"
curl -s http://127.0.0.1:8001/health

echo
echo

echo "FEATURES"
curl -s http://127.0.0.1:8001/features

echo
echo

echo "ABOUT"
curl -s http://127.0.0.1:8001/about

echo
echo

echo "ROADMAP"
curl -s http://127.0.0.1:8001/roadmap

echo
