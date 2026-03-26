import './App.css'

const profileOrbit = [
  'Platform engineer',
  'Neurodivergent',
  'AI-native',
  'Production-first',
  'System thinker',
]

const principles = [
  {
    title: 'Architecture with pulse',
    body: 'I like systems that feel intentional from both sides: elegant under the hood and clear at the surface.',
  },
  {
    title: 'Operational calm',
    body: 'I gravitate toward live environments, sharp feedback loops, and delivery that stays composed under pressure.',
  },
  {
    title: 'Creative engineering',
    body: 'Design, narrative, and technical judgment all belong in the same room. That tension is where good products sharpen.',
  },
]

const highlights = [
  {
    label: 'Current',
    title: 'Platform Engineer at Inner Reality',
    description:
      'Owning delivery across QA, frontend, backend, and AWS serverless systems for a live gamified engagement platform.',
  },
  {
    label: 'Bias',
    title: 'Production-minded builder',
    description:
      'I like work with consequence: architecture, reliability, automation, and the kind of delivery cadence that teaches you fast.',
  },
  {
    label: 'Origin',
    title: 'Designer turned engineer',
    description:
      'I came through visual craft, photography, and brand systems, so interface, rhythm, and tone still matter deeply to how I build.',
  },
]

const timeline = [
  {
    years: '2025 - now',
    role: 'Platform Engineer',
    company: 'Inner Reality Limited',
    summary:
      'Driving platform delivery across frontend, QA, backend, and AWS serverless infrastructure. Built campaign tooling, secure question orchestration, geolocation upgrades, and conversational integration patterns.',
  },
  {
    years: '2024 - 2025',
    role: 'Frontend Developer',
    company: 'Inner Reality Limited',
    summary:
      'Built production-ready UI systems from prototype to shipped experience, including brand customisation flows and rapid delivery patterns the team adopted.',
  },
  {
    years: '2023 - 2025',
    role: 'Software QA Engineer',
    company: 'Inner Reality Limited',
    summary:
      'Maintained core Python test infrastructure, supported Unity-linked experiments, and built analytics dashboards that gave stakeholders clearer operational visibility.',
  },
  {
    years: '2014 - 2023',
    role: 'Creative and independent builder',
    company: 'SelfieBox, freelance work, and career transition',
    summary:
      'Worked across design, photography, branding, and self-directed technical growth before moving fully into engineering.',
  },
]

const writing = [
  'The engineering disciplines were always creative acts buried under a mountain of friction.',
  'AI helps collapse that gap. Suddenly directions you would never have taken become worth trying.',
  'These machines will forever have human hearts.',
]

const stats = [
  { value: '1,071', label: 'GitHub contributions in 2025' },
  { value: '2+ yrs', label: 'Inner Reality journey from QA to platform engineering' },
  { value: '4', label: 'Core lanes: QA, frontend, backend, infrastructure' },
]

const searchSignals = [
  'Based in Somerset West, working close to Cape Town and remote-first teams.',
  'Building platform systems for South African and UK-facing product environments.',
  'Best fit for teams that need a platform engineer who can cross frontend, backend, QA, and AWS.',
]

function App() {
  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className="hero-panel">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Luke Prinsloo</p>
            <h1>
              Platform engineering
              <span>for fast-moving systems with real-world weight.</span>
            </h1>
            <p className="lede">
              I build at the intersection of infrastructure, product, and
              creative judgment. My path ran through design, QA, frontend,
              backend, and into AWS serverless platform work, so I care as much
              about how a system feels as how it holds under pressure.
            </p>

            <div className="hero-actions">
              <a href="mailto:hello@thisisluke.dev" className="button primary">
                Start a conversation
              </a>
              <a href="#selected-work" className="button secondary">
                See the profile
              </a>
            </div>

            <div className="orbit-tags" aria-label="Profile tags">
              {profileOrbit.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <aside className="hero-card" aria-label="Profile summary">
            <div className="hero-card-top">
              <p className="card-kicker">Current focus</p>
              <p className="status-pill">Available for interesting work</p>
            </div>
            <h2>Platform Engineer | Neurodivergent | AI-Native</h2>
            <ul>
              <li>Somerset West, Western Cape, South Africa</li>
              <li>AWS serverless architecture and platform delivery</li>
              <li>Rapid prototyping with production instincts intact</li>
            </ul>
          </aside>
        </div>

        <div className="hero-ribbon" aria-hidden="true">
          <span>Architecture</span>
          <span>Delivery</span>
          <span>Judgment</span>
          <span>Automation</span>
          <span>Design Instinct</span>
          <span>Architecture</span>
          <span>Delivery</span>
          <span>Judgment</span>
        </div>
      </section>

      <section className="principles-grid" aria-label="Core principles">
        {principles.map((principle) => (
          <article key={principle.title} className="principle-card">
            <p className="highlight-label">{principle.title}</p>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>

      <section className="section" id="selected-work">
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
            has consequence. AI and automation are force multipliers, but the
            center of gravity is still judgment: architecture, decomposition,
            tradeoffs, and knowing what actually needs to be resilient.
          </p>
          <p>
            Coming into engineering through quality and design made me
            unusually comfortable translating between user experience,
            implementation detail, and platform reality.
          </p>
        </div>
      </section>

      <section className="section section-stack">
        <div className="section-heading">
          <p className="eyebrow">Career arc</p>
          <h2>A path from visual craft to platform systems.</h2>
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

      <section className="section seo-section" aria-labelledby="location-reach">
        <div className="section-heading">
          <p className="eyebrow">Location and reach</p>
          <h2 id="location-reach">Based in Somerset West. Built for broader teams.</h2>
        </div>
        <div className="seo-grid">
          {searchSignals.map((signal) => (
            <article key={signal} className="seo-card">
              <p>{signal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section closing-banner">
        <div>
          <p className="eyebrow">Signal</p>
          <h2>Platform-minded, creatively wired, production-ready.</h2>
          <p>
            This is the sharper first impression. Next we can fold in your
            screenshots, project case studies, and a more personal narrative
            layer without losing the edge.
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
