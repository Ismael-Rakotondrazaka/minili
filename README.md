# minili

Minimal URL shortener built with TypeScript, Express, MongoDB, and Redis.

## Stack

- **Runtime**: Node.js 20 + TypeScript
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Cache**: Redis (1-hour TTL per short code)
- **Frontend**: Vanilla HTML/CSS/JS (dark theme)

## API

| Method | Path | Body | Response |
|--------|------|------|----------|
| `POST` | `/shorten` | `{ "url": "https://..." }` | `{ code, short, originalUrl }` |
| `GET` | `/:code` | — | 302 redirect to original URL |

## Local development

**Prerequisites**: Node.js 20+, MongoDB, Redis running locally.

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### With Docker (dev)

Requires Traefik running with `web` and `backend-network` Docker networks.

```bash
cp .env.example .env
docker compose -f docker-compose.dev.yml up
```

The app hot-reloads via `tsx watch`. File polling is enabled for Docker Desktop on Windows/macOS.

## Production

```bash
# Build
npm run build

# Run
npm start
```

### With Docker

```bash
docker compose up -d
```

The production compose file builds the image and routes traffic through Traefik. Update `APP_URL` and the Traefik host rule to your real domain before deploying.

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | HTTP port |
| `MONGO_URI` | `mongodb://localhost:27017/minili` | MongoDB connection string |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection string |
| `APP_URL` | `http://localhost:3000` | Base URL used to build short links |
