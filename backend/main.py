from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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


class Item(BaseModel):
    """
    This class takes the JSON input from the front end and makes sure that it's the correct format.
    Otherwise, it returns a validation error.
    """
    texture: str
    colour: str
    type: str


class Datastore:
    """
    This class simulates a database that holds a single item.
    """
    items: list[Item] = []


@app.get("/get_items")
async def get_items():
    items_str_list = [f"{item.texture}, {item.colour}, {item.type}" for item in Datastore.items]
    items_str = " | ".join(items_str_list)
    return {"message": f"The database contains: {items_str}"}


@app.post("/post_item")
async def post_item(input_item: Item):
    Datastore.items.append(input_item)
