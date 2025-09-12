from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .database import get_db
from .schemas import UserCreate, UserOut, TodoCreate, TodoOut, TodoUpdate
from .crud import create_user, get_user_by_username, create_todo, get_todos, update_todo, delete_todo
from .auth import verify_password, create_access_token, get_current_user, revoke_token
from .models import User
from .email import send_completion_email

router = APIRouter(
    prefix="/api",
    tags=["Auth"]
)

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db=db, user=user)

@router.post("/token")
def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db)
        ):    
    user = get_user_by_username(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/todos", response_model=TodoOut)
def create_todo_api(
    todo: TodoCreate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):
    return create_todo(db=db, todo=todo, user_id=current_user.id)

from .auth import oauth2_scheme

@router.post("/logout")
def logout(token: str = Depends(oauth2_scheme), current_user: User = Depends(get_current_user)):
    revoke_token(token)
    return {"message": "Logged out successfully"}

@router.get("/todos", response_model=list[TodoOut])
def get_todos_api(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):
    return get_todos(db=db, user_id=current_user.id)

@router.put("/todos/{todo_id}")
def update_todo_api(
    todo_id: int,
    todo_data: TodoUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):
    todo = update_todo(db, todo_id, todo_data.completed, current_user.id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if todo_data.completed:
        # send_completion_email(current_user.email, todo.title)
        pass
    return{"message": "Todo updated successfully"}

@router.delete("/todos/{todo_id}")
def delete_todo_api(
    todo_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):
    if not delete_todo(db=db, todo_id=todo_id, user_id=current_user.id):
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Todo deleted successfully"}
