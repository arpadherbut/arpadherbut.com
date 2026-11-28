# arpadherbut.com

Personal Website

## Deployment

The site is plain static HTML/CSS/JS served by Cloudflare Workers (static
assets) on `arpadherbut.com` and `www.arpadherbut.com`.

- **Automatic:** every push to `master` is built and deployed by Cloudflare
  Workers Builds (`npx wrangler deploy`). Check progress in the Cloudflare
  dashboard under Workers & Pages → arpadherbut → Deployments.
- **Manual:** run `npx wrangler deploy` from this folder.

Config lives in `wrangler.jsonc`, response headers in `_headers`, and
`.assetsignore` keeps repo-only files off the website.

Styles live in `css/site.css` (colors are CSS variables at the top, with a
dark-mode set) and behavior in `js/site.js` (menu, job detail popups,
scroll fade-in). No framework. The header and footer are copied into every
page (marked "shared: keep in sync across pages"), so edit all pages when
changing them. When `site.css` or `site.js` changes, bump the `?v=N` on
their links so browsers fetch the new copy.
