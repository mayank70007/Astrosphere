# 💎 GemStone Advisor

A full-stack MERN application that recommends gemstones based on astrology, zodiac signs, birth details, personality traits, and life goals.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)

## Features

- 🔮 **Personalized Recommendations** — Get gemstone matches based on zodiac sign and life goals
- 💎 **Gemstone Catalog** — Browse 18+ gemstones with search and filter
- 🔐 **Authentication** — Register/Login with JWT-secured routes
- ❤️ **Favorites** — Save gemstones to your personal collection
- 📊 **Dashboard** — View profile, saved gems, and recommendation history
- 🌙 **Dark/Light Mode** — Toggle between cosmic dark and light themes
- 📱 **Responsive** — Works beautifully on all devices

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd server
npm install
# Edit .env with your MongoDB URI
npm run seed    # Seed gemstone data
npm run dev     # Start server on port 5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev     # Start Vite dev server on port 5173
```

### Environment Variables

Create `server/.env`:

```
MONGO_URI=mongodb://localhost:27017/gemstone-advisor
JWT_SECRET=your_secret_key
PORT=5000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/gemstones` | List gemstones (with search/filter) |
| GET | `/api/gemstones/:id` | Get single gemstone |
| POST | `/api/recommend` | Get recommendation |
| GET | `/api/recommend/history` | Get recommendation history |
| GET | `/api/favorites` | Get favorites |
| POST | `/api/favorites` | Add to favorites |
| DELETE | `/api/favorites/:id` | Remove from favorites |

## Project Structure

```
├── server/              # Express.js backend
│   ├── config/          # Database config
│   ├── middleware/       # JWT auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── data/            # Seed script
│   └── server.js        # Entry point
│
├── client/              # React + Vite frontend
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── context/     # Auth & Theme providers
│       ├── pages/       # Route pages
│       └── services/    # API service layer
```
