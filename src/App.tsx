import type { FormEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right')
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  })
}

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
    src: '/photography/elephant-eye-closeup-bw.png',
    alt: 'Black and white extreme close-up of an elephant eye with textured skin folds.',
    title: 'Ancient gaze',
    meta: 'Wildlife / Monochrome / Macro',
  },
  {
    src: '/photography/lightning-strike-blue.png',
    alt: 'Forked lightning bolts arcing across a deep blue night sky.',
    title: 'Electric blue',
    meta: 'Nature / Long exposure',
  },
  {
    src: '/photography/backlit-window-silhouette.png',
    alt: 'Woman silhouetted against a bright window, backlit portrait.',
    title: 'Window light',
    meta: 'Portrait / Silhouette',
  },
  {
    src: '/photography/yashica-camera-still-life.png',
    alt: 'Top-down still life of a Yashica film camera on dark surface.',
    title: 'Analog roots',
    meta: 'Still life / Object',
  },
  {
    src: '/photography/arrow-street-aerial-bw.png',
    alt: 'Black and white aerial view of a person walking past a painted arrow on cobblestone.',
    title: 'This way',
    meta: 'Street / Monochrome / Aerial',
  },
  {
    src: '/photography/soap-bubble-macro.png',
    alt: 'Iridescent soap bubble floating against a pure black background.',
    title: 'Surface tension',
    meta: 'Macro / Abstract',
  },
  {
    src: '/photography/coffee-shop-candid-bw.png',
    alt: 'Black and white candid of a man leaning at a coffee shop counter.',
    title: 'Counter culture',
    meta: 'Street / Monochrome / Candid',
  },
  {
    src: '/photography/purple-lightning-clouds.png',
    alt: 'Purple lightning bolt cutting through dark storm clouds.',
    title: 'Violet discharge',
    meta: 'Nature / Long exposure',
  },
  {
    src: '/photography/ridgeback-pair-portrait-bw.png',
    alt: 'Two Rhodesian Ridgebacks resting together in a doorframe, black and white.',
    title: 'Pair bond',
    meta: 'Animal / Monochrome / Portrait',
  },
  {
    src: '/photography/steel-wool-light-painting.png',
    alt: 'Long exposure light painting with spinning steel wool at night.',
    title: 'Steel wool arcs',
    meta: 'Long exposure / Light painting',
  },
  {
    src: '/photography/camera-lens-macro.png',
    alt: 'Macro close-up of a camera lens showing glass elements and reflections.',
    title: 'Glass elements',
    meta: 'Macro / Object',
  },
  {
    src: '/photography/shadow-parking-lot.png',
    alt: 'Black and white long shadow cast across a parking lot with hillside town beyond.',
    title: 'Long shadow',
    meta: 'Street / Monochrome / Light',
  },
  {
    src: '/photography/mountain-sunset-haze.png',
    alt: 'Golden sunset glowing through haze over mountains and rooftops.',
    title: 'Golden hour',
    meta: 'Landscape / Golden hour',
  },
  {
    src: '/photography/street-football-motion-bw.png',
    alt: 'Black and white motion blur of a man kicking a football in the street.',
    title: 'Street kick',
    meta: 'Street / Monochrome / Motion',
  },
  {
    src: '/photography/child-face-closeup-bw.png',
    alt: 'Black and white extreme close-up of a child face with sharp detail.',
    title: 'Tiny details',
    meta: 'Portrait / Monochrome / Macro',
  },
  {
    src: '/photography/leather-jacket-portrait-bw.png',
    alt: 'Black and white portrait of a young man in leather jacket and aviator sunglasses.',
    title: 'Studio edge',
    meta: 'Portrait / Monochrome / Studio',
  },
  {
    src: '/photography/water-splash-green-bottle.png',
    alt: 'Macro water splash around a green glass bottle with frozen droplets.',
    title: 'Impact frame',
    meta: 'Macro / High speed',
  },
  {
    src: '/photography/wood-panel-texture-bw.png',
    alt: 'Black and white radiating wood panel texture with natural knots.',
    title: 'Grain lines',
    meta: 'Abstract / Monochrome / Texture',
  },
  {
    src: '/photography/pink-controller-rgb-keyboard.png',
    alt: 'Pink PS4 Scuf controller resting on an RGB-lit mechanical keyboard.',
    title: 'Player one',
    meta: 'Still life / Tech / Colour',
  },
  {
    src: '/photography/pool-cannonball-splash.png',
    alt: 'Cannonball splash into a pool with hair flying and water erupting.',
    title: 'Send it',
    meta: 'Action / Candid',
  },
  {
    src: '/photography/studio-portrait-elder-bw.png',
    alt: 'Black and white studio portrait of an older man with beard and glasses between softboxes.',
    title: 'Studio warmth',
    meta: 'Portrait / Monochrome / Studio',
  },
  {
    src: '/photography/toddler-night-silhouette.png',
    alt: 'Dark silhouette of a toddler crawling on pavement under streetlight at night.',
    title: 'Night crawler',
    meta: 'Street / Silhouette / Night',
  },
  {
    src: '/photography/rebel-portrait-bw.png',
    alt: 'Black and white portrait of a young man in aviators with a defiant expression.',
    title: 'No filter',
    meta: 'Portrait / Monochrome / Attitude',
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [siteMode, setSiteMode] = useState<SiteMode>('engineer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAssistantDocked, setIsAssistantDocked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  useScrollReveal()

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

  const detectContactRequest = (question: string): boolean => {
    const normalized = question.toLowerCase()
    const contactTerms = [
      'contact luke', 'contact him', 'reach luke', 'reach him',
      'get in touch', 'talk to luke', 'speak to luke', 'message luke',
      'contact directly', 'reach out', 'hire luke', 'hire him',
    ]
    return contactTerms.some((t) => normalized.includes(t))
  }

  const submitQuestion = async (question: string) => {
    const requestedMode = detectSiteModeRequest(question)
    const isContact = detectContactRequest(question)

    setMessages((current) => [...current, { role: 'user', text: question }])
    setDraft('')

    if (isContact) {
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: 'Opening Luke\'s LinkedIn now. Go say hello.' },
      ])
      window.open(linkedInUrl, '_blank', 'noopener,noreferrer')
      return
    }

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

  const handleChatSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const question = draft.trim()
    if (!question) {
      return
    }
    await submitQuestion(question)
  }

  const goToSlide = useCallback((index: number) => {
    const total = photographyGallery.length
    setCarouselIndex(((index % total) + total) % total)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let mx = -9999
    let my = -9999

    type MeshPoint = {
      baseX: number
      baseY: number
      phase: number
      speed: number
      currentX: number
      currentY: number
    }
    type TriColor = { h: number; s: number; l: number; a: number }

    let points: MeshPoint[] = []
    let triangles: [number, number, number][] = []
    let triColors: TriColor[] = []

    const generate = () => {
      const cell = 70
      const jitter = cell * 0.45

      const cols = Math.ceil(w / cell) + 2
      const rows = Math.ceil(h / cell) + 2

      points = []
      triangles = []
      triColors = []

      const grid: number[][] = []
      for (let r = 0; r <= rows; r++) {
        grid[r] = []
        for (let c = 0; c <= cols; c++) {
          grid[r][c] = points.length
          const bx = c * cell - cell + (Math.random() - 0.5) * jitter * 2
          const by = r * cell - cell + (Math.random() - 0.5) * jitter * 2
          points.push({
            baseX: bx,
            baseY: by,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.4,
            currentX: bx,
            currentY: by,
          })
        }
      }

      const dissolveStart = h * 0.62
      const dissolveDepth = h * 0.38
      const dripScale = w > 640 ? 3.5 : 2

      for (const p of points) {
        if (p.baseY > dissolveStart) {
          const progress = (p.baseY - dissolveStart) / dissolveDepth
          const eased = progress * progress
          p.baseY += eased * Math.random() * cell * dripScale
          p.baseX += (Math.random() - 0.5) * eased * cell * 1.2
          p.currentX = p.baseX
          p.currentY = p.baseY
        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tl = grid[r][c]
          const tr = grid[r][c + 1]
          const bl = grid[r + 1][c]
          const br = grid[r + 1][c + 1]
          triangles.push([tl, tr, bl])
          triangles.push([tr, br, bl])
        }
      }

      for (const tri of triangles) {
        const cx =
          (points[tri[0]].baseX +
            points[tri[1]].baseX +
            points[tri[2]].baseX) /
          3
        const cy =
          (points[tri[0]].baseY +
            points[tri[1]].baseY +
            points[tri[2]].baseY) /
          3
        const nx = Math.max(0, Math.min(1, cx / w))
        const ny = Math.max(0, Math.min(1, cy / h))
        const rand = Math.random()

        let alpha = 0.07 + rand * 0.25
        if (cy > dissolveStart) {
          const progress = (cy - dissolveStart) / dissolveDepth
          alpha *= Math.max(0, 1 - progress) * (0.3 + Math.random() * 0.7)
          if (progress > 0.75 && Math.random() < (progress - 0.75) * 4) {
            alpha = 0
          }
        }

        const baseHue = 350 - nx * 155
        triColors.push({
          h: (((baseHue + (rand - 0.5) * 35) % 360) + 360) % 360,
          s: 60 + rand * 25,
          l: 45 + rand * 20 + (1 - ny) * 10,
          a: alpha,
        })
      }
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      generate()
    }

    let time = 0
    let raf = 0
    const LERP = 0.07
    const RADIUS = 380
    const STRENGTH = 55

    const draw = () => {
      time += 0.006
      ctx.clearRect(0, 0, w, h)

      for (const p of points) {
        const t1 = time * p.speed + p.phase
        const t2 = time * (p.speed * 1.4) + p.phase * 0.6
        const t3 =
          time * 0.15 + p.baseX * 0.008 + p.baseY * 0.006

        let targetX =
          p.baseX +
          Math.sin(t1) * 18 +
          Math.sin(t2 * 0.7) * 12 +
          Math.sin(t3) * 25
        let targetY =
          p.baseY +
          Math.cos(t1 * 0.9) * 18 +
          Math.cos(t2 * 0.6) * 12 +
          Math.cos(t3 * 0.8) * 25

        const dx = targetX - mx
        const dy = targetY - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < RADIUS && dist > 0) {
          const t = 1 - dist / RADIUS
          const force = t * t * STRENGTH
          targetX += (dx / dist) * force
          targetY += (dy / dist) * force
        }

        p.currentX += (targetX - p.currentX) * LERP
        p.currentY += (targetY - p.currentY) * LERP
      }

      for (let i = 0; i < triangles.length; i++) {
        const col = triColors[i]
        if (col.a < 0.005) continue
        const [ai, bi, ci] = triangles[i]

        ctx.beginPath()
        ctx.moveTo(points[ai].currentX, points[ai].currentY)
        ctx.lineTo(points[bi].currentX, points[bi].currentY)
        ctx.lineTo(points[ci].currentX, points[ci].currentY)
        ctx.closePath()

        ctx.fillStyle = `hsla(${col.h}, ${col.s}%, ${col.l}%, ${col.a})`
        ctx.fill()

        ctx.strokeStyle = `hsla(${col.h}, ${Math.min(100, col.s + 10)}%, ${Math.min(95, col.l + 20)}%, ${col.a * 0.35})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }

    const onPointerMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onPointerMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const shell = rootRef.current
    if (!shell) {
      return
    }

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

  const linkedInUrl = 'https://www.linkedin.com/in/lukas-prinsloo-ai-native-cloud-engineer/'

  const quickOptions = [
    'What does Luke do?',
    'Show me Luke\'s photography',
    'Tell me about Luke\'s top 3 projects',
    'Contact Luke directly',
  ]

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

      {messages.length === 0 && !isSubmitting ? (
        <div className="quick-options">
          {quickOptions.map((option) => (
            <button
              key={option}
              type="button"
              className="quick-option"
              onClick={() => submitQuestion(option)}
            >
              {option}
            </button>
          ))}
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
      <section className="welcome section-block reveal-scale">
        <div className="welcome-shell">
          <div className="welcome-copy reveal-left">
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

          <aside className="welcome-panel reveal-right">
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
        <div className="section-copy reveal">
          <p className="eyebrow">Important bits</p>
          <h2>The short version, without the filler.</h2>
          <p>
            Luke Prinsloo is a platform engineer with a production-first
            mindset, a creative background, and a strong bias toward systems
            that make teams faster without making operations messier.
          </p>
        </div>

        <div className="important-grid">
          {importantBits.map((item, i) => (
            <article key={item.title} className={`glass-card important-card reveal reveal-delay-${i + 1}`}>
              <p className="card-label">{item.title}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block work-layout">
        <div className="section-copy reveal">
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
          {selectedWork.map((item, i) => (
            <article key={item.title} className={`glass-card work-card reveal reveal-delay-${(i % 2) + 1}`}>
              <p className="card-label">{item.meta}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block thought-layout">
        <div className="section-copy reveal">
          <p className="eyebrow">How I think</p>
          <h2>Engineering, but with the creative side left intact.</h2>
          <p>
            The writing and the work line up closely: platform thinking,
            production responsibility, and AI used as leverage rather than as a
            substitute for judgment.
          </p>
        </div>

        <div className="thought-grid">
          {writingFragments.map((item, i) => (
            <article key={item.title} className={`glass-card thought-card reveal reveal-delay-${i + 1}`}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block reach-layout">
        <div className="section-copy reveal">
          <p className="eyebrow">Where I fit</p>
          <h2>Somerset West roots. Cape Town context. Remote reach.</h2>
          <p>
            If someone is searching for a platform engineer in Somerset West,
            near Cape Town, or across South Africa and UK-aligned remote teams,
            this is the lane I occupy naturally.
          </p>
        </div>

        <div className="reach-list">
          {reachNotes.map((note, i) => (
            <article key={note} className={`glass-card reach-card reveal reveal-delay-${i + 1}`}>
              <span className="reach-dot" aria-hidden="true" />
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block closing-card reveal-scale">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Interested in working together or just want to talk shop.</h2>
          <p>
            Ask the agent anything, or reach out directly on LinkedIn
            if you want the full conversation.
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

  const renderPhotographyContent = () => (
    <>
      <section className="section-block photo-hero-layout reveal-scale">
        <div className="photo-hero">
          <div className="photo-copy reveal-left">
            <p className="eyebrow">Luke photography</p>
            <h2>A quieter archive, built around portraits, styling, detail, and light.</h2>
            <p>
              Before software became the center, photography and design shaped
              how I framed things. This side of the site keeps that history
              close and lets the images speak with almost no interface in the
              way.
            </p>
          </div>

          <div className="photo-hero-card reveal-right">
            <p className="panel-label">Photography profile</p>
            <p>
              Portraits, commercial experiments, archive pieces, and older
              editorial work from Luke's earlier creative years.
            </p>
          </div>
        </div>
      </section>

      <section className="section-block important-layout">
        <div className="section-copy reveal">
          <p className="eyebrow">Visual lane</p>
          <h2>Minimal shell. Immediate images. A more tactile version of the same brain.</h2>
          <p>
            The instinct is familiar: composition, readability, emotional
            weight, and restraint. Different medium, same bias toward making
            the signal clearer.
          </p>
        </div>

        <div className="important-grid">
          {photographyHighlights.map((item, i) => (
            <article key={item.title} className={`glass-card important-card reveal reveal-delay-${i + 1}`}>
              <p className="card-label">{item.title}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block photo-carousel-layout">
        <div className="section-copy reveal">
          <p className="eyebrow">Selected frames</p>
          <h2>An editorial cut from the archive.</h2>
          <p>
            A few older images to establish the visual side before the
            engineering profile took center stage.
          </p>
        </div>

        <div className="photo-carousel reveal-scale" aria-label="Photography portfolio">
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

      <section className="section-block closing-card reveal-scale">
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
      <div className="geo-void" aria-hidden="true">
        <canvas ref={canvasRef} className="geo-canvas" />
      </div>

      <section className="ask-stage">
        <p className="ask-stage-label">luke's agent is online</p>
        {renderChatShell('ask-shell', 'stage')}
        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-hint-text">scroll</span>
          <span className="scroll-hint-arrow">
            <span />
            <span />
            <span />
          </span>
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
