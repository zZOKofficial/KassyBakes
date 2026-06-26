# 🎂 Kassy Bakes

> Freshly baked happiness, with a little cat chaos.

A cozy, cat-themed boutique bakery website for **Kassy Bakes** — a handmade dessert business serving cakes, cupcakes, brownies, milk cakes and more, all made fresh to order and supervised by two very opinionated cats, **Rico & Sam**.

The site is a fast, fully static, dependency-free front-end. Orders flow straight from the website to the owner via WhatsApp, backend has not been implemented yet. Soon I will connect it with a database with proper admin panel.

## ✨ Features

- **Cozy cat-themed design** — warm caramel/chocolate palette, bespoke hand-drawn SVG cat art (no images to load).
- **Day / Night theme** — persisted to `localStorage`, respects `prefers-color-scheme`, applied pre-paint to avoid a flash of the wrong theme.
- **Single source of truth for the menu** — all categories and products live in `js/data.js`; every page renders from it, so the homepage featured grid and full menu never drift apart.
- **Live menu** — category filter chips, instant search, and a live result count.
- **WhatsApp order flow** — the order form prefills from `?item=` deep-links, shows a live order summary, and composes a ready-to-send WhatsApp message on submit.
- **Stylised gallery** — masonry of gradient + emoji "photo" tiles (decorative, trivially swappable for real `<img>` tiles later).
- **Polished motion** — reveal-on-scroll, parallax, magnetic buttons, marquee, toasts, scroll progress — all respecting `prefers-reduced-motion`.
- **Accessible & responsive** — skip links, ARIA labels, semantic markup, mobile-first layout.

## 📂 Project Structure

```
KassyBakes/
├── index.html          # Home — hero, values, about teaser, featured menu, cats, reviews, CTA
├── menu.html           # Full menu with filters + search
├── order.html          # Order form → WhatsApp
├── gallery.html        # Stylised dessert gallery
├── cats.html           # Meet Rico & Sam
├── about.html          # Our story
├── css/
│   ├── core.css        # Theme tokens, base styles, shared components
│   └── pages.css       # Page-specific layouts
└── js/
    ├── data.js         # 🔑 Single source of truth — menu categories, products, contact links
    ├── components.js   # Shared injected components: preloader, nav, footer, toast host, back-to-top
    ├── cards.js        # Shared product card template (used by home + menu)
    ├── menu-render.js  # Builds menu filters + cards from data
    ├── home.js         # Renders the homepage featured grid
    ├── gallery.js      # Builds the gallery masonry
    ├── order.js        # Order flow + WhatsApp message composer
    └── ui.js           # Interaction layer: theme toggle, scroll/parallax, reveals, magnetic btns
```

## 🚀 Getting Started

No build step, no dependencies. Just serve the folder.

**Open directly** — double-click `index.html`, or:

**Serve locally** (recommended, so relative paths and `fetch`/links behave):

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve
```

Then visit `http://localhost:8000`.

## 🛠️ Customising

Most content lives in one place — **`js/data.js`**:

- **Contact links** — set `whatsapp` (international format, digits only), `instagram`, and `facebook` at the top.
- **Menu** — edit the `categories` and `products` arrays. Each product supports `name`, `emoji`, `tag`, a `from` gradient pair (drives the card art), `price`, an optional `featured` flag (shown on the homepage), and an optional `cat_pet` (`'rico'` or `'sam'`) badge.
- **Prices** — currently placeholders in BDT (৳); edit inline.

> ⚠️ **Before launch:** replace the placeholder WhatsApp number (`8801000000000`) and the Instagram/Facebook URLs in `js/data.js`.

## 🐾 The Cast

- **Rico** — the warm & playful one. Caramel-obsessed and always first to taste-test.
- **Sam** — the mysterious elegant one. Silently judges every batch; secretly loves midnight brownies.

## 📦 Tech

Plain HTML, CSS, and vanilla JavaScript — zero frameworks, zero build tooling, zero runtime dependencies. Bespoke SVG illustrations instead of image assets keep it fast and crisp at any size.
