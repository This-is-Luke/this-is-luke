# This Is Luke

A personal portfolio site for Luke Prinsloo: AI-native cloud engineer, platform-minded builder, and former designer. The frontend is a React + Vite app, and the infrastructure lives in `infra/` as an AWS CDK stack for serverless hosting with S3 + CloudFront, with optional Route 53 + ACM support for a custom domain.

## Structure

```text
this-is-luke/
├── src/              # React app
├── public/           # Static assets
├── infra/            # CDK stack for hosting + DNS
└── dist/             # Built frontend output
```

## Local development

```bash
pnpm install
pnpm dev
```

## Frontend checks

```bash
pnpm lint
pnpm build
```

## Infrastructure

Install infra dependencies:

```bash
pnpm infra:install
```

Synthesize the stack:

```bash
pnpm infra:synth
```

Deploy with the default CloudFront domain:

```bash
pnpm deploy
```

Deploy with a custom domain managed in Route 53:

```bash
export PORTFOLIO_DOMAIN_NAME=thisisluke.dev
export PORTFOLIO_ZONE_NAME=thisisluke.dev
pnpm deploy
```

Notes:

- The CDK stack defaults to `us-east-1`, which is the simplest region for CloudFront certificates.
- `PORTFOLIO_DOMAIN_NAME` is the exact site host you want to serve, for example `thisisluke.dev`.
- `PORTFOLIO_ZONE_NAME` is the Route 53 hosted zone to look up, usually the apex domain.
- If you want both apex and `www`, the stack creates both alias records on the same distribution.

## AWS CLI commands you can run on the host

If your host has the AWS CLI available and authenticated, these are the useful checks:

```bash
aws sts get-caller-identity
aws route53domains check-domain-availability --domain-name thisisluke.dev
aws route53 list-hosted-zones-by-name --dns-name thisisluke.dev
```

Register a domain through Route 53 Domains:

```bash
aws route53domains register-domain \
  --domain-name thisisluke.dev \
  --duration-in-years 1 \
  --auto-renew \
  --admin-contact file://admin-contact.json \
  --registrant-contact file://registrant-contact.json \
  --tech-contact file://tech-contact.json \
  --privacy-protect-admin-contact \
  --privacy-protect-registrant-contact \
  --privacy-protect-tech-contact
```

The contact JSON files depend on your legal registration details, so I left those as host-side commands rather than guessing values.
