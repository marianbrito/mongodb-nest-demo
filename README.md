# MongoDB + NestJS: a tiny library API

A super simple example for our MongoDB tutorial (Databases, SRH Hochschulen Berlin).
It is the same `books` collection from Exercise 1, but used from a NestJS app instead of `mongosh`.

## Versions

NestJS 12, Mongoose 9, TypeScript 6 (the version the NestJS CLI uses) and MongoDB 9.0 (Docker image `mongo:9.0`).

## What you need

- Docker Desktop (open and running)
- Node.js 26 LTS (`node -v` to check)

## Run it

```bash
# 1. Start MongoDB (the same docker-compose.yml as in the slides)
docker compose up -d

# 2. Install the packages
npm install

# 3. Start the app
npm run start:dev
```

When you see `API running on http://localhost:3000/books`, it works.
Open http://localhost:3000/books in your browser: you should see `[]` (an empty list).

## Try it

Easiest: use Hoppscotch. Choose the method, type the URL, and for POST and PATCH put the JSON under Body → application/json.
Or run these in a second terminal:

```bash
# Create a book  (= insertOne)
curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title": "1984", "author": "George Orwell", "year": 1949, "genres": ["Dystopia", "Classic"]}'

# Get all books  (= find)
curl http://localhost:3000/books

# Get one book  (= findOne). Copy the _id from the answer above
curl http://localhost:3000/books/<id>

# Change a book  (= updateOne)
curl -X PATCH http://localhost:3000/books/<id> -H "Content-Type: application/json" -d '{"year": 1950}'

# Delete a book  (= deleteOne)
curl -X DELETE http://localhost:3000/books/<id>
```

> On Windows PowerShell, use `curl.exe` instead of `curl`, or just use Hoppscotch.
> In the Hoppscotch web app, requests to `localhost` need the Hoppscotch browser extension or agent (Settings → Interceptors).

## Check it in mongosh

The app writes to a normal MongoDB database called `library`, so you can see the same data in the shell:

```bash
docker exec -it mongodb mongosh
use library
db.books.find()
```

## How the code is organized

| File | What it does |
| --- | --- |
| `src/app.module.ts` | Connects to MongoDB (`mongodb://localhost:27017/library`) |
| `src/books/book.schema.ts` | What a book document looks like |
| `src/books/books.service.ts` | Talks to MongoDB: create, find, update, delete |
| `src/books/books.controller.ts` | The URLs: `GET /books`, `POST /books`, … |
| `src/books/books.module.ts` | Puts the three pieces together |

## Stop it

- Stop the app: `Ctrl + C`
- Stop MongoDB: `docker compose down` (your data stays in the `mongo-data` volume)
