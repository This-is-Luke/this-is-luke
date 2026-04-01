What Your Site Is Missing (The Gaps)
1. No /llms.txt file (HIGH PRIORITY)
This is the new standard proposed by Jeremy Howard (fast.ai). When an AI tool or developer wants to quickly understand who you are and what your site offers, they look for /llms.txt at your domain root. Right now, hitting thisisluke.dev/llms.txt just returns your React SPA shell — AI crawlers get meaningless HTML.
What you need to create — a markdown file at /llms.txt (served as text/plain or text/markdown) like this:
markdown# Luke Prinsloo

> AI-native platform engineer based in Somerset West near Cape Town, South Africa. Building production-grade AWS serverless systems, full-stack platforms, and AI-augmented engineering workflows.

Luke Prinsloo (also Lukas Prinsloo) is a platform engineer working at Inner Reality Limited. He specialises in AWS Lambda, TypeScript, React, Node.js, Python, and infrastructure-as-code. He has experience with WhatsApp integration architecture, serverless API design, and AI-native development workflows. He is neurodivergent and based in the Western Cape, South Africa, available for remote work across South Africa and the UK.

## Portfolio
- [Main site](https://thisisluke.dev/): Full engineering portfolio and contact information

## Contact
- [Website](https://thisisluke.dev/)
```

You should also create `/llms-full.txt` with expanded detail about your projects, skills, and work history.

### 2. No `robots.txt` entries for AI crawlers

Your current `robots.txt` is minimal. You should **explicitly allow** AI crawlers to signal you *want* to be discovered:
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: https://thisisluke.dev/sitemap.xml
Most sites block these bots. By explicitly allowing them, you're telling every AI system "yes, please read my content."
3. Your site is a client-rendered SPA (BIG issue for AI crawlers)
This is the biggest problem. Your site is a React SPA (Vite-built). When AI crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.) hit your site, they likely get the empty HTML shell with no content — just <div id="root"></div>. Unlike Google's crawler, most AI crawlers do not execute JavaScript. They see nothing.
Fix options:

Server-Side Rendering (SSR) — Migrate to Next.js, Remix, or Astro so the HTML is pre-rendered
Static Site Generation (SSG) — Pre-render your pages at build time (Vite has plugins for this like vite-plugin-ssr or vite-ssg)
Pre-rendering service — Use something like Prerender.io or Rendertron to serve pre-rendered HTML to bot user agents

This is the single most impactful change you can make. If AI crawlers can't read your content, they'll never cite you.
4. Expand your structured data
Your Person schema is good, but you could strengthen it by adding:

sameAs links (GitHub, LinkedIn, etc.) — these help AI systems cross-reference your identity
ProfilePage schema wrapping the Person schema
WebSite schema with a potentialAction for SearchAction
Individual CreativeWork or SoftwareApplication entries for your projects

5. Submit to Bing (powers ChatGPT search)
ChatGPT's search feature is powered by Bing. You should set up Bing Webmaster Tools at bing.com/webmasters and submit your sitemap there too. This directly affects whether ChatGPT can find you when people ask about platform engineers in Cape Town.
6. Only 1 page in your sitemap
Your sitemap only has 1 URL (the homepage). More unique, crawlable pages = more surface area for AI to reference. Consider adding separate routes/pages for things like your project case studies, your skills breakdown, or a dedicated "about" page, each with their own URL in the sitemap.

Priority Action List
Here's what to do, in order of impact:

Fix the SPA rendering problem — SSR/SSG/prerender so crawlers see actual content (this is the #1 blocker)
Create /llms.txt and /llms-full.txt — Deploy these as static files in your public/ directory
Update robots.txt — Explicitly allow all AI crawlers
Submit to Bing Webmaster Tools — Powers ChatGPT search
Add sameAs links to your JSON-LD (GitHub, LinkedIn, etc.)
Create more indexable pages — Expand your sitemap beyond 1 URL

The rendering issue is the most critical. Right now, when GPTBot or PerplexityBot crawls thisisluke.dev, they almost certainly see an empty page. Fix that, add llms.txt, and you'll be giving every AI system on the planet a clear, structured way to learn about you and your work.