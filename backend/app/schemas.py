from pydantic import BaseModel

class TodoUpdate(BaseModel):
    completed: bool

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str

class TodoCreate(BaseModel):
    title: str
    description: str

class TodoOut(BaseModel):
    id: int 
    title: str
    description: str
    completed: bool