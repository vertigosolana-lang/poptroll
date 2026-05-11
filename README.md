# $POPTROLL — landing page

## what's inside
- `index.html` — the page
- `style.css` — all the styling (chaotic on purpose)
- `script.js` — the pop button, easter eggs, and other degeneracy
- `poptroll.gif` — **YOU ADD THIS** — your PFP gif goes here

## how to run
1. Drop `poptroll.gif` (your token PFP) in this same folder
2. Open `index.html` in your browser — that's it
3. Or right-click → "Open with Live Server" in VS Code for hot reload

If the gif is missing, the page falls back to a placeholder so you can still preview the layout.

## features / jokes baked in
- 🐸 troll-face cursor (custom SVG cursor)
- 🍿 click "POP" button — emojis explode out, counter goes up, label changes the more you click
- 🚨 hidden milestone toasts at 10, 50, 100, 420, 666, 1000 pops
- 🎯 the "BUY NOW" button dodges your mouse the first 3 times you try to click it, then mocks you when you finally do
- 📋 "copy CA" button trolls you because there's no CA yet
- 📊 stat counters animate when scrolled into view (69,420 holders cope number)
- 🎮 konami code easter egg (↑↑↓↓←→←→ b a) — try it
- 💬 hidden message in browser console for nerds who inspect source
- ✨ animated marquee, wobbling PFP frame with dashed orbits, asymmetric tilted cards
- 🎨 bungee shade display font + space mono — no generic Inter slop

## customizing
- Real contract address → edit `#ca` in `index.html`
- Social links → update the `href="#"` on the `.social` anchors in `index.html`
- Wanna change the pink/green? Edit the `:root` variables at the top of `style.css`

## deploying
Drag this folder into Netlify Drop, Vercel, or any static host. Or push to GitHub Pages. It's 3 plain files, no build step.

wagmi. ngmi. either way, gn ser. 🐸
