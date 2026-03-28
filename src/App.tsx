import type { FormEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const introHighlights = [
  'Platform Engineer',
  'Somerset West, ZA',
  'Neurodivergent',
  'AI-Augmented',
]

const importantBits = [
  {
    title: 'Platform-minded delivery',
    body: 'I work where product, reliability, automation, and developer experience meet, usually across frontend, backend, and AWS serverless systems.',
  },
  {
    title: 'Rooted in production',
    body: 'My best work happens in live environments where quality matters, timelines are real, and the feedback loop is immediate.',
  },
  {
    title: 'Creative systems thinking',
    body: 'Design, photography, QA, and engineering all fed the same instinct: reduce friction, make the thing clearer, and ship with intention.',
  },
]

const selectedWork = [
  {
    title: 'Campaign Creator',
    summary:
      'Co-designed and delivered a self-service campaign builder for branded gamified experiences, with customisation flows, asset control, and reusable templates.',
    meta: 'Product systems / Frontend / Delivery',
  },
  {
    title: 'Question Orchestration Service',
    summary:
      'Moved quiz logic out of the client and into a secure backend service with S3-backed question delivery, server-side validation, and per-campaign configuration.',
    meta: 'Backend / Reliability / AWS',
  },
  {
    title: 'WhatsApp integration architecture',
    summary:
      'Designed the conversational routing model for Infobip-based WhatsApp flows, including session correlation, webhook routing, and capability exposure patterns.',
    meta: 'Architecture / Integrations / Scale',
  },
  {
    title: 'Geo-aware campaign delivery',
    summary:
      'Implemented region-aware geolocation behaviour so campaigns could respond accurately to boundaries, rules, and location-gated experiences.',
    meta: 'Platform / Data / Operational clarity',
  },
]

const writingFragments = [
  {
    title: 'Engineering is still a creative act',
    body: 'Architecture, decomposition, and judgment still matter. The tools move faster now, but the craft is still in how you shape the system.',
  },
  {
    title: 'AI should expand the map',
    body: 'The real unlock is not hype. It is lowering the cost of trying good ideas, so engineers can think bigger and test directions that were previously too expensive.',
  },
  {
    title: 'Human intent stays central',
    body: 'These machines are useful because people bring taste, care, and responsibility to them. The technology is leverage, not the point.',
  },
]

const reachNotes = [
  'Based in Somerset West in the Western Cape, near Cape Town.',
  'Comfortable with remote-first teams across South Africa, the UK, and distributed product environments.',
  'Strong fit for teams looking for a platform engineer who can move between delivery, systems thinking, and implementation.',
]

const photographyHighlights = [
  {
    title: 'Portraits with intent',
    body: 'A lot of the older work sits close to expression, styling, and framing. The goal was never noise. It was presence.',
  },
  {
    title: 'Commercial eye, human center',
    body: 'Design and client work trained the photography too: shape the scene, respect the subject, and keep the image readable.',
  },
  {
    title: 'Minimal, immediate, tactile',
    body: 'The photography mode is built like a pared-back portfolio. Less interface, more image, just enough framing to let the work breathe.',
  },
]

const photographyGallery = [
  {
    src: '/photography/_MG_0498.JPG',
    alt: 'A strawberry suspended in golden syrup against a pale background.',
    title: 'Still life study',
    meta: 'Object / Light / Texture',
  },
  {
    src: '/photography/IMG_3994.JPG',
    alt: 'Black and white ceiling boards in strong perspective.',
    title: 'Quiet geometry',
    meta: 'Monochrome / Structure',
  },
  {
    src: '/photography/Model%20prim%20selects-1.JPG',
    alt: 'Half portrait with red floral styling and dramatic makeup.',
    title: 'Styled portrait',
    meta: 'Portrait / Styling / Colour',
  },
  {
    src: '/photography/_MG_9983.JPG',
    alt: 'Black and white portrait of a man in sunglasses and a heavy coat.',
    title: 'Studio contrast',
    meta: 'Portrait / Monochrome',
  },
  {
    src: '/photography/_MG_8732.jpg',
    alt: 'Portrait photography from the archive.',
    title: 'Archive frame',
    meta: 'Portrait / Archive',
  },
  {
    src: '/photography/IMG_4924.JPG',
    alt: 'Editorial style photograph from the portfolio.',
    title: 'Editorial cut',
    meta: 'Fashion / Editorial',
  },
  {
    src: '/photography/_MG_8848.jpg',
    alt: 'Portrait photograph from the archive portfolio.',
    title: 'Light and gaze',
    meta: 'Portrait / Natural light',
  },
  {
    src: '/photography/DPP_0042.JPG',
    alt: 'Creative portrait image from the older portfolio.',
    title: 'Older experiments',
    meta: 'Creative / Archive',
  },
]

type SiteMode = 'engineer' | 'photography'

type ChatMessage = {
  role: 'assistant' | 'user'
  text: string
}

const initialMessages: ChatMessage[] = []

function App() {
  const rootRef = useRef<HTMLElement | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [siteMode, setSiteMode] = useState<SiteMode>('engineer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAssistantDocked, setIsAssistantDocked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    window.requestAnimationFrame(() => {
      root.querySelectorAll<HTMLElement>('.chat-window').forEach((node) => {
        node.scrollTop = node.scrollHeight
      })
    })
  }, [messages, isSubmitting, isModalOpen])

  const setModeAndResetView = (nextMode: SiteMode) => {
    setSiteMode(nextMode)
    setIsModalOpen(false)
    setCarouselIndex(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const detectSiteModeRequest = (question: string): SiteMode | null => {
    const normalized = question.toLowerCase()

    const photographyTerms = [
      'photography', 'photographer', 'photograph', 'photogr', 'photo',
      'photos', 'shots', 'gallery', 'creative', 'visual', 'portraits',
      'portrait', 'editorial', 'archive', 'imagery', 'images', 'vibe',
      'aesthetic', 'design side', 'creative side', 'visual side',
    ]

    const engineeringTerms = [
      'engineering', 'engineer', 'platform', 'aws', 'software', 'dev',
      'developer', 'systems', 'backend', 'frontend', 'qa', 'delivery',
    ]

    const switchTerms = [
      'show', 'switch', 'flip', 'toggle', 'open', 'change', 'view',
      'look at', 'take me to', 'bring up', 'pull up', 'let me see',
      'i want to see', 'show me', 'go to', 'reveal',
    ]

    const mentionsPhotography = photographyTerms.some((t) => normalized.includes(t))
    const mentionsEngineering = engineeringTerms.some((t) => normalized.includes(t))
    const mentionsSwitch = switchTerms.some((t) => normalized.includes(t))

    const contextTerms = ['site', 'website', 'portfolio', 'mode', 'profile']

    if (mentionsPhotography && (mentionsSwitch || contextTerms.some((t) => normalized.includes(t))
      || normalized.includes('creative background') || normalized.includes('photo background')
      || normalized.includes('look at my') || normalized.includes('show my')
      || normalized.includes('view my'))) {
      return 'photography'
    }

    if (mentionsEngineering && (mentionsSwitch || contextTerms.some((t) => normalized.includes(t)))) {
      return 'engineer'
    }

    return null
  }

  const handleChatSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const question = draft.trim()
    if (!question) {
      return
    }

    const requestedMode = detectSiteModeRequest(question)

    setMessages((current) => [...current, { role: 'user', text: question }])
    setDraft('')

    if (requestedMode) {
      const reply =
        requestedMode === siteMode
          ? requestedMode === 'photography'
            ? 'Photography mode is already live. Scroll down.'
            : 'The engineering profile is already live. Scroll down.'
          : requestedMode === 'photography'
            ? 'Photography mode is ready. Scroll down.'
            : 'Engineering mode is back. Scroll down.'

      setModeAndResetView(requestedMode)
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: reply },
      ])
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ message: question }),
      })

      const payload = (await response.json()) as {
        reply?: string
        error?: string
      }

      const reply =
        payload.reply ??
        payload.error ??
        'The assistant is not available right now. Please try again shortly.'

      setMessages((current) => [
        ...current,
        { role: 'assistant', text: reply },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: 'The hosted assistant is waking up right now. Please try again in a moment.',
        },
      ])
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToSlide = useCallback((index: number) => {
    const total = photographyGallery.length
    setCarouselIndex(((index % total) + total) % total)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const shouldDock = window.scrollY > window.innerHeight * 0.72
      setIsAssistantDocked((current) =>
        current === shouldDock ? current : shouldDock
      )
      if (!shouldDock) {
        setIsModalOpen(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderChatShell = (className: string, mode: 'stage' | 'modal') => (
    <form className={className} onSubmit={handleChatSubmit}>
      <label className="ask-label" htmlFor={`${mode}-ask-luke`}>
        ask luke's agent anything
      </label>

      {messages.length > 0 || isSubmitting ? (
        <div className="chat-window" aria-live="polite">
          {messages.map((message, index) => (
            <article
              key={`${mode}-${message.role}-${index}`}
              className={`chat-bubble chat-bubble-${message.role}`}
            >
              <p>{message.text}</p>
            </article>
          ))}
          {isSubmitting ? (
            <article className="chat-bubble chat-bubble-assistant chat-bubble-pending">
              <p>Thinking</p>
            </article>
          ) : null}
        </div>
      ) : null}

      <input
        id={`${mode}-ask-luke`}
        className="ask-input"
        type="text"
        name="ask-luke"
        placeholder="who is luke? / show me photography / what does he build?"
        autoComplete="off"
        value={draft}
        disabled={isSubmitting}
        onChange={(event) => setDraft(event.target.value)}
      />
    </form>
  )

  const renderEngineerContent = () => (
    <>
      <section className="welcome section-block">
        <div className="welcome-shell">
          <div className="welcome-copy">
            <p className="eyebrow">Luke Prinsloo</p>
            <p className="location-line">
              Platform Engineer / Somerset West / Western Cape / South Africa
            </p>
            <h1>
              Platform systems,
              <span>
                clear thinking, and delivery that holds up in production.
              </span>
            </h1>
            <p className="welcome-lede">
              I work across frontend, backend, QA-rooted reliability, AWS
              serverless systems, and AI-augmented delivery. The through-line
              is always the same: reduce friction, build with intent, and keep
              the outcome clear for the people shipping on top of it.
            </p>
          </div>

          <aside className="welcome-panel">
            <p className="panel-label">Current shape</p>
            <h2>Platform Engineer</h2>
            <p>
              Production first, systems minded, and comfortable moving across
              product delivery, cloud infrastructure, and developer experience.
            </p>

            <div className="tag-band" aria-label="Core themes">
              {introHighlights.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        className="section-block section-anchor important-layout"
        id="important-bits"
      >
        <div className="section-copy">
          <p className="eyebrow">Important bits</p>
          <h2>The short version, without the filler.</h2>
          <p>
            Luke Prinsloo is a platform engineer with a production-first
            mindset, a creative background, and a strong bias toward systems
            that make teams faster without making operations messier.
          </p>
        </div>

        <div className="important-grid">
          {importantBits.map((item) => (
            <article key={item.title} className="glass-card important-card">
              <p className="card-label">{item.title}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block work-layout">
        <div className="section-copy">
          <p className="eyebrow">Selected work</p>
          <h2>Recent work that points to where I'm heading.</h2>
          <p>
            My current role at Inner Reality sits across product systems,
            backend services, integrations, and AWS delivery. That mix is a big
            part of why platform engineering feels like the right center of
            gravity.
          </p>
        </div>

        <div className="work-grid">
          {selectedWork.map((item) => (
            <article key={item.title} className="glass-card work-card">
              <p className="card-label">{item.meta}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block thought-layout">
        <div className="section-copy">
          <p className="eyebrow">How I think</p>
          <h2>Engineering, but with the creative side left intact.</h2>
          <p>
            The writing and the work line up closely: platform thinking,
            production responsibility, and AI used as leverage rather than as a
            substitute for judgment.
          </p>
        </div>

        <div className="thought-grid">
          {writingFragments.map((item) => (
            <article key={item.title} className="glass-card thought-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block reach-layout">
        <div className="section-copy">
          <p className="eyebrow">Where I fit</p>
          <h2>Somerset West roots. Cape Town context. Remote reach.</h2>
          <p>
            If someone is searching for a platform engineer in Somerset West,
            near Cape Town, or across South Africa and UK-aligned remote teams,
            this is the lane I occupy naturally.
          </p>
        </div>

        <div className="reach-list">
          {reachNotes.map((note) => (
            <article key={note} className="glass-card reach-card">
              <span className="reach-dot" aria-hidden="true" />
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )

  const renderPhotographyContent = () => (
    <>
      <section className="section-block photo-hero-layout">
        <div className="photo-hero">
          <div className="photo-copy">
            <p className="eyebrow">Luke photography</p>
            <h2>A quieter archive, built around portraits, styling, detail, and light.</h2>
            <p>
              Before software became the center, photography and design shaped
              how I framed things. This side of the site keeps that history
              close and lets the images speak with almost no interface in the
              way.
            </p>
          </div>

          <div className="photo-hero-card">
            <p className="panel-label">Photography profile</p>
            <p>
              Portraits, commercial experiments, archive pieces, and older
              editorial work from Luke's earlier creative years.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block important-layout">
        <div className="section-copy">
          <p className="eyebrow">Visual lane</p>
          <h2>Minimal shell. Immediate images. A more tactile version of the same brain.</h2>
          <p>
            The instinct is familiar: composition, readability, emotional
            weight, and restraint. Different medium, same bias toward making
            the signal clearer.
          </p>
        </div>

        <div className="important-grid">
          {photographyHighlights.map((item) => (
            <article key={item.title} className="glass-card important-card">
              <p className="card-label">{item.title}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block photo-carousel-layout">
        <div className="section-copy">
          <p className="eyebrow">Selected frames</p>
          <h2>An editorial cut from the archive.</h2>
          <p>
            A few older images to establish the visual side before the
            engineering profile took center stage.
          </p>
        </div>

        <div className="photo-carousel" aria-label="Photography portfolio">
          <div className="photo-carousel-track">
            {photographyGallery.map((item, index) => (
              <figure
                key={item.src}
                className={`photo-carousel-slide ${index === carouselIndex ? 'is-active' : ''}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
                <figcaption>
                  <span className="photo-slide-title">{item.title}</span>
                  <span className="photo-slide-meta">{item.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="photo-carousel-nav">
            <button
              type="button"
              className="photo-carousel-btn"
              onClick={() => goToSlide(carouselIndex - 1)}
              aria-label="Previous image"
            >
              &#8592;
            </button>
            <button
              type="button"
              className="photo-carousel-btn"
              onClick={() => goToSlide(carouselIndex + 1)}
              aria-label="Next image"
            >
              &#8594;
            </button>
          </div>

          <span className="photo-carousel-counter">
            {String(carouselIndex + 1).padStart(2, '0')} / {String(photographyGallery.length).padStart(2, '0')}
          </span>

          <div className="photo-carousel-dots">
            {photographyGallery.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`photo-carousel-dot ${index === carouselIndex ? 'is-active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block closing-card">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Want the engineering side again or looking to talk creative history.</h2>
          <p>
            Ask the agent to switch modes at any time, or reach out on
            LinkedIn if you want the full story behind the work.
          </p>
        </div>
        <a
          href="https://www.linkedin.com/in/lukas-prinsloo-ai-native-cloud-engineer/"
          target="_blank"
          rel="noreferrer"
          className="button button-primary"
        >
          Contact on LinkedIn
        </a>
      </section>
    </>
  )

  return (
    <main className="page-shell" ref={rootRef}>
      <section className="ask-stage">
        <p className="ask-stage-label">luke's agent is online</p>
        {renderChatShell('ask-shell', 'stage')}
        <div className="scroll-hint" aria-hidden="true">
          <span>scroll</span>
          <span className="scroll-hint-line" />
        </div>
      </section>

      <div className="content-stack">
        <section className="mode-switcher section-block" style={{ marginTop: 0 }}>
          <div className="mode-toggle" role="tablist" aria-label="Profile mode">
            <button
              type="button"
              className={`mode-toggle-button ${siteMode === 'engineer' ? 'is-active' : ''}`}
              onClick={() => setModeAndResetView('engineer')}
              aria-pressed={siteMode === 'engineer'}
            >
              Engineering
            </button>
            <button
              type="button"
              className={`mode-toggle-button ${siteMode === 'photography' ? 'is-active' : ''}`}
              onClick={() => setModeAndResetView('photography')}
              aria-pressed={siteMode === 'photography'}
            >
              Photography
            </button>
          </div>
        </section>

        {siteMode === 'engineer'
          ? renderEngineerContent()
          : renderPhotographyContent()}
      </div>

      <button
        type="button"
        className={`assistant-launcher ${isAssistantDocked ? 'is-visible' : ''}`}
        onClick={() => setIsModalOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
      >
        <span className="assistant-launcher-dot" aria-hidden="true" />
        Ask Agent
      </button>

      {isAssistantDocked && isModalOpen ? (
        <div
          className="assistant-modal-backdrop"
          role="presentation"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="assistant-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Luke's agent"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="assistant-modal-bar">
              <p>Luke's Agent</p>
              <button
                type="button"
                className="assistant-close"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
            {renderChatShell('assistant-shell', 'modal')}
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default App
