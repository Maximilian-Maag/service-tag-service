.PHONY: dev db-generate db-migrate db-push token-create

# Run Next.js locally against the dockerized DB
dev:
	docker compose -f docker-compose-dev.yml up -d db

# Generate a new Drizzle migration from schema changes
db-generate:
	npx drizzle-kit generate

# Apply pending migrations
db-migrate:
	npx drizzle-kit migrate

# Push schema directly to DB (skips migration files, useful in early dev)
db-push:
	npx drizzle-kit push

# Issue a new API token: make token-create name=<service-name>
token-create:
	npx tsx scripts/create-token.ts $(name)
