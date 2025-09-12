from sqlalchemy.orm import Session
from .models import Todo, User
from .schemas import TodoCreate, UserCreate
from .auth import get_password_hash
from .redis_cache import get_cached_todos, set_cached_todos, invalidate_cache

# return dict Todo (convert from SLQAlchemy)
def todo_to_dict(todo):
    return {
        "id": todo.id,
        "title": todo.title,
        "description": todo.description,
        "completed": todo.completed,
        "owner_id": todo.owner_id
    }

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username, 
        email=user.email, 
        hashed_password=hashed_password
        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_todo(db: Session, todo: TodoCreate, user_id: int):
    db_todo = Todo(**todo.dict(), owner_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    invalidate_cache(user_id)
    return db_todo

def get_todos(db: Session, user_id: int):
    cached = get_cached_todos(user_id)
    if cached:
        return cached
    todos = db.query(Todo).filter(Todo.owner_id == user_id).all()
    set_cached_todos(user_id, todos)
    return todos

def update_todo(db: Session, todo_id: int, completed: bool, user_id: int):
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.owner_id == user_id).first()
    if todo:
        todo.completed = completed
        db.commit()
        invalidate_cache(user_id)
        return todo
    return None

def delete_todo(db: Session, todo_id: int, user_id: int):
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.owner_id == user_id).first()
    if todo:
        db.delete(todo)
        db.commit()
        invalidate_cache(user_id)
        return True
    return False