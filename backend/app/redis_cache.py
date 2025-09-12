import redis 
import json
from .config import config 

redis_client = redis.from_url(config.REDIS_URL)

def get_cached_todos(user_id: int):
    key = f"todos:{user_id}"
    cached = redis_client.get(key)
    if cached:
        return json.loads(cached.decode('utf-8')) # decode bytes to string, then parse JSON
    return None

def set_cached_todos(user_id: int, todos):
    key = f"todos:{user_id}"
    if all(isinstance(todo, dict) for todo in todos):
        todo_dicts = todos
    else:
        # convert list SQLAlchemy object into list dict
        todo_dicts = []
        for todo in todos:
            todo_dicts.append({
                "id": todo.id,
                "title": todo.title,
                "description": todo.description,
                "completed": todo.completed,
                "owner_id": todo.owner_id
            })
    redis_client.set(key, json.dumps(todo_dicts), ex=300) # save as json

def invalidate_cache(user_id: int):
    key = f"todos:{user_id}"
    redis_client.delete(key)

