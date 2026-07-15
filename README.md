# simple-servicetag-service

A minimalistic internal microservice for tracking services in your infrastructure and their ownership. Other IT systems can perform CRUD operations via a REST API secured with per-client API tokens.

## Data model

**owners** — people who are responsible for a service

| Column     | Type         |
|------------|--------------|
| id         | int (PK)     |
| name       | varchar(150) |
| lastName   | varchar(150) |
| email      | varchar(150) |

**services** — services registered in your infrastructure

| Column        | Type              |
|---------------|-------------------|
| id            | int (PK)          |
| serviceTag    | varchar(150)      |
| description   | varchar(150)      |
| firstOwnerId  | FK → owners.id    |
| secondOwnerId | FK → owners.id    |

**sub_services** — sub-components of a service

| Column        | Type              |
|---------------|-------------------|
| id            | int (PK)          |
| serviceId     | FK → services.id  |
| subserviceTag | varchar(150)      |
| description   | varchar(150)      |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) with Compose
- [Node.js](https://nodejs.org/) 20+

## Getting started

```bash
# 1. Clone and install dependencies
git clone <repo-url>
cd simple-servicetag-service
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env if your DB credentials differ from the defaults

# 3. Start the database
make dev

# 4. Apply database migrations
make db-migrate

# 5. Issue an API token for your first client
make token-create name=my-service
# The token is printed once — copy it now

# 6. Start the development server
npm run dev
```

The API is now available at `http://localhost:3000`.

## Environment variables

| Variable       | Description                  | Default                                                    |
|----------------|------------------------------|------------------------------------------------------------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/servicetag` |

Copy `.env.example` to `.env` and adjust as needed.

## Authentication

Every request to `/api/*` must include a bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are issued per client service. Each token is stored as a SHA-256 hash in the database — the plaintext is only shown once at creation time.

### Issuing a token

```bash
make token-create name=payments-service
```

Output:
```
Token for "payments-service":

a3f1c8...  ← copy this and give it to the client

(Store this securely — it will not be shown again)
```

## API reference

All endpoints require `Authorization: Bearer <token>`.

### Owners

| Method   | Path               | Description        | Body                                      |
|----------|--------------------|--------------------|-------------------------------------------|
| `GET`    | `/api/owners`      | List all owners    |                                           |
| `POST`   | `/api/owners`      | Create an owner    | `{ name, lastName, email }`              |
| `GET`    | `/api/owners/:id`  | Get owner by ID    |                                           |
| `PUT`    | `/api/owners/:id`  | Update an owner    | `{ name?, lastName?, email? }`           |
| `DELETE` | `/api/owners/:id`  | Delete an owner    |                                           |

### Services

| Method   | Path                  | Description         | Body                                                               |
|----------|-----------------------|---------------------|--------------------------------------------------------------------|
| `GET`    | `/api/services`       | List all services   |                                                                    |
| `POST`   | `/api/services`       | Create a service    | `{ serviceTag, description, firstOwnerId, secondOwnerId }`        |
| `GET`    | `/api/services/:id`   | Get service by ID   |                                                                    |
| `PUT`    | `/api/services/:id`   | Update a service    | `{ serviceTag?, description?, firstOwnerId?, secondOwnerId? }`    |
| `DELETE` | `/api/services/:id`   | Delete a service    |                                                                    |

### Sub-services

| Method   | Path                      | Description              | Body                                              |
|----------|---------------------------|--------------------------|---------------------------------------------------|
| `GET`    | `/api/sub-services`       | List all sub-services    |                                                   |
| `POST`   | `/api/sub-services`       | Create a sub-service     | `{ serviceId, subserviceTag, description }`      |
| `GET`    | `/api/sub-services/:id`   | Get sub-service by ID    |                                                   |
| `PUT`    | `/api/sub-services/:id`   | Update a sub-service     | `{ serviceId?, subserviceTag?, description? }`   |
| `DELETE` | `/api/sub-services/:id`   | Delete a sub-service     |                                                   |

## Development commands

| Command                         | Description                                        |
|---------------------------------|----------------------------------------------------|
| `make dev`                      | Start the dockerized DB and run Next.js locally    |
| `make db-generate`              | Generate a migration from schema changes           |
| `make db-migrate`               | Apply pending migrations                           |
| `make db-push`                  | Push schema directly to DB (skips migration files) |
| `make token-create name=<name>` | Issue a new API token for a client service         |
# service-tag-service
