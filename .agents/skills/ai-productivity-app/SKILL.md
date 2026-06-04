---
name: ai-productivity-app
description: Develop features for the AI Productivity App (Tasks + Notes + AI) — a full-stack NestJS 11 + Next.js 16 monorepo with MongoDB, JWT auth, Ant Design, and TailwindCSS. Use when working on backend modules, frontend pages, API services, or Docker deployment.
---

# AI Productivity App — Agent Skill

Use this skill when working on any part of the AI Productivity App project at `c:\vsCode\Project`.

## Project Overview

A full-stack productivity app combining task management, note-taking, and AI assistance:

- **Backend**: NestJS 11 + MongoDB (Mongoose) + Passport JWT + Nodemailer
- **Frontend**: Next.js 16 (App Router) + React 19 + TailwindCSS + shadcn/ui
- **Infrastructure**: Docker Compose (MongoDB 7, MySQL 8 — MySQL is legacy/commented out)

### Domain Entities

| Entity | Relationships |
|--------|---------------|
| User | Has many Tasks, Notes, AiResponses |
| Task | Belongs to User |
| Note | Belongs to User |
| AiResponse | Belongs to User, references Task or Note (optional) |

---

## Architecture

```
c:\vsCode\Project\
├── NestJs_Backend/          # Backend (port 3000)
│   └── src/
│       ├── auth/            # JWT auth (guards, strategies, Passport)
│       ├── common/          # Filters, interceptors, pipes, DTOs, enums
│       ├── config/          # App, database, validation configs
│       ├── decorators/      # @Public() decorator
│       ├── modules/         # Feature modules (users, tasks, notes, ai, mails)
│       ├── templates/       # Email templates (Handlebars)
│       ├── utils/           # Helper functions (bcrypt, etc.)
│       ├── app.module.ts    # Root module
│       └── main.ts          # Bootstrap with global pipes/filters/interceptors
│
└── NextJs/                  # Frontend (port 4000)
    └── src/
        ├── app/             # Pages: /, /home, /login, /register, /tasks, /notes, /ai
        ├── components/ui/   # PageHeader, LoadingSpinner, ErrorDisplay, EmptyState
        ├── constants/       # API_BASE_URL, ROUTES, STORAGE_KEYS, VALIDATION
        ├── hooks/           # useAuth
        ├── lib/             # Utility functions
        ├── services/        # API services (api.ts + domain services)
        └── types/           # TypeScript interfaces for all entities
```

### Backend Modules

```
src/modules/
├── users/              # User CRUD + registration
├── tasks/              # Task management (TODO, IN_PROGRESS, DONE)
├── notes/              # Note-taking functionality
├── ai/                 # AI Assistant / Prompt responses
└── mails/              # Email service (activation, password reset)
```

---

## Critical Conventions

### Backend (NestJS)

1. **Import alias**: `@/` maps to `src/` — always use `@/modules/...`, `@/common/...`, etc.
2. **Auth**: Routes are NOT globally guarded (APP_GUARD is commented out). Apply `@UseGuards(JwtAuthGuard)` per-controller. Use `@Public()` for open endpoints.
3. **CRUD pattern**: `POST /`, `GET /`, `GET /:id`, `PATCH /:id`, `DELETE /:id`
4. **Global prefix**: `/api` — all endpoints are under `http://localhost:3000/api/...`
5. **Pagination**: Use `PaginationDto` (`page`, `limit`) from `@/common/dto/pagination.dto.ts`
6. **Validation**: Global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, `transform`
7. **Response format**: All responses wrapped by `TransformInterceptor`:
   ```json
   { "statusCode": 200, "message": "Success", "data": {...}, "timestamp": "..." }
   ```
8. **Error format**: Caught by `AllExceptionsFilter`:
   ```json
   { "statusCode": 404, "timestamp": "...", "path": "/api/...", "method": "GET", "message": "...", "error": "Not Found" }
   ```
9. **Database**: MongoDB via Mongoose. Schemas use `@Schema()` + `@Prop()` decorators.
10. **Email**: `@nestjs-modules/mailer` with Handlebars templates in `src/templates/`.

### Frontend (Next.js)

1. **Server Components by default** — add `'use client'` only when needed for interactivity.
2. **API service layer**: All API calls go through the `ApiService` class in `src/services/api.ts`:
   - Automatic Bearer token injection from localStorage
   - Auto-unwraps `{ data: T }` envelope
   - Error extraction from response body
3. **Domain services**: Each entity has a service class (e.g., `tasksService`) that uses `api.get/post/patch/delete`.
4. **Auth flow**: `useAuth` hook manages login/register/logout + localStorage persistence.
5. **UI framework**: Ant Design 6 for components, TailwindCSS 4 for custom styling.
6. **Constants**: `API_BASE_URL`, `ROUTES`, `STORAGE_KEYS`, `VALIDATION` defined in `src/constants/`.
7. **Types**: All entity interfaces + DTOs + API response types in `src/types/index.ts`.
8. **Dev port**: Frontend runs on port 4000 (`next dev -p 4000`).

