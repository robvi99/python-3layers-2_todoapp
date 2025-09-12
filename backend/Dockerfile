# backend/Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install wait-for-it 
RUN pip install --root-user-action=ignore -r requirements.txt
CMD ["wait-for-it", "db:3306", "--", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]