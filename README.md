# Cryptobase

A modern cryptocurrency dashboard built with React, TypeScript, Vite, and Firebase.

## Features

- Top 10 coins by market cap
- Trending coins section
- Coin search and details page
- Add/remove coins to your personal watchlist (requires sign in)
- Responsive dark/light mode (theme toggle)
- Firebase authentication (email/password)
- Protected account page
- Responsive design for desktop and mobile

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase (Auth + Firestore)
- Axios
- React Router
- React Icons

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/cryptobase.git
   cd cryptobase
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Firebase:**

   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config to a `.env` file (see `.env.example`)

4. **Run the app:**
   ```bash
   npm run dev
   ```

## Folder Structure

- `src/components/` — UI components (Navbar, Footer, CoinItem, etc.)
- `src/context/` — React context for Auth and Theme
- `src/routes/` — Page components (Home, Account, Signin, Signup, CoinPage)
- `src/types/` — TypeScript types

## Credits

- Powered by [CoinGecko API](https://www.coingecko.com/en/api)

---

**Demo:** _Add your deployed link here_

```

```
