# Project CLAUDE.md: tech-geek-support

TechGeek.support, z4nta0's free tech help site for everyday people (React,
Vite, React Router), deployed on Netlify at https://techgeek.support/. Every
rule in the user-level CLAUDE.md applies here, from the rebuild on (decided by
the user 2026-10-16); this file records only what's specific to this project.
TechGeek.dev (`../tech-geek-dev`) is the source of this project's configs and
test suites, TechGeek.cards (`../tech-geek-cards`) the closest worked example
of a sister site built on the shared design from its first day, and the
shared design comes from `techgeek-design` (`../techgeek-design`, installed
from its `v0.1.0` tag).

## Origin and sibling sites
This repository once held the portfolio, the support articles, and the
greeting cards on one site. It split into three sister sites that share one
design: techgeek.dev (the portfolio), techgeek.cards (the cards), and
techgeek.support (this project, converted last, since it was the live site).
- **Cut down to Support only** on 2026-10-16 (the `support-only` branch,
  merged as version 1.10.0), then rebuilt from TechGeek.dev's configs on the
  `rebuild` branch.
- **No redirects** from the old portfolio and card addresses (`/work`,
  `/fathersdaycard`, and the like), decided by the user 2026-10-16: they
  weren't live long or shared much, so they reach the 404 page.
- **History purge** (2026-10-12): every PNG, video, `node_modules/`, and
  `dist/` was removed from the whole history, taking the repository from
  about 310 MB to under 10 MB. Large image originals are never committed.

## Kind of site
Decided by the user 2026-10-16. z4nta0's real help site, indexed with normal
SEO (never the demo treatment), and free.
- **Audience**: everyday, non-technical people with device problems, and
  people who want to understand what something is or how it works (AI, the
  cloud, ...). Never developers or coding questions, which have far better
  resources elsewhere, so there are no programming topics.
- **Feel**: calm and reassuring first, techy but never intimidating, with a
  small touch of whimsy that never undercuts competence.