### CORS

Backend allows origins: `http://localhost:5173`, `http://localhost:4000`.

---

## Patterns to Follow

### Adding a New Backend Module

```bash
# Step 1: Generate module structure
nest g module modules/{name}
nest g controller modules/{name}
nest g service modules/{name}
```

```typescript
// Step 2: Define Mongoose schema — src/modules/{name}/schemas/{name}.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type XDocument = HydratedDocument<X>;

@Schema({ timestamps: true })
export class X {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  title: string;
}

export const XSchema = SchemaFactory.createForClass(X);
```

```typescript
// Step 3: Create DTOs — src/modules/{name}/dto/create-{name}.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateXDto {
  @IsString() @IsNotEmpty() title: string;
  @IsOptional() @IsString() description?: string;
}
```

```typescript
// Step 4: Module — src/modules/{name}/{name}.module.ts
@Module({
  imports: [MongooseModule.forFeature([{ name: X.name, schema: XSchema }])],
  controllers: [XController],
  providers: [XService],
  exports: [XService],
})
export class XModule {}
```

```typescript
// Step 5: Service — src/modules/{name}/{name}.service.ts
@Injectable()
export class XService {
  constructor(@InjectModel(X.name) private model: Model<X>) {}

  async create(userId: string, dto: CreateXDto) {
    return this.model.create({ ...dto, user: userId });
  }

  async findAll(userId: string, pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.find({ user: userId }).skip(skip).limit(limit).exec(),
      this.model.countDocuments({ user: userId }),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) { return this.model.findById(id); }
  async update(id: string, dto: UpdateXDto) { return this.model.findByIdAndUpdate(id, dto, { new: true }); }
  async remove(id: string) { return this.model.findByIdAndDelete(id); }
}
```

```typescript
// Step 6: Controller — src/modules/{name}/{name}.controller.ts
@Controller('{name}')
@UseGuards(JwtAuthGuard)
export class XController {
  constructor(private readonly service: XService) {}

  @Post() create(@Request() req, @Body() dto: CreateXDto) { return this.service.create(req.user.sub, dto); }
  @Get() findAll(@Request() req, @Query() pagination: PaginationDto) { return this.service.findAll(req.user.sub, pagination); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateXDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
```

### Adding a New Frontend Service

```typescript
// src/services/{name}.service.ts
import api from './api';
import type { X, CreateXDto, UpdateXDto } from '@/types';

class XService {
  private endpoint = '/{name}';

  async create(data: CreateXDto): Promise<X> {
    return api.post<X>(this.endpoint, data);
  }

  async findAll(): Promise<X[]> {
    return api.get<X[]>(this.endpoint);
  }

  async findOne(id: string): Promise<X> {
    return api.get<X>(`${this.endpoint}/${id}`);
  }

  async update(id: string, data: UpdateXDto): Promise<X> {
    return api.patch<X>(`${this.endpoint}/${id}`, data);
  }

  async remove(id: string): Promise<void> {
    return api.delete<void>(`${this.endpoint}/${id}`);
  }
}

export const xService = new XService();
export default xService;
```

---

## Commands

### Backend

```bash
cd NestJs_Backend
npm run dev              # Dev server with hot-reload (port 3000)
npm run build            # Build for production
npm run start:prod       # Run production build
npm run test             # Run unit tests
npm run lint             # Lint + fix
```

### Frontend

```bash
cd NextJs
npm run dev              # Dev server (port 4000)
npm run build            # Build for production
npm run lint             # ESLint
```

### Docker

```bash
cd NestJs_Backend
docker-compose -f docker-compose.dev.yml up --build   # Dev with hot-reload
docker-compose -f docker-compose.dev.yml down          # Stop all
```

---

## Environment Variables

### Backend (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017/nestjs_db` | MongoDB connection (use `mongo-nestjs` host for Docker) |
| `PORT` | `3000` | Server port |
| `API_PREFIX` | `api` | Global route prefix |
| `JWT_SECRET` | `your_jwt_secret_key` | JWT signing secret |

### Frontend (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api` | Backend API base URL |

---

## Common Pitfalls

1. **Docker MongoDB URI**: When running with Docker, change `localhost` → `mongo-nestjs` in `MONGODB_URI`.
2. **JWT Guard not global**: `APP_GUARD` is commented out in `app.module.ts`. Add `@UseGuards(JwtAuthGuard)` per controller.
3. **Mongoose vs TypeORM**: The project uses Mongoose (NOT TypeORM, despite TypeORM being in package.json). TypeORM config is commented out.
4. **Frontend env var name**: Constants file references `NEST_PUBLIC_API_URL` (not `NEXT_PUBLIC_API_URL`).
5. **Port mismatch**: Backend = 3000, Frontend = 4000, Docker dev = 3001.
6. **CORS**: Only `localhost:5173` and `localhost:4000` are allowed. Add new origins in `main.ts` if needed.
