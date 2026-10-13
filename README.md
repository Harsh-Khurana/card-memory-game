# Card Memory Game

<p align="center">
  <img src="public/cmg-logo.svg" alt="Card Memory Game logo" width="120" />
</p>

A memory card game in the browser. All cards start face down. Flip two at a time to find matching pairs, and match every pair as fast as you can.

**Play it live:** https://mycardmemorygame.netlify.app/

## Features

- **Three difficulty levels**
  | Level  | Grid  | Pairs |
  | ------ | ----- | ----- |
  | Easy   | 2 × 2 | 2     |
  | Medium | 4 × 4 | 8     |
  | Hard   | 6 × 6 | 18    |
- **Kaomoji cards**: each card shows a text emoticon like `(｡•ᴗ•｡)` or `≽^•⩊•^≼`.
- **Flip animation** on every card.
- **Live timer** that runs while you play.
- **Best times per level**, saved in `localStorage` and shown in the **Stats** dialog on the home screen.
- **New high score** message when you beat your best time.

## How to play

1. Choose a level on the home screen and click **Play**.
2. Click a card to flip it, then click a second card.
3. If the two cards match, they stay face up. If not, both flip back after one second.
4. Keep going until every pair is matched. Your time is saved if it beats your best for that level.

## Tech stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- Plain CSS, and the native `<dialog>` element for modals
- ESLint

## Getting started

You need [Node.js](https://nodejs.org/) (a version supported by Vite 8) and npm.

```bash
git clone https://github.com/Harsh-Khurana/card-memory-game.git
cd card-memory-game
npm install
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173).

### Scripts

| Command           | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot module replacement    |
| `npm run build`   | Type-check and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally                  |
| `npm run lint`    | Run ESLint                                          |

## Project structure

```
src/
├── App.tsx              # Top-level state: selected level, screen, saved stats
├── App.css / index.css  # Styles
├── main.tsx             # Entry point
├── utils.ts             # Card grid generation and shuffling, time helpers
└── components/
    ├── Home.tsx         # Home screen: instructions, level picker, stats
    ├── Game.tsx         # Game board and matching logic
    ├── Card.tsx         # A single flip card
    ├── Timer.tsx        # Elapsed-time display
    └── Modal.tsx        # Wrapper around the native <dialog>
```

## Deployment

The live site is hosted on [Netlify](https://www.netlify.com/). This is a static site, so any static host works. Run `npm run build` and serve the `dist/` folder.
