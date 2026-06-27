from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from app.database import supabase

app = FastAPI(
    title="EAAS Showcase API",
    version="1.3.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Feedback(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=5, max_length=1000)


@app.get("/")
def root():
    return {
        "message": "EAAS Showcase Backend Running",
        "version": "1.3.1"
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
        "description": "Energy As A Service demonstration platform",
        "version": "1.3.1"
    }


@app.get("/roadmap")
def roadmap():
    return {
        "phase_1": "Complete",
        "phase_2": "Backend Complete",
        "phase_3": "Frontend Complete",
        "phase_4": "Deployment Complete",
        "phase_5": "Supabase Integration Complete",
        "phase_6": "Dashboard Complete",
        "phase_7": "Investor UI In Progress"
    }


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
            "data": result.data
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.get("/feedback")
def list_feedback():

    result = (
        supabase
        .table("showcase_feedback")
        .select("*")
        .order("id")
        .execute()
    )

    return result.data


@app.get("/feedback/latest")
def latest_feedback():

    result = (
        supabase
        .table("showcase_feedback")
        .select("id,name,message,created_at")
        .order("created_at", desc=True)
        .limit(5)
        .execute()
    )

    return result.data


@app.get("/stats")
def stats():

    result = (
        supabase
        .table("showcase_feedback")
        .select("*")
        .execute()
    )

    rows = result.data

    if not rows:

        return {
            "total_feedback": 0,
            "unique_users": 0,
            "latest_submission": None
        }

    latest = max(row["created_at"] for row in rows)

    unique = len(
        set(
            row["email"]
            for row in rows
        )
    )

    return {
        "total_feedback": len(rows),
        "unique_users": unique,
        "latest_submission": latest
    }
