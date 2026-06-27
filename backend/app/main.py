from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from app.database import supabase

# ----------------------------------------------------
# EAAS Showcase Backend
# Version: 1.2.0
# ----------------------------------------------------

app = FastAPI(
    title="EAAS Showcase API",
    version="1.2.0",
    description="Enterprise Automation As A Service Showcase"
)

# ----------------------------------------------------
# CORS
# ----------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------
# Models
# ----------------------------------------------------

class Feedback(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100
    )

    email: EmailStr

    message: str = Field(
        min_length=5,
        max_length=1000
    )

# ----------------------------------------------------
# Routes
# ----------------------------------------------------

@app.get("/")
def root():
    return {
        "project": "EAAS Showcase",
        "version": "1.2.0",
        "status": "running"
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
            "Supabase Integration",
            "Feedback Persistence",
            "Container Deployment"
        ]
    }


@app.get("/about")
def about():
    return {
        "name": "EAAS Showcase",
        "description": "Enterprise Automation As A Service demonstration platform",
        "version": "1.2.0"
    }


@app.get("/roadmap")
def roadmap():
    return {
        "phase_1": "Complete",
        "phase_2": "Complete",
        "phase_3": "Complete",
        "phase_4": "Complete",
        "phase_5": "In Progress"
    }


# ----------------------------------------------------
# Feedback API
# ----------------------------------------------------

@app.post("/feedback")
def create_feedback(item: Feedback):

    try:

        result = (
            supabase
            .table("showcase_feedback")
            .insert(item.model_dump())
            .execute()
        )

        return {
            "status": "success",
            "message": "Feedback submitted successfully.",
            "data": result.data
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )


@app.get("/feedback")
def list_feedback():

    try:

        result = (
            supabase
            .table("showcase_feedback")
            .select("*")
            .order("id")
            .execute()
        )

        return {
            "count": len(result.data),
            "data": result.data
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc)
        )
