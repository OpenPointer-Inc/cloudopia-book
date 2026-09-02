import type { ReactNode } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import AuthButton from '../components/AuthButton';

import styles from './index.module.css';

const NAV_LINKS = [
  { label: 'Chapters', to: '/docs/intro' },
  { label: 'Cloud Labs', to: '/docs/intro' },
  { label: 'Field Notes', to: '/blog' },
];

const AUDIENCES = [
  {
    tag: '01',
    title: 'Cloud Engineers & Builders',
    accent: false,
    body: 'Engineers moving beyond console clicks to design secure, repeatable infrastructure — with architectures, automation, and operating practices you can use on the next deployment.',
    points: ['Cloud architecture patterns', 'Infrastructure as code', 'Automation & reliability'],
  },
  {
    tag: '02',
    title: 'Developers & App Teams',
    accent: true,
    body: 'Product teams shipping cloud-native services who need clear guidance on containers, managed services, networking, and the trade-offs behind a dependable release.',
    points: ['Containerized delivery', 'Service selection', 'Secure integrations'],
  },
  {
    tag: '03',
    title: 'Architects & Technical Leads',
    accent: false,
    body: 'Leaders making the decisions that shape a platform — balancing resilience, performance, security, and cost without losing sight of the people who operate it.',
    points: ['Well-Architected trade-offs', 'Migration roadmaps', 'Governance at scale'],
  },
  {
    tag: '04',
    title: 'Founders & Operators',
    accent: false,
    body: 'Business-minded builders who want cloud fluency to turn ambitious products into sustainable systems — with visibility into risk, spend, and the path to scale.',
    points: ['Cloud cost visibility', 'Scale without firefighting', 'Business continuity'],
  },
];

const BENEFITS = [
  {
    step: 'STEP 01',
    title: 'Read the playbook',
    body: 'Twelve vendor-neutral chapters that take you from cloud foundations to architecture, infrastructure as code, security, reliability, and cost-aware operations.',
    outcome: 'A map of the cloud, not a list of services',
  },
  {
    step: 'STEP 02',
    title: 'Build alongside it',
    body: 'Every chapter pairs concepts with hands-on labs — diagrams, CLI workflows, Terraform patterns, and deployment checklists you can fork and adapt to your stack.',
    outcome: 'A working cloud project, not just theory',
  },
  {
    step: 'STEP 03',
    title: 'Operate with confidence',
    body: 'Learn the operating habits that keep cloud systems dependable — observability, incident response, least privilege, backups, and resilient release paths.',
    outcome: 'Systems your team can trust in production',
  },
  {
    step: 'STEP 04',
    title: 'Scale the platform',
    body: 'Turn one successful workload into repeatable foundations: reusable modules, guardrails, automation, and cost visibility that let teams move faster without losing control.',
    outcome: 'A platform that grows with the business',
  },
];

function LandingNavbar() {
  return (
    <nav className={styles.navbar} aria-label="Landing navigation">
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}>CM</span>
          <span className={styles.brandName}>Cloudopia Book</span>
        </Link>
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className={styles.navActions}>
          <Link
            to="https://github.com/OpenPointer-Inc/cloudopia-book"
            className={styles.navLinkGitHub}
            aria-label="GitHub repository">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </Link>
          <AuthButton />
          <Link to="/docs/intro" className={styles.btnPrimary} >
            Start Reading
          </Link>
        </div>
      </div>
    </nav>
  );
}

