Cấu trúc dự án:
<details> <summary>📁 Click để xem cấu trúc thư mục</summary>
todo-app/
├── backend/          # Business Logic Layer
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py     # App Configuration
│   │   ├── database.py   # Data Access Layer
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── auth.py       # Authentication and Security
│   │   ├── routes.py     # API routes
│   │   ├── email.py      # Email sending
│   │   ├── redis_cache.py # Redis Caching Configuration
│   ├── tests/            # Testing and Automation
│   ├── requirements.txt
│   ├── Dockerfile
├── frontend/         # Presentation Layer
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── TodoList.js
│   │   │   ├── Login.js    # Replace with LoginForm.js
│   │   │   ├── LoginForm.js
│   │   │   ├── Register.js
│   │   │   ├── RegisterForm.js # Replace with RegisterForm.js
│   │   │   ├── AuthPage.js
│   ├── index.css
│   ├── index.js
│   ├── package.json
│   ├── Dockerfile
├── docker-compose.yml  # Docker & Containerization
├── nginx.conf          # Load Balancing and Scaling
</details>

Mô tả dự án:
Đây là một ứng dụng TodoList có cho phép nhiều user thêm các công việc dạng TodoList và đánh dấu chúng khi hoàn thành.

Một vài tính năng cần thiết:
Authentication and Security
Sử dụng JWT cho auth. User đăng ký/đăng nhập, token được lưu trong localStorage (frontend) => backend/app/auth.py
Redis Caching Configuration
Cache danh sách công việc của user trong Redis (TTL 5 phút). Khi cập nhật/xóa, invalidate cache => backend/app/redis_cache.py
API Optimization
Sử dụng FastAPI async cho hiệu suất cao. Cache danh sách todos. Sử dụng pagination nếu list dài (tạm thời skip cho đơn giản) 
Load Balancing and Scaling
Sử dụng Nginx làm reverse proxy và load balancer. Scaling backend bằng cách chạy multiple instances trong Docker => nginx.conf => Dockerscale backend: docker-compose up --scale backend=2

Cài đặt dự án:
git clone https://github.com/robvi99/python-3layers-2_todoapp
docker-compose up --build
Đường dẫn truy cập: http://localhost (đã dùng nginx proxy chuyển đến port 80)

