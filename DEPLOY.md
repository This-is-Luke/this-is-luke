# Deployment

## AWS Profile and Region

The production stack lives in **eu-west-1** under AWS profile **main-dev**.

CDK defaults to `us-east-1` if no region is set, which is **wrong** for this project. Always set the region explicitly.

## Commands

```bash
# Build and deploy (full pipeline)
AWS_PROFILE=main-dev AWS_REGION=eu-west-1 pnpm run deploy

# Deploy infrastructure only (skip frontend build)
AWS_PROFILE=main-dev AWS_REGION=eu-west-1 pnpm run infra:deploy

# With custom domain (production)
PORTFOLIO_DOMAIN_NAME=thisisluke.dev PORTFOLIO_ZONE_NAME=thisisluke.dev \
  AWS_PROFILE=main-dev AWS_REGION=eu-west-1 pnpm run deploy
```

## SSO Login

If credentials have expired:

```bash
aws sso login --profile main-dev
```

## Stack Details

- Stack name: `ThisIsLukePortfolioStack`
- Region: `eu-west-1`
- Domain: `thisisluke.dev`
- CloudFront distribution serves the S3-hosted frontend + API Gateway backend
- Lambda uses Bedrock (Amazon Nova Lite) in `eu-west-1`

## Updating Luke's Knowledge

Three files must stay in sync when updating the agent's knowledge about Luke:

1. `docs/luke-knowledge-pack.md` — master source of truth
2. `docs/luke-interview.md` — FAQ-style agent response patterns
3. `infra/lambda/chat-handler.mjs` — the `lukeProfile` variable (embedded in Lambda)

After updating all three, validate syntax with `node --check infra/lambda/chat-handler.mjs` then deploy.
