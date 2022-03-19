from dataclasses import dataclass


@dataclass
class User:
    name: str
    email: str
    photo_url: str
