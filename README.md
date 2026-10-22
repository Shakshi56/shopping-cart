# MERN Shopping Cart

## Features
- Product listing with search, category filter, sort
- Add to cart, remove, quantity +/-, clear cart
- Cart summary: total items, total amount (tax + shipping at checkout)
- Cart persisted in localStorage (Redux Toolkit)
- Register / Login (JWT)
- Checkout and order history (protected routes)
- Stock check on order, toast feedback

## Run
1. Server (needs MongoDB running locally or an Atlas URI in .env):
   cd server && cp .env.example .env && npm install && npm run seed && npm run dev
2. Client (new terminal):
   cd client && npm install && npm run dev
Open http://localhost:5173
