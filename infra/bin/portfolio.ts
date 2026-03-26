import { App } from 'aws-cdk-lib'
import { PortfolioStack } from '../lib/portfolio-stack.js'

const app = new App()

const domainName = process.env.PORTFOLIO_DOMAIN_NAME
const zoneName = process.env.PORTFOLIO_ZONE_NAME

new PortfolioStack(app, 'ThisIsLukePortfolioStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
  siteDomainName: domainName,
  hostedZoneName: zoneName,
})
