import './App.css'

const principles = [
  'Production-first engineering with a bias for shipping calmly under pressure.',
  'AI-native workflows that multiply depth, speed, and practical execution.',
  'Cloud systems built for reliability, visibility, and momentum.',
]

const highlights = [
  {
    label: 'Now',
    title: 'Cloud Engineer at Inner Reality',
    description:
      'Owning delivery across QA, frontend, backend, and AWS serverless systems for a live gamified engagement platform.',
  },
  {
    label: 'Edge',
    title: 'Operational builder',
    description:
      'Most at home where architecture, delivery pressure, and real users collide in production.',
  },
  {
    label: 'Origin',
    title: 'Designer turned engineer',
    description:
      'Started in visual craft, photography, and brand systems. That design instinct still shapes how products feel and how systems communicate.',
  },
]

const timeline = [
  {
    years: '2025 - now',
    role: 'Cloud Engineer',
    company: 'Inner Reality Limited',
    summary:
      'Leads across frontend, QA, full-stack delivery, and AWS serverless infrastructure. Built campaign tooling, secure question orchestration, geolocation upgrades, and conversational integration patterns.',
  },
  {
    years: '2024 - 2025',
    role: 'Frontend Developer',
    company: 'Inner Reality Limited',
    summary:
      'Built production-ready UI systems from prototype to shipped experience, including brand customization flows and rapid delivery patterns the team adopted.',
  },
  {
    years: '2023 - 2025',
    role: 'Software QA Engineer',
    company: 'Inner Reality Limited',
    summary:
      'Maintained core Python test infrastructure, supported Unity-integrated experiments, and built OpenSearch dashboards that made campaign analytics clearer to stakeholders.',
  },
  {
    years: '2014 - 2023',
    role: 'Creative and independent builder',
    company: 'SelfieBox, freelance work, and career transition',
    summary:
      'Worked across design, photography, branding, and self-directed technical growth before crossing fully into software engineering.',
  },
]

const writing = [
  'The engineering disciplines were always creative acts buried under a mountain of friction.',
  'AI helps collapse that gap. Suddenly directions you would never have taken become worth trying.',
  'These machines will forever have human hearts.',
]

const stats = [
  { value: '1,071', label: 'GitHub contributions in 2025' },
  { value: '2+ yrs', label: 'Inner Reality journey across QA to cloud engineering' },
  { value: '4', label: 'Core lanes: QA, frontend, backend, infrastructure' },
]

function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Luke Prinsloo</p>
          <h1>
            AI-native cloud engineering
            <span>with a designer&apos;s eye and a production pulse.</span>
          </h1>
          <p className="lede">
            I build systems where reliability, automation, and product velocity
            meet. My path ran through design, QA, frontend, backend, and now
            serverless cloud delivery, which means I care about the user
            experience and the operational reality behind it.
          </p>
          <div className="hero-actions">
            <a href="mailto:hello@thisisluke.dev" className="button primary">
              Start a conversation
            </a>
            <a href="#work" className="button secondary">
              Explore the work
            </a>
          </div>
        </div>
        <aside className="hero-card" aria-label="Profile summary">
          <p className="card-kicker">Current focus</p>
          <h2>Platform Engineer | Neurodivergent | AI-Native</h2>
          <ul>
            <li>Somerset West, Western Cape, South Africa</li>
            <li>AWS serverless architecture and cloud delivery</li>
            <li>Rapid prototyping with real production instincts</li>
          </ul>
        </aside>
      </section>

      <section className="principles-grid" aria-label="Core principles">
        {principles.map((principle) => (
          <article key={principle} className="principle-card">
            <p>{principle}</p>
          </article>
        ))}
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected profile</p>
          <h2>Built in motion, not in theory.</h2>
        </div>
        <div className="highlights-grid">
          {highlights.map((item) => (
            <article key={item.title} className="highlight-card">
              <p className="highlight-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div className="section-heading">
          <p className="eyebrow">How I work</p>
          <h2>I dig until I understand the why, not just the how.</h2>
        </div>
        <div className="manifesto">
          <p>
            I like live environments, immediate feedback loops, and work that
            has real stakes. I use AI and automation as force multipliers, but
            the center of gravity is still judgment: architecture,
            decomposition, tradeoffs, and knowing what needs to be resilient.
          </p>
          <p>
            I came into engineering through quality, design, and sheer
            curiosity. That makes me unusually comfortable translating between
            user experience, implementation details, and platform realities.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Career arc</p>
          <h2>A path from visual craft to cloud systems.</h2>
        </div>
        <div className="timeline">
          {timeline.map((entry) => (
            <article key={entry.years} className="timeline-entry">
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

      <section className="section quote-section">
        <div className="section-heading">
          <p className="eyebrow">Voice</p>
          <h2>Fragments from the way I think.</h2>
        </div>
        <div className="quote-grid">
          {writing.map((quote) => (
            <blockquote key={quote} className="quote-card">
              <p>{quote}</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section stats-section">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="section closing-banner">
        <div>
          <p className="eyebrow">Next pass</p>
          <h2>This starts as a signal-rich launch page.</h2>
          <p>
            The next iteration can add project case studies, screenshots,
            writing, and a sharper visual identity once we decide the final
            vibe together.
          </p>
        </div>
        <a href="mailto:hello@thisisluke.dev" className="button primary">
          Contact Luke
        </a>
      </section>
    </main>
  )
}

export default App
