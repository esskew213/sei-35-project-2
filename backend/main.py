from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import *

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/login")
async def login():
    return {"login_success": has_logged_in()}


@app.get("/message_subjects")
async def get_subjects():
    return {"subjects": get_message_subjects()}
