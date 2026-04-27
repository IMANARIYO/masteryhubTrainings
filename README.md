# masteryhubTrainings — MHR Blog App

A full-stack training project built to practice React on the frontend and Node.js/Express on the backend. It features a product catalogue (fetched from an external API and a local REST API) and a blog section with cards, modals, and React lifecycle demos.

---

## Project Structure

```
mhr_blog_app/
├── backend/      # Express REST API (port 4000)
└── frontend/     # React 19 + Vite SPA
```

---

## Features

### Frontend
- Product list fetched from [dummyjson.com](https://dummyjson.com/products)
- Product cards with wishlist toggle, discount badge, star rating, and stock indicator
- Product detail page with image gallery, specs tab, reviews tab, and quantity selector
- Blog list with cards showing author, date, likes, comments, and views
- Blog detail modal overlay
- React lifecycle demo (render counter / Timer component)
- Client-side routing with React Router DOM

### Backend
- `GET /` — return all products
- `POST /addproduct` — add a new product
- `DELETE /deleteproduct/:productId` — remove a product by ID
- In-memory product storage (no database required)

---

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

---

### Backend

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Start the development server (uses nodemon for auto-reload)
npm run baptiste

# The API will be running at http://localhost:4000
```

Available scripts:

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `node index.js` | Start in production mode |
| `npm run baptiste` | `nodemon index.js` | Start in development mode with auto-reload |

---

### Frontend

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# The app will be running at http://localhost:5173
```

Available scripts:

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `vite` | Start development server |
| `npm run build` | `vite build` | Build for production |
| `npm run preview` | `vite preview` | Preview production build locally |
| `npm run lint` | `eslint .` | Run ESLint |

---

## Running Both Together

Open two terminals and run each in parallel:

```bash
# Terminal 1 — Backend
cd backend && npm run baptiste

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router DOM 7 |
| HTTP client | Axios |
| Backend framework | Express 5 |
| Dev server | Nodemon |
