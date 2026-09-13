# Digital Ganpati Invitation

A premium, mobile-first Ganpati invitation / digital darshan website.

## Files
- `index.html` — complete page
- `style.css` — premium visual design and responsive layout
- `script.js` — configuration, animations, aarti player, calendar, map, sharing and blessings
- `assets/audio/` — put your MP3 aartis here

## Customize
Open `script.js` and edit the `CONFIG` object at the top:
- familyName
- date
- pujaTime
- venue
- mapLink
- calendar
- schedule
- aartis

For each aarti, put its MP3 inside `assets/audio/` and update the filename.

## Run locally
You can open `index.html` directly, but a local server is better for audio and browser APIs.

VS Code:
1. Open the folder.
2. Install/use Live Server.
3. Open `index.html`.

Or:
`python -m http.server 5500`

Then visit:
`http://localhost:5500`

## Deploy
Works as a static site on GitHub Pages or Vercel.

## Important
The included Ganpati visual is an elegant symbolic placeholder so the project works immediately. Replace it with your preferred Ganpati artwork/photo by editing the `.ganesh-art` and `.darshan-idol` sections.
