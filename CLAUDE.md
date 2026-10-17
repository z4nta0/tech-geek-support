# Project CLAUDE.md: tech-geek-support

TechGeek.support, z4nta0's free tech help site for everyday people (React,
Vite, React Router), deployed on Netlify at https://techgeek.support/. Every
rule in the user-level CLAUDE.md applies here, from the rebuild on (decided by
the user 2026-10-16); this file records only what's specific to this project.
TechGeek.dev (`../tech-geek-dev`) is the source of this project's configs and
test suites, TechGeek.cards (`../tech-geek-cards`) the closest worked example
of a sister site built on the shared design from its first day, and the
shared design comes from `techgeek-design` (`../techgeek-design`, installed
from its `v0.4.0` tag).

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
  honeypot), and the page posts them form-encoded to `/`. The email address is
  optional (decided by the user 2026-10-16): its hint says it's only used to
  reply and that without it there's no reply or follow-up question, so the
  visitor checks back for an article, and the thank-you says the same when
  none was given. Netlify emails each
  submission to contact@techgeek.support with the visitor's email as the
  reply-to.
- **Help tips** (decided by the user 2026-10-17): the email and question
  hints sit behind a small "?" button (`pages/contact/help-tip.tsx`) that
  follows each label, opening a bubble on a mouse hover or on a click or tap,
  and closing on Escape or a press elsewhere; each field still names its
  bubble for screen readers. The password warning also shows as the
  question box's placeholder, so every visitor sees it before typing.
  The labels ease from the base plus 2 size toward the base plus 1 size with
  the form's own width (`3.8cqi`), and the email label reads "Your email
  (optional)", so every label and its tip stay on one line at every width;
  the longer "Your email address" couldn't fit beside its tip above
  1,024px at a readable size. The name and email boxes show "John" and
  "you@example.com" as placeholders.
- **Structured data**: a `WebSite` for this domain whose author is the same
  `Person` TechGeek.dev describes (`https://techgeek.dev/#person`), as
  TechGeek.cards does.
- **Voice**: page copy speaks in the first person as "the Tech Geek"
  (decided by the user 2026-10-16), the friendlier name for z4nta0, which is
  a developer moniker; z4nta0 appears only in the author meta and the
  structured data. Home's eyebrow reads "Your friendly neighborhood Tech
  Geek", a nod to Spider-Man's tagline and the site's touch of whimsy.
  Articles speak to the reader as "you".
- **Privacy** (decided by the user 2026-10-16): a visitor's email address has
  one purpose, letting z4nta0 reply, and the copy says so plainly: never
  sold, shared, added to a mailing list, or used for anything else. Copy
  never claims it isn't stored, since Netlify Forms keeps each submission in
  the site's dashboard until it's deleted. A question that becomes an article
  is rewritten from scratch, so nothing in it points back to whoever asked.
- **Article link previews** (decided by the user 2026-10-16): each article
  gets its own preview card and tags when shared, as each card does on
  TechGeek.cards, built in the SEO step.
- **Future feature, not now**: talking with z4nta0 directly (live help or
  booked sessions), which the user may add once they know they have the
  time.

## Theme
Decided by the user 2026-10-16, mixing the three directions offered:
- **Hero**: "Calm Signal": the pitch beside the signal rings
  (`ui/signal-rings.tsx`), a speech bubble at the center of soft teal rings
  that ripple out once as the page opens, with an orange sparkle that pops
  in after them. In one column the rings lead the hero, full size on a
  tablet (641 to 768px); on a phone (640px and below) they shrink to a
  cropped, 59px version beside the eyebrow in place of its dot, so the
  heading and the Ask a Question button stay on an iPhone SE's first screen
  (decided by the user 2026-10-17, after trying the rings above the pitch).
- **Topic tiles**: "Fix-it Kit": soft ivory tiles with a dashed, stitched
  border inset from the edge and a hint line under each topic, carrying
  "Friendly Conversation"'s small speech-bubble icon. At 640px and below the
  twelve tiles become one column of short rows, the icon beside the name and
  hint, since two across left no room for "Understanding" (2026-10-16, to be
  reviewed in the manual responsive pass).
- **How it works**: "Calm Signal"'s three white step cards, chosen to match
  the hero.
- **Articles help card** (decided by the user 2026-10-17): above 1,024px the
  Articles page shows a card beside the list that stays in view as it scrolls,
  with the small rings, an invitation to ask, the promise, the Ask a Question
  button, and a safety note. It grows from about 321px to 426px and sits
  flush with the content's right edge, the list stays aligned with the
  heading, and the topic pills spread each full row to both edges, the last
  row packed left. At 1,024px and below, where the pills need three rows or
  more below about 860px, every row packs left instead. Under the list, the article page's Still Stuck panel sits
  centered below both, fitted to its text.
