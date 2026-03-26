import { useEffect, useRef } from 'react'
import './App.css'

const heroTags = [
  'Platform Engineer',
  'AI-Native',
  'Systems',
  'Frontend',
  'Backend',
  'AWS',
]

const principles = [
  {
    title: 'Platform with taste',
    body: 'I care about systems that feel clear in production and elegant in use.',
  },
  {
    title: 'Fast, not reckless',
    body: 'Speed matters most when the architecture still holds after the launch rush.',
  },
  {
    title: 'Creative technicality',
    body: 'Design instinct, writing, and engineering judgment all sharpen the same product.',
  },
]

const capabilityRows = [
  'Platform architecture and AWS serverless delivery',
  'Product-minded frontend and UX systems',
  'Backend services, automation, and QA-rooted reliability',
  'Rapid prototyping with AI-native workflows',
]

const timeline = [
  {
    years: 'Now',
    role: 'Platform Engineer',
    company: 'Inner Reality Limited',
    summary:
      'Owning delivery across QA, frontend, backend, and AWS systems for a live gamified engagement platform.',
  },
  {
    years: '2024',
    role: 'Frontend Developer',
    company: 'Inner Reality Limited',
    summary:
      'Built production UI systems from prototype to shipped experience, including brand customisation flows and rapid delivery patterns.',
  },
  {
    years: '2023',
    role: 'Software QA Engineer',
    company: 'Inner Reality Limited',
    summary:
      'Came up through quality, Python test infrastructure, and analytics visibility, which still shapes how I engineer today.',
  },
]

const writing = [
  'The engineering disciplines were always creative acts buried under a mountain of friction.',
  'AI helps collapse that gap. Suddenly directions you would never have taken become worth trying.',
  'These machines will forever have human hearts.',
]

const searchSignals = [
  'Based in Somerset West, near Cape Town, building for South African and remote-first teams.',
  'Best fit for teams that need one engineer to think across platform, product, reliability, and delivery.',
  'Comfortable working with UK-facing products, distributed teams, and fast-moving live environments.',
]

function App() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window
      root.style.setProperty('--pointer-x', `${(event.clientX / innerWidth) * 100}%`)
      root.style.setProperty('--pointer-y', `${(event.clientY / innerHeight) * 100}%`)
    }

    const revealTargets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal]')
    )

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        }
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    revealTargets.forEach((target) => observer.observe(target))
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <main className="page-shell" ref={rootRef}>
      <div className="page-noise" aria-hidden="true" />
      <div className="page-spotlight" aria-hidden="true" />

      <section className="hero section-block" data-reveal>
        <div className="hero-meta">
          <p className="eyebrow">Luke Prinsloo</p>
          <p className="status-line">Somerset West, Western Cape, South Africa</p>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Platform engineering,
              <span>with range, restraint, and a designer’s eye.</span>
            </h1>
            <p className="hero-lede">
              I build across frontend, backend, QA, and AWS serverless systems.
              The work I’m drawn to lives where architecture, product thinking,
              and production reality all matter at once.
            </p>

            <div className="hero-actions">
              <a href="mailto:hello@thisisluke.dev" className="button button-primary">
                Start a conversation
              </a>
              <a href="#experience" className="button button-secondary">
                View experience
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="panel-label">Current focus</p>
            <h2>Platform Engineer | Neurodivergent | AI-Native</h2>
            <p>
              Production-minded systems, rapid prototyping, and calm delivery
              across modern cloud platforms.
            </p>
          </aside>
        </div>

        <div className="tag-band" aria-label="Core themes">
          {heroTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="section-block principles-grid" data-reveal>
        {principles.map((principle) => (
          <article key={principle.title} className="soft-card principle-card">
            <p className="card-label">{principle.title}</p>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>

      <section className="section-block feature-split" data-reveal>
        <div className="feature-intro">
          <p className="eyebrow">How I work</p>
          <h2>Built for fast-moving teams that still care about quality.</h2>
        </div>

        <div className="capability-stack">
          {capabilityRows.map((row) => (
            <article key={row} className="capability-row">
              <span className="capability-dot" aria-hidden="true" />
              <p>{row}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block timeline-layout" id="experience" data-reveal>
        <div className="section-copy">
          <p className="eyebrow">Experience</p>
          <h2>A path from visual craft to platform systems.</h2>
        </div>

        <div className="timeline-list">
          {timeline.map((entry) => (
            <article key={entry.years + entry.role} className="timeline-card">
              <p className="timeline-years">{entry.years}</p>
              <div>
                <h3>
                  {entry.role}
                  <span>{entry.company}</span>
                </h3>
                <p>{entry.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block quote-layout" data-reveal>
        <div className="section-copy">
          <p className="eyebrow">Writing</p>
          <h2>Fragments from the way I think.</h2>
        </div>

        <div className="quote-grid">
          {writing.map((quote) => (
            <blockquote key={quote} className="soft-card quote-card">
              <p>{quote}</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section-block seo-layout" data-reveal>
        <div className="section-copy">
          <p className="eyebrow">Location and reach</p>
          <h2>Based in Somerset West, working well beyond it.</h2>
        </div>

        <div className="seo-grid">
          {searchSignals.map((signal) => (
            <article key={signal} className="soft-card seo-card">
              <p>{signal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block closing-card" data-reveal>
        <div>
          <p className="eyebrow">Next move</p>
          <h2>Minimal, modern, and intentionally alive.</h2>
          <p>
            This version leans into atmosphere, spacing, and motion. Next we can
            add project case studies, a stronger custom visual identity, and
            richer story layers.
          </p>
        </div>
        <a href="mailto:hello@thisisluke.dev" className="button button-primary">
          Contact Luke
        </a>
      </section>
    </main>
  )
}

export default App
