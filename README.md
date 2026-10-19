# TechGeek.support

Free, friendly tech help for everyday people by z4nta0, the Tech Geek: plain-spoken, step-by-step help articles, and a question form answered by email within 24 hours. It's written for people who aren't technical, whether something on their phone or computer stopped working or they just want to know what something is, like AI or the cloud.

Live at [techgeek.support](https://techgeek.support/).

It's one of three sister sites that share a design so they read as one family, and its footer links to the other two. The shared design (the tokens, fonts, base styles, bar, footer, and mark) lives in the [techgeek-design](https://github.com/z4nta0/techgeek-design) package, which each site installs:

- **[techgeek.dev](https://techgeek.dev/)**: z4nta0's developer portfolio.
- **[techgeek.support](https://techgeek.support/)**: this tech help site.
- **[techgeek.cards](https://techgeek.cards/)**: animated digital greeting cards.

## Stack

- **Node.js** 22.22 or newer (React Router 8 requires it)
- **Vite 8** dev server / bundler
- **React 19** + **TypeScript 6**
- **React Router 8** (Home, Articles, a page for each article, About, Contact, and a 404 page for every other path)
- **techgeek-design**, the family's shared design package, installed from GitHub at a tagged release
- **ESLint 9** with typescript-eslint, and **Playwright** with axe-core for the test suites
- Deployed on **Netlify**, which serves `index.html` for every path without a page of its own (`public/_redirects`), sends the security headers in `public/_headers`, and handles the question form through Netlify Forms

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Checks

```bash
npm run lint       # ESLint across the repo
npm run typecheck  # TypeScript across src/, the configs, scripts/, tests/, and the design/ scripts
```

## Tests

```bash
npm test                    # every suite
npm run test:accessibility  # axe-core plus scripted naming, keyboard, reflow, and motion checks, and a check that no source comment shows on a page
npm run test:interaction    # page navigation, the phone menu, the question form, and every link and button's hover, press, and focus feedback
npm run test:rendering      # full-page screenshots of each page state against approved baselines
npm run test:responsive     # every page and the phone menu from 320 to 1,920px: no sideways scroll, spill, or overlap, and every paragraph within its measure
npm run test:seo            # titles, descriptions, canonical links, robots, link previews, structured data, icons, robots.txt, and the sitemap, for every page and article
```

Each suite runs in Chromium, Firefox, and WebKit against its own dev server on port 5196, so a dev server already running on 5173 is left alone. The states the suites visit are Home, Articles, About, Contact, the 404 page, and one article (the slow Wi-Fi one, which uses every kind of content an article can hold, standing in for the rest, since every article shares one page), each at phone and desktop widths, plus the open phone menu. Reports land in `tests/output/` (git-ignored); `npx playwright show-report tests/output/report` opens the HTML report.

The rendering suite's approved screenshots live in `tests/rendering/baselines/` and match to the pixel, so after a change meant to alter how a page looks, review the diff in the report, then run `npm run test:rendering -- --update-snapshots` and commit the new baselines with the change. The baselines were captured on Linux, and font rendering differs between systems, so on macOS or Windows refresh them locally before relying on the comparison. If a browser is missing, `npx playwright install chromium firefox webkit` installs all three.

## Build

```bash
npm run build
npm run preview
```

The build also writes a copy of the page for every article (`articles/<slug>.html`), carrying that article's title, description, link preview tags, and structured data, since link previews and many crawlers read a page's raw HTML without running its script. It adds a rewrite rule for each to `_redirects` and every article to the sitemap. The dev server serves both the same way.

## Images

The icons and link preview images are rendered by scripts, so they can be rebuilt whenever something changes:

```bash
npm run og-images  # captures the link preview images from design/og-image/card.html: the site's own og-image.png and one for each article in public/social/
npm run icons      # copies the design package's favicon.svg into public/ and renders favicon.ico, the PNG icons, and the Apple touch icon from it
```

## Adding an article

1. Give the article its own folder, `src/articles/<slug>/`, named for its address (`/articles/<slug>`), holding `article.md` and any photos it uses. Photo originals go in `design/articles/<slug>/`, outside the site, and only optimized copies go in the article's folder.
2. Start `article.md` with its front matter on line 1, keys in alphabetical order: `published` (its date), `summary` (120 to 125 characters, since it's the search description and link preview checkers flag one under 120), `title`, `topic` (a topic's identifier from `src/ui/topics.ts`, such as `internet-wi-fi`), and `updated` once it's revised. Write each paragraph or list item on one line, and end it with the invitation to ask.
3. Run `npm run og-images` for its link preview image.

The site picks the new folder up on its own: the Articles page lists it, the build gives it its own page and sitemap entry, and the SEO suite checks it, all without editing anything else. Drafts and their research notes (why each problem was chosen, where it was found, and the sources its steps were checked against) live in `research/articles/` and are never published.

Articles are read by the site's own small Markdown reader (`src/utils/markdown.ts`), which takes:

- `##` and `###` headings, paragraphs, numbered steps (`1.`), and bullet lists (`-`)
- tips, written `> **Tip:** ...`
- a photo or video alone on its line, `![alt text](photo.webp "Optional caption")`, where a `.mp4` makes it a video
- **bold**, *italic*, and `[links](/articles/...)` inside a line
- an HTML comment (`<!-- Image: what it should show -->`), which shows nothing, for a reminder of a photo still to add

## Project structure

```
src/
├── articles/          The published articles, each in its own folder holding article.md and its photos
├── pages/
│   ├── home/          Home page and its .module.css
│   ├── articles/      The Articles page: the topic filter, the list, and its help card
│   ├── article/       The page every article reads in
│   ├── about/         About page and its .module.css
│   ├── contact/       Contact page with the question form, and the "?" help tips beside its labels
│   └── not-found/     The 404 page every unknown path shows, with its .module.css
├── ui/                What more than one page uses: the article catalog (articles.ts), the topics, the topic tag, the signal rings, the hero flourishes, page titles, and page-links.ts (the pages the bar and footer link to)
├── styles/            styles.css: this site's teal color, larger reading size, and layout values, loaded after the design package's stylesheets
├── utils/             markdown.ts, the reader that turns an article's Markdown into the page's content
├── app.tsx            Root component and the route table
└── main.tsx           Entry point
public/                Files served at fixed addresses: the icons, robots.txt, sitemap.xml, Netlify's _headers and _redirects, and the link preview images: the site's own og-image.png and each article's in social/
scripts/               article-files.ts, which lists the articles for code that runs in Node: the build, the preview image script, and the SEO suite
research/articles/     The article drafts and their research notes, never published
tests/
├── accessibility/     axe-core scan and scripted checks
├── interaction/       navigation, phone menu, question form, and hover, press, and focus feedback checks
├── rendering/         screenshot comparisons and their baselines/
├── responsive/        layout checks across screen widths
├── seo/               head tags, structured data, icon, and crawler file checks
├── support/           the page states the suites visit
└── playwright.config.ts

design/                Source artwork and the scripts that render it, not served
├── icons/             render.mts, which builds the icon set in public/ (npm run icons)
└── og-image/          card.html and render.mts, which capture the link preview images (npm run og-images)
```

## Design notes

- **Theme:** Calm and reassuring first, techy but never intimidating, with a small touch of whimsy. The hero's "Calm Signal" rings ripple out once from a speech bubble as the page opens; the topic tiles borrow a fix-it kit's stitched borders; and the help, safety, and Still Stuck panels sit on a pale teal.
- **Type pairing:** The family's three self-hosted fonts from the design package: Syne for headings, body text, and the wordmark, DM Mono for labels and buttons, and Lora's italic for the hero's note and the phone menu's tagline. Leads and article text read a step larger than the family's body size, since many readers here are older or nervous about technology.
- **Palette:** The family's warm ivory page (`#F5F0E8`), deep ink (`#1A1A2E`), bright orange (`#F26419`), and soft blue (`#7DB9D8`), plus one color of this site's own, a calm teal (`#2A9D8F`), used for drawings, dots, and fills, never for buttons or links, which stay orange. Teal text reads a darker shade so it meets contrast.
- **Scale:** Every size, from type to spacing to motion, is a step on one scale built from the plastic ratio (about 1.32) on an 11px base, and layout widths grow with the screen between fixed bounds. The question form's labels size to the form's own width, so each label and its "?" tip stay on one line.
- **Motion:** Each page fades up into place, the hero's rings ripple out with an orange sparkle popping in after them, and a "?" tip's bubble settles into place. Links, buttons, pills, and cards respond to hover, press, and keyboard focus with a color shift, a small lift or press-in, and a focus ring that eases in. All of it turns off when a visitor's system asks for reduced motion, leaving only the instant color and position changes.

## Search and the question form

Home, Articles, every article, About, and Contact are indexed, each with its own title, description, and canonical link, while the 404 page carries `noindex`. Each article also has its own link preview card and `Article` structured data. The site's structured data describes it as a `WebSite` by z4nta0, the same person TechGeek.dev describes. `index.html` carries the home page's title and description, since link checkers and many crawlers read it without running the site's script.

The question form posts to Netlify Forms: a hidden copy of the form in `index.html` registers its fields, and Netlify emails each question to contact@techgeek.support, with the visitor's email as the reply-to. The email address is optional, and the form says plainly that without one there's no reply, so the visitor checks back for an article. An address is used only to reply, never sold, shared, or added to a mailing list, and a question that becomes an article is rewritten from scratch, so nothing in it points back to whoever asked.
