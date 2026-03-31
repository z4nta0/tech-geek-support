import React from 'react'
import { Link } from 'react-router-dom'
import { GeoBg } from '../components/GeoBg'
import { Tag } from '../components/Tag'
import { SectionHeader } from '../components/SectionHeader'
import styles from './About.module.css'

const skills = {
  'Frontend': ['React', 'TypeScript', 'Next.js', 'Vite', 'CSS / Sass', 'Tailwind', 'Framer Motion', 'WebGL / Three.js'],
  'Backend':  ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'Auth / JWT', 'WebSockets'],
  'Data':     ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Drizzle', 'Elasticsearch'],
  'DevOps':   ['Docker', 'AWS', 'Vercel', 'Railway', 'GitHub Actions', 'Nginx'],
}

const timeline = [
  { year: '2024', title: 'Senior Full Stack Developer', org: 'Freelance', desc: 'Building products end-to-end for clients across fintech, SaaS, and e-commerce.' },
  { year: '2022', title: 'Full Stack Developer', org: 'Tech Startup', desc: 'Led frontend architecture for a B2B analytics platform used by 10k+ users.' },
  { year: '2020', title: 'Junior Developer', org: 'Web Agency', desc: 'Built bespoke CMS-driven websites and React SPAs for agency clients.' },
  { year: '2018', title: 'BSc Computer Science', org: 'University', desc: 'First-class honours. Dissertation on performant rendering in browser-based 3D environments.' },
]

export const About: React.FC = () => (
  <div className="page-enter">

    {/* ── Hero ── */}
    <section className={styles.hero}>
      <GeoBg variant="dots" opacity={0.2} />
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <span className={styles.heroLabel}>
            <span className={styles.heroLine} />
            About Me
          </span>
          <h1 className={styles.heroTitle}>
            Dev. Creator.<br />
            <span className={styles.accent}>Problem Solver.</span>
          </h1>
          <p className={styles.lead}>
            I'm a full-stack web developer with a passion for building things that
            are fast, accessible, and beautiful. I live at the intersection of
            engineering discipline and creative curiosity.
          </p>
          <p className={styles.body}>
            Based in the Pacific Northwest, I've spent the last six years turning
            complex problems into elegant software. Whether that's a high-performance
            API serving millions of requests, a React component library used by a
            team of twenty, or a tiny interactive greeting card that makes someone
            smile — I bring the same level of care to all of it.
          </p>
          <div className={styles.ctaRow}>
            <Link to="/contact" className={styles.ctaPrimary}>Work With Me</Link>
            <a href="/cv.pdf" className={styles.ctaSecondary} download>
              Download CV
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Photo / geometric portrait */}
        <div className={styles.heroVisual}>
          <div className={styles.portraitWrap}>
            <div className={styles.portraitFrame} aria-hidden>
              <svg className={styles.frameSvg} viewBox="0 0 320 360" fill="none">
                <polygon points="160,10 310,90 310,270 160,350 10,270 10,90" stroke="var(--orange)" strokeWidth="2" opacity="0.5"/>
                <polygon points="160,30 290,100 290,260 160,330 30,260 30,100" stroke="var(--blue)" strokeWidth="1" opacity="0.35"/>
              </svg>
            </div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
              alt="Developer portrait"
              className={styles.portrait}
            />
          </div>

          {/* Floating facts */}
          <div className={`${styles.floatCard} ${styles.floatTop}`}>
            <span className={styles.floatNum}>6+</span>
            <span className={styles.floatLabel}>Years coding</span>
          </div>
          <div className={`${styles.floatCard} ${styles.floatBottom}`}>
            <span className={styles.floatNum}>40+</span>
            <span className={styles.floatLabel}>Projects shipped</span>
          </div>
        </div>
      </div>
    </section>

    {/* ── Skills ── */}
    <section className={`section ${styles.skillsSection}`}>
      <div className="container">
        <SectionHeader
          label="Technical Skills"
          title="What I Work With"
          subtitle="The tools and technologies I reach for — and know deeply enough to teach."
        />
        <div className={styles.skillsGrid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillGroup}>
              <div className={styles.skillGroupHeader}>
                <span className={styles.skillGroupDot} />
                <h3 className={styles.skillGroupTitle}>{category}</h3>
              </div>
              <div className={styles.skillTags}>
                {items.map(skill => (
                  <Tag key={skill} label={skill} variant="blue" size="md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Timeline ── */}
    <section className={`section ${styles.timelineSection}`}>
      <GeoBg variant="grid" opacity={0.12} />
      <div className={`container ${styles.timelineInner}`}>
        <SectionHeader
          label="Experience"
          title="My Journey"
        />
        <div className={styles.timeline}>
          {timeline.map(({ year, title, org, desc }, i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <span className={styles.timelineYear}>{year}</span>
              </div>
              <div className={styles.timelineConnector}>
                <div className={styles.timelineDot} />
                {i < timeline.length - 1 && <div className={styles.timelineLine} />}
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>{title}</h3>
                <span className={styles.timelineOrg}>{org}</span>
                <p className={styles.timelineDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Values ── */}
    <section className={`section ${styles.valuesSection}`}>
      <div className="container">
        <SectionHeader
          label="How I Think"
          title="My Values"
          align="center"
        />
        <div className={styles.valuesGrid}>
          {[
            { icon: '⬡', title: 'Craft Over Speed', desc: 'I take time to do it right. Technical debt has compounding interest.' },
            { icon: '◎', title: 'Accessibility First', desc: 'The web is for everyone. I build with WCAG compliance as a baseline, not an afterthought.' },
            { icon: '△', title: 'Honest Communication', desc: 'I\'d rather tell you something takes three weeks than promise one and deliver late.' },
            { icon: '◇', title: 'Continuous Learning', desc: 'The best developers I know are the most curious. I read, I experiment, I teach.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className={styles.valueCard}>
              <span className={styles.valueIcon}>{icon}</span>
              <h3 className={styles.valueTitle}>{title}</h3>
              <p className={styles.valueDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  </div>
)
