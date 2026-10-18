# Welcome Guide Builder (v1)
Static, no-backend guest welcome guide generator. Open index.html (served over http/https), fill the form (autosaves to localStorage), click "Create guest link". All guide data is LZ-compressed into the URL hash (#g=...), so the guest view renders from the link alone.
Libraries (local, MIT): lib/lz-string.min.js, lib/qrcode.js (Kazuhiko Arase).
Deploy: upload this folder to any static host (GitHub Pages, Netlify Drop, Cloudflare Pages).