function BookMock() {
  return (
    <div className={styles.bookScene} aria-hidden="true">
      <div className={styles.book}>
        <div className={styles.bookCover}>
          <div className={styles.coverTopRow}>
            <span className={styles.coverBrand}>CLOUDOPIA</span>
            <span className={styles.coverEdition}>FIRST EDITION</span>
          </div>
          <div className={styles.coverSchematic}>
            <span className={styles.schemBox} />
            <span className={styles.schemBox} />
            <span className={styles.schemBox} />
            <span className={styles.schemWire} />
          </div>
          <h3 className={styles.coverTitle}>
            THE
            <br />
            CLOUD
            <br />
            MASTERY <span className={styles.coverTitleChip}>PLAYBOOK</span>
          </h3>
          <p className={styles.coverSubtitle}>
            The practical, vendor-neutral process for designing, deploying,
            and operating secure, scalable cloud systems.
          </p>
          <div className={styles.coverFooter}>
            CLOUD SYSTEMS FIELD NOTES &middot; Faseeh Ahmad
          </div>
        </div>
        <div className={styles.bookPages} />
        <div className={styles.bookSpine} />
      </div>
      <div className={styles.bookShadow} />
    </div>
  );
}

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>THE CLOUD MASTERY PLAYBOOK &middot; 2026 EDITION</p>
          <Heading as="h1" className={styles.heroTitle}>
            THE CLOUD
            <br />
            MASTERY <span className={styles.limeChip}>PLAYBOOK</span>
          </Heading>
          <p className={styles.heroLead}>
            The <strong>practical, vendor-neutral path</strong> to designing,
            deploying, and operating cloud systems with confidence. Learn to
            turn core services into <strong>secure, scalable platforms</strong>
            {' '}— with the architecture, automation, and judgment to keep them
            reliable in production.
          </p>
          <p className={styles.heroSmall}>
            For developers, platform engineers, architects, and technical leaders
            building in the cloud. Start with the fundamentals, then progress
            through architecture, automation, security, reliability, and cost:{' '}
            <span className={styles.underlined}>the skills to own the whole system</span>.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/docs/intro" className={styles.btnPrimary}>
              Start Reading <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/docs/intro" className={styles.btnGhost}>
              Explore the Roadmap
            </Link>
          </div>
          <div className={styles.heroMeta}>
            <span className={styles.metaStat}>
              <span className={styles.metaSquare} />
              <strong>30,305+</strong>&nbsp;professionals learning
            </span>
            <span className={styles.metaDivider} />
            <Link to="/blog" className={styles.metaLink}>
              Cloud Architecture Notes <span aria-hidden="true">&rarr;</span>
            </Link>
            <span className={styles.metaDivider} />
            <span className={styles.metaPlain}>Free &amp; open access</span>
          </div>
          <div className={styles.authorsBlock}>
            <p className={styles.authorsLabel}>CO-AUTHORED BY</p>
            <div className={styles.authorsRow}>
              {['Faseeh Ahmad', 'Ali Rehan'].map(
                (name) => (
                  <span key={name} className={styles.authorPill}>
                    <span className={styles.authorAvatar}>
                      {name
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    {name}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <BookMock />
        </div>
      </div>
    </header>
  );
}

function AudienceSection() {
  return (
    <section className={styles.section} id="who">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>WHO IT&apos;S FOR</p>
          <Heading as="h2" className={styles.sectionTitle}>
            One playbook, <span className={styles.titleUnderline}>four readers</span>
          </Heading>
          <p className={styles.sectionSub}>
            Whether you write services, run infrastructure, design systems, or
            lead the business, the playbook meets you where you are — and gives
            you the exact next move.
          </p>
        </div>
        <div className={styles.audienceGrid}>
          {AUDIENCES.map((a) => (
            <article
              key={a.tag}
              className={clsx(styles.audienceCard, a.accent && styles.audienceCardAccent)}>
              <span className={clsx(styles.audienceTag, a.accent && styles.audienceTagAccent)}>
                {a.tag}
              </span>
              <h3 className={styles.audienceTitle}>{a.title}</h3>
              <p className={styles.audienceBody}>{a.body}</p>
              <ul className={styles.audiencePoints}>
                {a.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)} id="benefits">
      <div className={styles.container}>
        <div className={styles.benefitsHeader}>
          <div>
            <p className={styles.eyebrow}>HOW YOU BENEFIT</p>
            <Heading as="h2" className={styles.sectionTitle}>
              From first page to <span className={styles.limeChipSmall}>production-ready cloud</span>
            </Heading>
          </div>
          <p className={styles.benefitsIntro}>
            The playbook follows the path real cloud work takes: understand, design,
            build, operate — then improve with every workload. Each pass compounds.
          </p>
        </div>
        <ol className={styles.benefitList}>
          {BENEFITS.map((b) => (
            <li key={b.step} className={styles.benefitItem}>
              <span className={styles.benefitStep}>{b.step}</span>
              <div className={styles.benefitContent}>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitBody}>{b.body}</p>
                <p className={styles.benefitOutcome}>
                  <span className={styles.outcomeTick} aria-hidden="true">&#10003;</span>
                  {b.outcome}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.ctaBand}>
          <div>
            <h3 className={styles.ctaBandTitle}>Ready to ship your first cloud workload?</h3>
            <p className={styles.ctaBandSub}>
              Start with Chapter 1 — a focused guide to the foundations behind
              every secure, scalable system.
            </p>
          </div>
          <Link to="/docs/intro" className={styles.btnInverted}>
            Read Chapter 1 Free <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function LandingFooter() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <svg
          className={styles.squiggle}
          viewBox="0 0 1100 12"
          preserveAspectRatio="none"
          aria-hidden="true">
          <path
            d="M0 6 Q 13.75 0 27.5 6 T 55 6 T 82.5 6 T 110 6 T 137.5 6 T 165 6 T 192.5 6 T 220 6 T 247.5 6 T 275 6 T 302.5 6 T 330 6 T 357.5 6 T 385 6 T 412.5 6 T 440 6 T 467.5 6 T 495 6 T 522.5 6 T 550 6 T 577.5 6 T 605 6 T 632.5 6 T 660 6 T 687.5 6 T 715 6 T 742.5 6 T 770 6 T 797.5 6 T 825 6 T 852.5 6 T 880 6 T 907.5 6 T 935 6 T 962.5 6 T 990 6 T 1017.5 6 T 1045 6 T 1072.5 6 T 1100 6"
            fill="none"
            stroke="var(--sp-lime)"
            strokeWidth="3"
          />
        </svg>
        <div className={styles.footerRow}>
          <span className={styles.footerBrand}>
            <span className={styles.brandMark}>{'{CM}'}</span>
            {siteConfig.title}
          </span>
          <nav className={styles.footerNav} aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.to} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          <span className={styles.footerCopy}>
            &copy; {new Date().getFullYear()} {siteConfig.title}. Free to read, forever.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    document.body.classList.add('landing-page');
    return () => document.body.classList.remove('landing-page');
  }, []);

  return (
    <Layout
      title={`${siteConfig.title} — The Cloud Mastery Playbook`}
      description="The practical, vendor-neutral playbook for designing, deploying, and operating secure, scalable cloud systems.">
      <LandingNavbar />
      <main className={styles.landing}>
        <Hero />
        <AudienceSection />
        <BenefitsSection />
      </main>
      <LandingFooter />
    </Layout>
  );
}
