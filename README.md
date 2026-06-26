## URLs

Frontend

http://SERVER_IP:8080

Backend API

http://SERVER_IP:8001

Swagger Documentation

http://SERVER_IP:8001/docs

Health Endpoint

http://SERVER_IP:8001/health

Features Endpoint

http://SERVER_IP:8001/features

About Endpoint

http://SERVER_IP:8001/about

Roadmap Endpoint

http://SERVER_IP:8001/roadmap

## Quick Start

Clone the repository:

```bash
git clone https://github.com/111Net/eaas-showcase.git
cd eaas-showcase
```

Build the containers:

```bash
docker compose build
```

Start the application:

```bash
docker compose up -d
```

Verify:

```bash
curl http://127.0.0.1:8001/health
```

Open the showcase:

```
http://SERVER_IP:8080
```