- **Pages**: Home, Articles (the help center, each article at its own
  address), About, Contact (the question form, the site's main action), and
  a 404, following TechGeek.dev's and TechGeek.cards' page conventions.
- **Topics**: Windows, Mac, iPhone, iPad, Android, Linux, Smart Home,
  Internet & Wi-Fi, Email & Accounts, Scams & Safety, and Understanding Tech
  (the "What is...?" questions).
- **Promise**: all help is free, and every question is answered by email
  within 24 hours.
- **Question form**: Netlify Forms, as on the sister sites (replacing the old
  EmailJS function): a hidden copy of form `question` in `index.html`
  registers its fields (name, email, topic, question, and the `bot-field`
  honeypot), and the page posts them form-encoded to `/`. Netlify emails each
  submission to contact@techgeek.support with the visitor's email as the
  reply-to.
- **Structured data**: a `WebSite` for this domain whose author is the same
  `Person` TechGeek.dev describes (`https://techgeek.dev/#person`), as
  TechGeek.cards does.
- **Voice**: page copy speaks as z4nta0 in the first person; articles speak
  to the reader as "you".
- **Future feature, not now**: talking with z4nta0 directly (live help or
  booked sessions), which the user may add once they know they have the
  time.

## Theme
Decided by the user 2026-10-16, mixing the three directions offered:
- **Hero**: "Calm Signal": the pitch beside the signal rings
  (`ui/signal-rings.tsx`), a speech bubble at the center of soft teal rings
  that ripple out once as the page opens, with an orange sparkle that pops
  in after them.
- **Topic tiles**: "Fix-it Kit": soft ivory tiles with a dashed, stitched
  border inset from the edge and a hint line under each topic, carrying
  "Friendly Conversation"'s small speech-bubble icon.
- **How it works**: "Calm Signal"'s three white step cards, chosen to match
  the hero.
- **Colors**: the family's palette, plus one role this site adds, the teal
  accent family: `--act-mai-col` (#2A9D8F, for drawings, dots, and fills,
  never buttons or links, which stay orange; about 2.9:1 on the ivory, so
  never text), `--act-dar-col` (about #007063, its text and icon shade), and
  `--act-tin-col` (#D3EEE9). The names match TechGeek.cards' berry role.
- **Type**: the family's three faces; leads and article text read a step
  larger than the family's body size (the base plus 2, about 19.3px), since
  many readers here are older or nervous about technology.

## Articles
Decided by the user 2026-10-16; the workflow is still being refined.
- **Research first**: an AI agent finds the problems everyday people actually
  struggle with (social media, forums, search data), records how and where
  each was found, and drafts the article; the user reviews it and adds photos
  or videos where they help.
- **Drafts** live in `research/articles/` as Markdown, each with its research
  notes (why the problem was chosen, where it was found, the official sources
  its steps were checked against, and media suggestions), which are never
  published. The starter set is one article per topic.
- **Published articles are Markdown** (decided by the user 2026-10-16), one
  folder per article, `src/articles/<slug>/`, holding `article.md` and the
  optimized photos it uses, so everything for one article sits together; the
  folder's name is the article's address (`/articles/<slug>`). Photo
  originals live outside the site in `design/articles/<slug>/`, per the
  Images rule. Once a draft is reviewed, its article moves to
  `src/articles/` and its research notes stay in `research/articles/`, so
  the two never drift apart as copies.
- **Markdown formatting** (decided by the user 2026-10-16): article files are
  content, formatted like JSON and the plain-text config files rather than
  code. The front matter starts on line 1, the file ends with exactly one
  newline, the front matter's keys are alphabetical (`published`, `summary`,
  `title`, `topic`, and `updated` when an article is revised), each paragraph
  or list item sits on one unwrapped line so an edit stays small in a diff,
  and the Copy rules apply. No What/Why/How comments, since it's content.
  `topic` is the topic's identifier from `ui/topics.ts` (`internet-wi-fi`),
  and `summary` is 100 to 125 characters, as it's the search description.
- **Supported Markdown**: the site reads articles with its own small parser
  (`utils/markdown.ts`), never a library and never raw HTML: `##` and `###`
  headings, paragraphs, numbered steps (`1.`), bullet lists (`-`), tips
  (`> **Tip:** ...`), a photo or video alone on its line (`![alt
  text](photo.webp "Optional caption")`, a `.mp4` making it a video), and
  inside a line **bold**, *italic*, and `[links](/articles/...)`. An HTML
  comment (`<!-- Image: what it should show -->`) is skipped, which keeps a
  reminder of a photo still to add without showing anything.

## Build plan
On the `rebuild` branch, following the sister sites.
1. **Scaffold**: TechGeek.dev's configs, ESLint, TypeScript, the shared
   design package, the favicon set, `_headers`, `_redirects`, `robots.txt`,
   the sitemap, the head and its hidden question form, the routes with
   placeholder pages, and the test suites copied for adapting. Test server
   port 5196 (the siblings use 5190 through 5195).
2. **Theme**: three directions offered to the user before any styling.
3. **Pages**: Home, Articles and the article page, About, Contact with the
   question form, and the 404, in the chosen theme.
4. **Articles**: the researched drafts reviewed by the user, then converted to
   the site's article format.
5. **Tests**: every suite adapted to this site's pages and passing in all
   three engines, with rendering baselines.
6. **SEO and social preview**: every page's title, description, and
   canonical link, each article's own, the sitemap, and the preview card.
7. **Close-out**: the README, rule audit rounds until clean, and the version
   bump.

## Test suites
Copied from TechGeek.dev on 2026-10-16 and adapted in build step 5. Playwright
suites live in `tests/`, one project per suite and engine in
`tests/playwright.config.ts`, which starts its own dev server on port 5196.
