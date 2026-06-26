from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EAAS Showcase API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "EAAS Showcase Backend Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/features")
def features():
    return {
        "features": [
            "Docker Monitoring",
            "Storage Watchdog",
            "FastAPI APIs",
            "Health Monitoring",
            "Autonomous Cleanup"
        ]
    }

@app.get("/about")
def about():
    return {
        "name": "EAAS Showcase",
        "description": "Enterprise Automation As A Service demonstration platform"
    }

@app.get("/roadmap")
def roadmap():
    return {
        "phase_1": "Complete",
        "phase_2": "Backend Complete",
        "phase_3": "Frontend In Progress",
        "phase_4": "Deployment Pending"
    }
