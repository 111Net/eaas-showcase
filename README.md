<<<<<<< HEAD
## URLs
=======
EAAS Showcase

Overview
EAAS Showcase is a demonstration environment for the EAAS Platform.

The application consists of:

* FastAPI Backend
* Static HTML/CSS/JavaScript Frontend
* Docker Support
* Systemd Services
* Health Monitoring

URLs
=======
## URLs
>>>>>>> 3dce6ab (Update documentation and release files)
>>>>>>> 6ced4f4 (Update documentation and release files)

Frontend
http://SERVER_IP:8080

Backend
http://SERVER_IP:8001

Swagger API
http://SERVER_IP:8001/docs

Feedback API
http://SERVER_IP:8001/feedback

Health Endpoint

http://SERVER_IP:8001/health

<<<<<<< HEAD
Features Endpoint
=======
Local Services
=======
Features Endpoint
>>>>>>> 3dce6ab (Update documentation and release files)
>>>>>>> 6ced4f4 (Update documentation and release files)

http://SERVER_IP:8001/features

About Endpoint

http://SERVER_IP:8001/about
<<<<<<< HEAD

Roadmap Endpoint

http://SERVER_IP:8001/roadmap

## Quick Start

Clone the repository:
=======

Roadmap Endpoint
Docker
=======
http://SERVER_IP:8001/roadmap
>>>>>>> 3dce6ab (Update documentation and release files)

## Quick Start

Purpose
=======
Clone the repository:
>>>>>>> 3dce6ab (Update documentation and release files)
>>>>>>> 6ced4f4 (Update documentation and release files)

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

