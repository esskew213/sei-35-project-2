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
async def get_creds():
    return login();


@app.get("/get_subs_on_login")
async def get_subs():
    return {"subjects": get_subs_on_login()}


@app.get("/scan_gmail")
async def scan():
    return scan_gmail()


@app.post("/save_new_subs")
async def save_new():
    return save_new_subs()


@app.post("/edit_sub")
async def edit():
    return()


@app.get("/delete_sub")
async def delete():
    return delete_sub()