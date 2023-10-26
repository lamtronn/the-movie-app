## The Movie App

## Live demo
Demo: https://the-movie-app-six.vercel.app/home

## TODO
- [x] Authentication.
- [x] API Integration for Homepage, Popular, Upcoming, Movie Details page.
- [x] Search functionality.
- [x] Mars
- [ ] Unit testing
- [x] Deployment

## Tech stack
- NextJS with Typescript
- Tailwind
- Zustand

## Setup environment

Create .env.local file in the root of this repository

```bash
NEXT_PUBLIC_API_URL = 'https://api.themoviedb.org/3'
NEXT_PUBLIC_NEW_API_URL = 'https://api.themoviedb.org/4'
NEXT_PUBLIC_API_KEY = 'Your TMDB api key'
NEXT_PUBLIC_API_READ_ACCESS_TOKEN = 'YOur TMDB Access token'
```

## How to get API key and access token

1. Access https://developer.themoviedb.org/ from browser.
2. Login or create an account.
3. Click profile picture at top right corner, go to Settings.
4. Select "API" tab in the navigation bar.
5. Copy API key and Access token.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
