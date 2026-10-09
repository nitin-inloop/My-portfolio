Hyy! I am Nitin Building Production grade systems.

---

## This repo — nitin.me

React + Vite portfolio. Dark, GitHub-profile-style layout with a live contribution graph.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

### Where the content lives

Everything editable is in **`src/data.js`** — profile, bio lines, experience, honors,
projects, education, quote. The components just render it.

- **Project screenshots** live in `public/` and are referenced by path in `data.js`
  (e.g. `img: "/sonicpersona.png"`). Filenames are case-sensitive on most hosts.
- **`repo` / `live`** on a project are optional — a link only renders when the URL is set.
- **`twitter` / `resume`** on `profile` are empty by default; fill them in and the
  matching pill appears in the hero automatically.
- **`location` / `type`** on an experience entry are optional too.
- Drop a square `public/profile.jpg` to replace the `NM` initials avatar.

### Contribution graph

`src/Contributions.jsx` reads real data for `profile.githubUser` from the public
[jogruber contributions API](https://github-contributions-api.jogruber.de) (GitHub's own
REST API doesn't expose this). Responses are cached in `sessionStorage` for an hour.
If the request fails, the section says so and links to the GitHub profile — it never
draws placeholder squares.
