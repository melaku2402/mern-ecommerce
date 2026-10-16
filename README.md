# E-Commerce MERN App

**Project overview:**

- Full-stack E-Commerce application built with the MERN stack.
- This repository contains three separate frontend/admin/client projects plus the backend API:
  - `backend` — Express + MongoDB API and file upload (Cloudinary).
  - `frontend` — Customer-facing React app (Vite).
  - `admin` — Admin dashboard React app (Vite).

## Repository Structure

- [backend](backend/): API server, models, controllers, routes, middleware.
- [frontend](frontend/): public storefront, product pages, cart, checkout.
- [admin](admin/): admin dashboard for product and order management.

## Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB (Atlas or local)
- (Optional) Cloudinary account for image uploads

## Environment variables

Create a `.env` file in `backend/` with the following variables:

- `MONGO_URI` — MongoDB connection string
- `PORT` — port for the backend (default 5000)
- `JWT_SECRET` — JWT signing secret
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret

For the frontends you may need a Vite environment variable to point to the API, e.g. in `frontend/.env` and `admin/.env`:

- `VITE_API_URL` — e.g. `http://localhost:5000/api`

## Install

Open three terminals or run in sequence per subproject.

Backend:

```bash
cd backend
npm install
```

Frontend (customer):

```bash
cd frontend
npm install
```

Admin dashboard:

```bash
cd admin
npm install
```

## Run (development)

Start the backend (dev):

```bash
cd backend
npm run dev
```

Start the frontend (dev):

```bash
cd frontend
npm run dev
```

Start the admin dashboard (dev):

```bash
cd admin
npm run dev
```

Notes:

- If any project uses `yarn` instead of `npm`, use `yarn` equivalents.
- If ports conflict, adjust `PORT` in `backend/.env` or Vite dev server ports in each frontend's `vite.config.js`.

## Build (production)

Backend: set `NODE_ENV=production` and run your production start script (example):

```bash
cd backend
npm run build # if applicable
npm start
```

Frontend / Admin (build static):

```bash
cd frontend
npm run build

cd ../admin
npm run build
```

Serve the built static files with a static host or integrate with your backend.

## API overview

Key API routes are implemented in the `backend/routes` folder. You can inspect controllers in `backend/controllers`.

Typical routes:

- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login
- `GET /api/products` — list products
- `POST /api/orders` — create order

(Refer to `backend/routes` for the full list.)

## Authentication & Authorization

- JWT-based authentication. Protect routes using the middleware in `backend/middleware`.
- Admin-only routes are protected by `adminAuth` middleware.

## Troubleshooting

- MongoDB connection errors: verify `MONGO_URI` and network access (Atlas IP whitelist).
- Uploads failing: check Cloudinary credentials in `.env` and `config/cloudinary.js`.
- CORS or API errors from frontends: ensure `VITE_API_URL` is set to the backend base URL.

## Contribution

- Fork the repo, create a feature branch, add tests, open a pull request.
- Keep changes focused to one subproject when possible.

## Useful files

- Backend entry: [backend/server.js](backend/server.js#L1)
- Backend config: [backend/config/mongodb.js](backend/config/mongodb.js#L1)
- Frontend entry: [frontend/src/main.jsx](frontend/src/main.jsx#L1)
- Admin entry: [admin/src/main.jsx](admin/src/main.jsx#L1)

## License

This project does not include a license by default. Add a `LICENSE` file if you wish to open-source it.

---

If you want, I can also:

- add a `LICENSE` file,
- add example `.env.example` files for each subproject, or
- update each `package.json` `scripts` section to include standardized `dev`, `start`, and `build` scripts.

Created: README for the full repository (covers `backend`, `frontend`, and `admin`).