- **Closing panels** (decided by the user 2026-10-17): the Still Stuck panels
  on the Articles and article pages, and About's closing panel, get generous
  room: both Still Stuck panels sit the p06 step below what comes before
  them, and all three pad their text one step more above and below than at
  their sides.
- **Contact sidebar** (decided by the user 2026-10-17): below the form, from
  1,024px down to 641px, the two white notes share a row and the safety card
  sits centered under them at the same width, the Card Grids rule's centered
  odd card exception; three across only fit down to about 880px, where the
  email address started breaking mid-word. At 640px and below they stack.
- **Bar wordmark**: "TechGeek.support" is the family's longest wordmark, so
  this site sets the package's `--bra-wor-siz` to ease it down below about
  440px (about 14px at 320px), keeping the menu button on screen without a
  breakpoint (decided by the user 2026-10-17, over stacking the wordmark on
  two lines). The full bar needs about 940px, which is why the package's bar
  keeps its menu up to 1,024px from `v0.3.0` on.
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
- **Its own page** (built 2026-10-16): link scrapers never run the site's
  script, so the build (`artPagFun` in `vite.config.ts`) writes a copy of the
  page per article, `articles/<slug>.html`, carrying its title, description,
  link preview tags (`og:type` article, its date and topic), and its own
  `Article` structured data, with a rewrite rule ahead of the catch-all in
  `_redirects`, and adds every article to the sitemap with its last change.
  The dev server serves both the same way. Code that runs in Node reads the
  articles through `scripts/article-files.ts`, since the site's catalog loads
  them through Vite.
- **Page title**: the article's title plus " | TechGeek.support" when both fit
  within 60 characters, or the title alone otherwise (`ui/article-title.ts`).
- **Preview image**: `public/social/<slug>.png`, the article's topic and title
  over the wordmark between the signal rings, drawn from
  `design/og-image/card.html`, which also draws the site's `og-image.png`.
  Run `npm run og-images` after adding or retitling an article.
- **Closing line**: every article ends by inviting the reader to ask, in the
  first person ("Ask me at TechGeek.support. It's free, and I'll reply within
  24 hours."), decided by the user 2026-10-16.
- **Supported Markdown**: the site reads articles with its own small parser
  (`utils/markdown.ts`), never a library and never raw HTML: `##` and `###`
  headings, paragraphs, numbered steps (`1.`), bullet lists (`-`), tips
  (`> **Tip:** ...`), a photo or video alone on its line (`![alt
  text](photo.webp "Optional caption")`, a `.mp4` making it a video), and
  inside a line **bold**, *italic*, and `[links](/articles/...)`. An HTML
  comment (`<!-- Image: what it should show -->`) is skipped, which keeps a
  reminder of a photo still to add without showing anything.
- **Photo sizes, still to do** (decided by the user 2026-10-17): the Images
  rule asks for every image's intrinsic `width` and `height` in its markup,
  and the article page's `<img>` has neither yet, since no article has a
  photo. The first article with a photo adds reading each photo's size at
  build time and rendering both attributes.

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
7. **Manual responsive pass** (added by the user 2026-10-16): the user checks
   every page by hand across screen widths, the Contact form especially, and
   the fixes land before the close-out.
   - **Full suites waited until the pass ended** (decided by the user
     2026-10-17): each fix got the typecheck, lint, build, and an
     accessibility scan of its page in all three engines, followed by the
     user's own accessibility pass with WAVE, and the full suites ran once
     after the last fix, on 2026-10-17. That run refreshed the About,
     Articles, article, and Contact baselines, matched the form tests' fields
     by their whole names now that each help tip's button shares their words,
     and added the check that no source comment shows on any page.
8. **Close-out**: the README, rule audit rounds until clean, and the version
   bump.

## Test suites
Copied from TechGeek.dev on 2026-10-16 and adapted the same day. Playwright
suites live in `tests/`, one project per suite and engine in
`tests/playwright.config.ts`, which starts its own dev server on port 5196.
- **States** (`tests/support/states.ts`): Home, Articles, one article (the slow
  Wi-Fi one, which has steps, bullets, and tips, standing in for every
  article, since they share one page), About, Contact, and the 404 at 390px
  and 1,440px, plus the phone menu open.
- **SEO** reads the article list through `scripts/article-files.ts`, so a new
  article is checked (head, raw preview tags, Article data, sitemap entry,
  preview image) without editing the suite.
- **Comment text**: the scripted accessibility suite fails any page whose
  visible text carries a `What:`, `Why:`, or `How:` label, the sign of a JSX
  comment written where it renders as text.
- **Rendering** baselines live in `tests/rendering/baselines`, captured on
  this Linux machine; refresh them with `npm run test:rendering --
  --update-snapshots` when a page is meant to look different.
