# Spendy Backend

Express.js REST API for the Spendy expense tracking app. Built with TypeScript, Prisma, and Clerk authentication.

## Tech Stack

- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Prisma** - PostgreSQL ORM
- **@clerk/express** - Authentication
- **Zod** - Request validation
- **date-fns** - Date utilities
- **Svix** - Clerk webhook verification

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- [Clerk](https://clerk.com) account (for auth keys)

### Setup

```bash
cd backend
npm install
cp .env.example .env   # fill in your values
npm run db:push         # create tables
npm run db:seed         # seed demo data (optional)
npm run dev             # start dev server
```

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `CLERK_SECRET_KEY` | Clerk API secret key |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook signing secret |
| `PORT` | Server port (default: 3000) |
| `NODE_ENV` | `development` / `production` / `test` |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Create/apply migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Open Prisma Studio |

## Architecture

```
src/
  app.ts              # Express app factory
  index.ts            # Server entry point
  config/
    env.ts            # Env validation (Zod)
    clerk.ts          # Clerk client setup
  lib/
    prisma.ts         # Prisma client singleton
  middleware/
    auth.ts           # Clerk auth (clerkMiddleware, requireAuth, getAuth)
    validate.ts       # Zod request validation
    error-handler.ts  # AppError class + global error handler
  schemas/            # Zod validation schemas
  routes/             # Express route definitions
  controllers/        # Request handlers
  services/           # Business logic
  types/              # TypeScript type definitions
prisma/
  schema.prisma       # Database schema
  seed.ts             # Demo data seeder
```

### Request Flow

```
Request -> clerkMiddleware -> requireAuth -> validate -> controller -> service -> Prisma -> Response
```

## Database Models

### User
Synced from Clerk via webhooks. Fields: `clerkId`, `email`, `name`, `imageUrl`.

### Account
Shared expense account. Fields: `name`, `currency` (default USD).

### AccountMember
Links users to accounts with a role. Roles: `OWNER`, `EDITOR`, `VIEWER`.

### Category
Expense categories per account. Fields: `name`, `icon`, `color`. Eight default categories are created on signup: Bills, Food, Shopping, Vacation, Medicine, Transport, Fun, School.

### Transaction
Single or recurring expenses/income. Fields: `amount` (cents, negative = expense), `description`, `date`, `type` (ONE_TIME/RECURRING), `categoryId`, `scheduleId`.

### RecurringSchedule
Upcoming bills and recurring payments. Fields: `amount`, `description`, `frequency` (WEEKLY/BIWEEKLY/MONTHLY/YEARLY), `dayOfMonth`, `dayOfWeek`, `isActive`.

### Budget
Monthly spending budgets per account or category. Fields: `amount` (cents), `month`, `year`. Unique per account+category+month+year.

## API Endpoints

All endpoints except the webhook require authentication via Clerk. Protected routes verify the user is a member of the requested account.

### Auth

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/webhook` | Clerk webhook handler (user.created/updated/deleted) |

### Accounts

| Method | Path | Description |
|---|---|---|
| GET | `/api/accounts` | List accounts for authenticated user |

**Response:** `{ data: [{ id, name, currency, role }] }`

### Transactions

| Method | Path | Description |
|---|---|---|
| GET | `/api/transactions` | List transactions (paginated) |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

**GET query params:** `accountId` (required), `page`, `limit`, `month`, `year`, `categoryId`

**GET response:**
```json
{
  "data": [{ "id", "amount", "description", "date", "category": { "name", "icon", "color" } }],
  "pagination": { "page": 1, "limit": 20, "total": 50, "totalPages": 3 },
  "summary": { "totalSpent": 15000, "budget": 30000, "remaining": 15000 }
}
```

**POST body:** `{ accountId, categoryId, amount, description, date, type?, scheduleId? }`

### Categories

| Method | Path | Description |
|---|---|---|
| GET | `/api/categories?accountId=...` | List categories for account |
| POST | `/api/categories` | Create category |

**POST body:** `{ accountId, name, icon, color }`

### Dashboard

| Method | Path | Description |
|---|---|---|
| GET | `/api/dashboard?accountId=...` | Dashboard summary |

**Response:** `{ currentMonthSpending, monthlyAverage }` (amounts in cents)

### Statistics

| Method | Path | Description |
|---|---|---|
| GET | `/api/statistics?accountId=...` | Detailed statistics |

**Query params:** `accountId` (required), `month`, `year`

**Response:**
```json
{
  "monthlyOverview": { "totalSpent", "budget", "remaining" },
  "spendingByCategory": [{ "categoryId", "name", "icon", "color", "amount", "percentage" }],
  "weeklyTrend": [{ "day": "Mon", "amount", "percentage" }]
}
```

### Upcoming Bills

| Method | Path | Description |
|---|---|---|
| GET | `/api/upcoming-bills?accountId=...` | Active recurring schedules |

**Response:** `{ data: [{ id, name, icon, color, amount, dueDay, frequency }], total }`

## Authentication

Uses `@clerk/express` for authentication:

1. `clerkMiddleware()` is applied globally in `app.ts` - attaches auth state to every request
2. `requireAuth()` is applied at the router level on protected routes - returns 401 if unauthenticated
3. Controllers extract the user ID with `getAuth(req).userId`

### Authorization

Every protected endpoint calls `verifyAccountMembership(clerkId, accountId)` to ensure the authenticated user is a member of the requested account. Returns 403 if not.

### Clerk Webhooks

The `/api/auth/webhook` endpoint handles user lifecycle events from Clerk:

- **user.created** - Creates User record, a default "Personal Account", and 8 default categories
- **user.updated** - Syncs profile changes (email, name, image)
- **user.deleted** - Removes user record

Webhook payloads are verified using Svix signatures.

## Error Handling

All errors follow a consistent format:

```json
{ "error": "Error message" }
```

| Status | Meaning |
|---|---|
| 200 | Success (GET, PUT) |
| 201 | Created (POST) |
| 204 | No Content (DELETE) |
| 400 | Validation error (field-level messages) |
| 401 | Not authenticated |
| 403 | Not authorized for this account |
| 404 | Resource not found |
| 500 | Internal server error |

Custom errors are thrown using `new AppError(statusCode, message)` and caught by the global error handler.

## Seed Data

Running `npm run db:seed` creates:

- 1 demo user (`demo@spendy.app`)
- 4 accounts (Personal, Business, Savings, Investment)
- 8 categories for the Personal account
- 18 transactions (8 recent + 10 historical)
- 4 recurring schedules (Rent $1,200, Netflix $15.99, Gym $49.99, Internet $59.99)
- 1 monthly budget ($3,340)
