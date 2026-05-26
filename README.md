# HashLink Corp. Portfolio

A React + Vite portfolio app built to showcase HashLink Corp.'s digital operating system and AI audit capabilities.

## Project Overview

This project combines a Vite-powered React frontend with an Express-backed Node server for local development and AI integration. The app uses Google Gemini via the `@google/genai` package to generate premium AI audit proposals and automation blueprints.

## Key Features

- React + Vite frontend with modern UI components
- Express server middleware for local SPA development
- Gemini AI integration through `@google/genai`
- Environment-based config loading via `.env.local`
- `.gitignore` configured to exclude secrets and build artifacts

## Prerequisites

- Node.js 20+ installed
- npm
- A valid Gemini API key

## Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ShahirAhmedSiddiqui-lab/HashLink-Corp.-Portfolio.git
   cd "HashLink Portfolio"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a local environment file:
   - Copy `.env.example` to `.env.local`
   - Add your Gemini API key

   Example `.env.local`:
   ```text
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   APP_URL="http://localhost:3000"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```text
   http://localhost:3000
   ```

## Environment Variables

- `GEMINI_API_KEY`: Required for the AI audit endpoint
- `APP_URL`: Used for local app URL configuration

**Important:** Do not commit `.env.local` or secrets to source control.

## Deployment on Vercel

1. Import the repository into Vercel.
2. Set the environment variable `GEMINI_API_KEY` in the Vercel dashboard.
3. Set the build command to:
   ```bash
   npm run build
   ```
4. Set the production command to:
   ```bash
   npm run start
   ```
5. Deploy the app.

## Project Scripts

- `npm run dev` — Start the local development server with Vite middleware.
- `npm run build` — Build the frontend and bundle the server for production.
- `npm run start` — Run the built production server.
- `npm run preview` — Preview the production build.
- `npm run clean` — Remove the `dist` folder.
- `npm run lint` — TypeScript type check only.

## Notes

- The project uses `dotenv` to load `.env.local` first, then falls back to `.env`.
- The Express server binds to `127.0.0.1` and the browser should use `http://localhost:3000`.
- The GitHub remote is configured for `https://github.com/ShahirAhmedSiddiqui-lab/HashLink-Corp.-Portfolio.git`.

## Contact

For support or deployment questions, update the repository and ensure your Vercel environment variables match the local config.
