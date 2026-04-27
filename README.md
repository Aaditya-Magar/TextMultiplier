# Text Multiplier

A modern, responsive web app to repeat any text up to 1000 times with line breaks, commas, copy-to-clipboard and `.txt` download. Clean UI with soft gradients and dark mode.

## Features
- Text input (max **300 characters**)
- Repeat **1–1000 times**
- Optional line break separator
- Optional comma separator
- Copy to clipboard
- Download as `.txt`
- Dark mode toggle (persisted)
- Mobile responsive
- Smooth animations & hover effects
- Live character count
- Real-time validation

## Screenshots
> _Add screenshots here_ — `screenshots/light.png`, `screenshots/dark.png`, `screenshots/mobile.png`

## Installation
```bash
git clone git@github.com:Aaditya-Magar/TextMultiplier.git
cd text-multiplier
npm install
npm run dev
```
Open the printed local URL. For a static build: `npm run build && npm run preview`.

## Usage
1. Type your text.
2. Choose repetitions (1–1000).
3. Toggle line break / comma separators.
4. Click **Generate**.
5. **Copy** or **Download** the result.

## Validation Rules
| Field | Rule |
|-------|------|
| Text  | Required, max **300 characters** |
| Count | Whole number between **1 and 1000** |

The **Generate** button is disabled until inputs are valid; inline messages explain any error.

## Tech Stack
React · TypeScript · Vite · Tailwind CSS · shadcn/ui · Lucide icons

## License
MIT
