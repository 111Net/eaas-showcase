# EAAS Showcase

## Overview

EAAS Showcase is a demonstration environment for the EAAS Platform.

The application consists of:

* FastAPI Backend
* Static HTML/CSS/JavaScript Frontend
* Docker Support
* Systemd Services
* Health Monitoring

## URLs

Frontend

http://SERVER_IP:3000

Backend

http://SERVER_IP:8000

Swagger API

http://SERVER_IP:8000/docs

Health Check

http://SERVER_IP:8000/health

## Local Services

Backend Service

sudo systemctl status eaas-showcase

Frontend Service

sudo systemctl status eaas-showcase-frontend

## Docker

docker compose up --build

## Purpose

This project provides a lightweight showcase of EAAS platform capabilities for demonstrations, testing and collaborator reviews.

