import { useEffect, useRef } from 'react'
import './App.css'

const heroTags = [
  'Platform Engineer',
  'Production First',
  'AI-Augmented',
  'Full Stack',
  'Frontend',
  'Backend',
  'AWS',
]

const principles = [
  {
    title: 'Production first',
    body: 'I am most comfortable where delivery has real stakes: live systems, operational clarity, and software that has to keep working.',
  },
  {
    title: 'Outcome-based engineering',
    body: 'I work across the stack when the outcome calls for it, from UX and frontend implementation through backend services and cloud infrastructure.',
  },
  {
    title: 'AI-augmented execution',
    body: 'I use AI and automation to accelerate research, prototyping, and delivery, while keeping architecture, judgment, and quality at the center.',
  },
]

const capabilityRows = [
  'Platform engineering with AWS serverless delivery and operational awareness',
  'Frontend systems shaped by a design background and product instincts',
  'Backend services, automation, and QA-rooted reliability practices',
  'Rapid prototyping and problem solving with AI as a force multiplier',
]

const timeline = [
  {
    years: 'Now',
    role: 'Platform Engineer',
    company: 'Inner Reality Limited',
    summary:
      'Owning delivery across QA, frontend, backend, and AWS infrastructure for Inner Reality’s live gamified customer engagement platform.',
  },
  {
    years: '2024 - now',
    role: 'Frontend Developer',
    company: 'Inner Reality Limited',
    summary:
      'Built the Campaign Creator UI from prototype to production, including brand customisation flows, interactive preview systems, and production-ready forms.',
  },
  {
    years: '2023 - 2025',
    role: 'Software QA Engineer',
    company: 'Inner Reality Limited',
    summary:
      'Built and maintained Python test infrastructure, supported product experimentation, and created analytics visibility that still shapes how I engineer today.',
  },
  {
    years: 'Before tech',
    role: 'Design, photography, and self-directed learning',
    company: 'Freelance, SelfieBox, and independent study',
    summary:
      'My earlier career was built in creative work, client delivery, and self-education, which is why visual clarity and communication still matter in my engineering.',
  },
]

const writing = [
  'The engineering disciplines were always creative acts buried under a mountain of friction.',
  'AI helps collapse that gap. Suddenly directions you would never have taken become worth trying.',
  'These machines will forever have human hearts.',
]

const searchSignals = [
  'Based in Somerset West, near Cape Town, and comfortable in remote-first and distributed teams.',
  'Best fit for teams that need a platform-minded engineer who can think across product, delivery, reliability, and implementation.',
  'Experienced in South African and UK-facing environments where feedback loops are fast and production quality matters.',
]

function App() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    let animationFrame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let targetScroll = 0
    let currentScroll = 0

    const setTargetsFromPoint = (clientX: number, clientY: number) => {
      const { innerWidth, innerHeight } = window
      const normalizedX = clientX / innerWidth - 0.5
      const normalizedY = clientY / innerHeight - 0.5

      targetX = normalizedX
      targetY = normalizedY

      root.style.setProperty('--pointer-x', `${(clientX / innerWidth) * 100}%`)
      root.style.setProperty('--pointer-y', `${(clientY / innerHeight) * 100}%`)
    }

    const handlePointerMove = (event: PointerEvent) => {
      setTargetsFromPoint(event.clientX, event.clientY)
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) {
        return
      }

      setTargetsFromPoint(touch.clientX, touch.clientY)
    }

    const handlePointerLeave = () => {
      targetX = 0
      targetY = 0
      root.style.setProperty('--pointer-x', '50%')
      root.style.setProperty('--pointer-y', '20%')
    }

    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      targetScroll = window.scrollY / maxScroll
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      currentScroll += (targetScroll - currentScroll) * 0.08

      root.style.setProperty('--motion-x', currentX.toFixed(4))
      root.style.setProperty('--motion-y', currentY.toFixed(4))
      root.style.setProperty('--scroll-progress', currentScroll.toFixed(4))

      animationFrame = window.requestAnimationFrame(animate)
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
    handleScroll()
    animate()
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="page-shell" ref={rootRef}>
      <div className="page-orb page-orb-a" aria-hidden="true" />
      <div className="page-orb page-orb-b" aria-hidden="true" />
      <div className="page-orb page-orb-c" aria-hidden="true" />
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
              <span>shaped by quality, delivery, and a designer’s eye.</span>
            </h1>
            <p className="hero-lede">
              I am an engineer shaped by quality and production, now
              gravitating toward platform work where reliability, automation,
              and delivery meet. My path ran through design, QA, frontend,
              backend, and cloud, which lets me work comfortably across the
              stack without losing sight of the outcome.
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
              Broad hands-on delivery across product systems, cloud
              infrastructure, and live production environments, with AI and
              automation integrated into the daily workflow.
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
          <p>
            I dig until I understand the why, not just the how. The way I work
            is outcome-driven, adaptive, and grounded in real production
            environments where the feedback loop is immediate.
          </p>
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
          <p>
            My direction into platform engineering was not a jump from nowhere.
            It was the natural result of moving from design into QA, then into
            frontend, backend, and cloud delivery.
          </p>
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
          <p>
            These are the themes that keep showing up in my writing:
            engineering as a creative act, AI as leverage, and systems that
            still need human judgment at the center.
          </p>
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
          <p>
            I am based in Somerset West in the Western Cape, close to Cape
            Town, and I work well with distributed teams and remote delivery
            across markets.
          </p>
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
          <p className="eyebrow">Contact</p>
          <h2>Looking for someone who can span quality, product, and platform.</h2>
          <p>
            If you need someone who can move between implementation, systems,
            and delivery without losing the bigger picture, let&apos;s talk.
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
