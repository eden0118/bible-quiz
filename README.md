# Bible Wisdom Flashcards

A modern, interactive flashcard game built with React, TypeScript, and styled with Tailwind CSS.

## Project Structure

- `App.tsx`: Main application logic and layout.
- `data.ts`: Contains the Bible card data separated from logic, with support for English and Chinese.
- `theme.ts`: Manages theme configuration (colors) and the dark mode toggle logic.
- `i18n.ts`: Contains translation dictionaries for UI elements.
- `index.tsx`: Application entry point.
- `index.html`: Main HTML file with Tailwind CDN configuration.

## Features

- **Bilingual Support**: Toggle between English and Chinese (Traditional).
- **Dark Mode**: Fully supported dark theme with adapted glassmorphism effects.
- **Interactive UI**: Animated backgrounds, glass-effect cards, and smooth transitions.
- **Gamification**: Time-based scoring, streaks, and local leaderboard.

## Development with Vite + Tailwind CSS v4

To migrate this to a local production environment:

1.  Initialize a new Vite project:
    ```bash
    npm create vite@latest bible-flashcards -- --template react-ts
    cd bible-flashcards
    npm install
    ```

2.  Install Tailwind CSS v4:
    ```bash
    npm install tailwindcss @tailwindcss/vite
    ```

3.  Configure Vite (`vite.config.ts`):
    ```ts
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite'

    export default defineConfig({
      plugins: [react(), tailwindcss()],
    })
    ```

4.  Add CSS import in `src/index.css`:
    ```css
    @import "tailwindcss";
    ```

5.  Copy the source files (`App.tsx`, `data.ts`, `theme.ts`, `i18n.ts`) into the `src/` folder and update `main.tsx` (or `index.tsx`) to match.

