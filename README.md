# MISO-OS: story-mode portfolio
Next.js 14 + XState. No AI calls: every line is pre-written; a state machine runs the show.

## Customize
Edit **lib/data.js**: name, links, dialogue, projects, stack, experience, FAQ.
Project screenshots: put images in `public/projects/` and set `image: "/projects/x.png"`.
To rename Miso, find/replace "Miso" in lib/data.js, components/*, app/layout.js.

## Run:  npm install && npm run dev
## Deploy: push to GitHub → import on vercel.com → Deploy (or `npx vercel`)

Controls: click Miso to boop · ignore him 30s and he sleeps · keys A–D answer · ⌘K / Ctrl+K palette (try "sudo hire yourname").
