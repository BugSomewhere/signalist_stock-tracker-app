# 🏗️ CẤU TRÚC BACKEND NESTJS CHUẨN - AI PRODUCTIVITY APP

## 📁 Cấu Trúc Thư Mục

```
src/
├── common/                          # Common utilities, shared code
│   ├── constants/                   # Hằng số toàn cục
│   │   └── index.ts                # API_PREFIX, PAGE_SIZE, etc.
│   ├── decorators/                  # Custom decorators
│   ├── dto/                        # Shared DTOs
│   │   └── pagination.dto.ts      # DTO cho pagination
│   ├── enums/                      # Enums toàn cục
│   │   └── index.ts               # UserStatus, UserRole, TaskStatus, etc.
│   ├── filters/                    # Exception filters
│   │   ├── all-exceptions.filter.ts    # Bắt tất cả exceptions
│   │   └── http-exception.filter.ts    # Bắt HTTP exceptions
│   ├── guards/                     # Auth guards, role guards
│   ├── interceptors/               # Request/Response interceptors
│   │   ├── logging.interceptor.ts      # Log requests
│   │   └── transform.interceptor.ts    # Transform responses
│   ├── interfaces/                 # Shared interfaces
│   │   └── response.interface.ts      # Response formats
│   ├── pipes/                      # Custom pipes
│   │   └── validation.pipe.ts         # Validation pipe
│   └── middleware/                 # Custom middlewares
│
├── config/                         # Configuration files
│   ├── app.config.ts              # App configuration
│   ├── database.config.ts         # Database configuration
│   └── validation.schema.ts       # Environment validation schema
│
├── modules/                        # Feature modules
│   ├── users/                     # Users module
│   ├── tasks/                     # Tasks management
│   ├── notes/                     # Notes management
│   ├── ai/                        # AI Assistant/Chat
│   ├── mails/                     # Email notifications
│   └── auth/                      # JWT Authentication
│
├── app.controller.ts              # Root controller
├── app.service.ts                 # Root service
├── app.module.ts                  # Root module
└── main.ts                        # Application entry point
```

---

## 🎯 Giải Thích Các Thành Phần

### 1. **Common Module** (`src/common/`)

Chứa code dùng chung cho toàn bộ ứng dụng:

#### **Filters** - Xử lý exceptions

- `AllExceptionsFilter`: Bắt TẤT CẢ exceptions, format response thống nhất
- `HttpExceptionFilter`: Bắt HTTP exceptions cụ thể

#### **Interceptors** - Xử lý request/response

- `LoggingInterceptor`: Log mọi request (method, URL, status, response time)
- `TransformInterceptor`: Wrap response theo format chuẩn

#### **Pipes** - Validation và transformation

- `ValidationPipe`: Validate DTOs với class-validator

#### **DTOs** - Data Transfer Objects chung

- `PaginationDto`: Pagination parameters (page, limit)

#### **Interfaces** - Type definitions chung

- `ApiResponse<T>`: Format response chuẩn
- `PaginatedResponse<T>`: Response có pagination
- `PaginationMeta`: Metadata cho pagination

#### **Constants** - Hằng số

- `API_PREFIX`, `API_VERSION`
- `DEFAULT_PAGE_SIZE`, `MAX_PAGE_SIZE`

#### **Enums** - Enum types

- `UserStatus`, `UserRole`, `TaskStatus`, `TaskPriority`

---

## 🔄 Luồng Xử Lý Request

```
1. Request đến
   ↓
2. LoggingInterceptor (log request)
   ↓
3. ValidationPipe (validate DTO)
   ↓
4. Controller → Service
   ↓
5. Database (Mongoose/MongoDB)
   ↓
6. Service → Controller
   ↓
7. TransformInterceptor (wrap response)
   ↓
8. Response trả về client
```

Nếu có lỗi:

```
Error → AllExceptionsFilter → Formatted error response
```

---

## 📦 Response Format Chuẩn

### Success Response

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { ... },
  "timestamp": "2026-01-05T10:30:00.000Z"
}
```

### Paginated Response

```json
{
  "statusCode": 200,
  "message": "Lấy danh sách thành công",
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "timestamp": "2026-01-05T10:30:00.000Z"
}
```

### Error Response

```json
{
  "statusCode": 404,
  "timestamp": "2026-01-05T10:30:00.000Z",
  "path": "/api/users/999",
  "method": "GET",
  "message": "User với ID 999 không tồn tại",
  "error": "Not Found"
}
```

---

## 🚀 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Users

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/users`     | Lấy danh sách users |
| GET    | `/users/:id` | Lấy user theo ID    |
| POST   | `/users`     | Tạo user mới        |
| PATCH  | `/users/:id` | Cập nhật user       |
| DELETE | `/users/:id` | Xóa user            |

### Tasks

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/tasks`     | Lấy danh sách tasks |
| GET    | `/tasks/:id` | Lấy task theo ID    |
| POST   | `/tasks`     | Tạo task mới        |
| PATCH  | `/tasks/:id` | Cập nhật task       |
| DELETE | `/tasks/:id` | Xóa task            |

### Notes

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/notes`     | Lấy danh sách notes |
| GET    | `/notes/:id` | Lấy note theo ID    |
| POST   | `/notes`     | Tạo note mới        |
| PATCH  | `/notes/:id` | Cập nhật note       |
| DELETE | `/notes/:id` | Xóa note            |

### AI

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/ai/generate`   | Tạo nội dung bằng AI  |
| GET    | `/ai/history`    | Lấy lịch sử chat/hỏi  |

---

## 🛠️ Cách Thêm Module Mới

### Bước 1: Generate module với NestJS CLI

```bash
nest g module modules/notes
nest g controller modules/notes
nest g service modules/notes
```

### Bước 2: Tạo Schema (Mongoose)

```typescript
// schemas/note.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Note extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
```

### Bước 3: Import vào AppModule

```typescript
// app.module.ts
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [
    // ...
    NotesModule,
  ],
})
```
