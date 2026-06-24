# 🎂 Birthday Gift Website

A romantic, interactive birthday gift website — just like the TikTok coding tutorial! Built with plain HTML, CSS, and JavaScript, ready to deploy on **Vercel**.

## Features

- 🔒 **Birthdate unlock** — she enters her birthday to reveal the gift
- 🎂 **Blow the candle** — interactive cake with flickering flames
- ⏱️ **Relationship counter** — live days/hours/minutes/seconds since you got together
- 💚 **Open My Heart** — photo banner + love letter reveal
- 💕 **"You Are Loved" modal** — heartfelt popup message
- 📁 **Photo gallery** — "Our Precious Memories"
- 💌 **Full love letter** — open & close anytime
- 💚 **Reasons Why I Love You** — customizable cards

## Personalize It

Edit **`js/config.js`** before deploying:

| Setting | What it does |
|---|---|
| `herName` | Her name (used in messages) |
| `yourName` | Your name (shown in footer) |
| `birthdate` | Her birthday — `YYYY-MM-DD` (unlock password) |
| `relationshipStart` | Date you became a couple |
| `photos` | Replace with your own photo URLs or local paths |
| `bannerPhotos` | Top row of couple photos |
| `reasons` | Edit the "Why I Love You" cards |
| `fullLetterBody` | Your personal love letter |

### Adding your own photos

1. Create an `images/` folder
2. Drop your photos in (e.g. `images/us1.jpg`)
3. Update `config.js`:
   ```js
   { src: "images/us1.jpg", alt: "Our first date" }
   ```

## Deploy to Vercel

### Option A — GitHub + Vercel (recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Add birthday gift website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/monthsarygift.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **"Add New Project"**
   - Import your `monthsarygift` repository
   - Vercel auto-detects it as a static site — click **Deploy**
   - Done! You'll get a URL like `monthsarygift.vercel.app`

3. **Share the link** with her on her birthday! 🎉

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. Run `vercel --prod` for the production URL.

## Local Preview

Just open `index.html` in your browser, or use a simple server:

```bash
npx serve .
```

Then visit `http://localhost:3000`

## Project Structure

```
monthsarygift/
├── index.html       ← main page
├── css/style.css    ← all styles
├── js/
│   ├── config.js    ← ✏️ personalize here
│   └── main.js      ← interactions
├── images/          ← your photos (create this)
└── vercel.json      ← Vercel config
```

Made with ❤️
