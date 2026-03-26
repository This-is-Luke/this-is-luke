import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib'
import { Distribution, PriceClass, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront'
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3'
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { Construct } from 'constructs'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

interface PortfolioStackProps extends StackProps {
  siteDomainName?: string
  hostedZoneName?: string
}

export class PortfolioStack extends Stack {
  constructor(scope: Construct, id: string, props: PortfolioStackProps) {
    super(scope, id, props)

    const siteBucket = new Bucket(this, 'PortfolioSiteBucket', {
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
    })

    let certificate: DnsValidatedCertificate | undefined
    let aliases: string[] | undefined
    let hostedZone: ReturnType<typeof HostedZone.fromLookup> | undefined

    if (props.siteDomainName && props.hostedZoneName) {
      hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
        domainName: props.hostedZoneName,
      })

      aliases = [props.siteDomainName, `www.${props.siteDomainName}`]

      certificate = new DnsValidatedCertificate(this, 'PortfolioCertificate', {
        domainName: props.siteDomainName,
        hostedZone,
        region: 'us-east-1',
        subjectAlternativeNames: [`www.${props.siteDomainName}`],
      })
    }

    const distribution = new Distribution(this, 'PortfolioDistribution', {
      certificate,
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      domainNames: aliases,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(5),
        },
      ],
      priceClass: PriceClass.PRICE_CLASS_100,
    })

    new BucketDeployment(this, 'PortfolioDeployment', {
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
      sources: [Source.asset(path.resolve(currentDir, '../../dist'))],
    })

    if (props.siteDomainName && hostedZone) {
      new ARecord(this, 'PortfolioAliasRecord', {
        recordName: props.siteDomainName,
        target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        zone: hostedZone,
      })

      new ARecord(this, 'PortfolioAliasRecordWww', {
        recordName: `www.${props.siteDomainName}`,
        target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        zone: hostedZone,
      })
    }

    new CfnOutput(this, 'PortfolioBucketName', {
      value: siteBucket.bucketName,
    })

    new CfnOutput(this, 'PortfolioCloudFrontDomain', {
      value: distribution.distributionDomainName,
    })

    new CfnOutput(this, 'PortfolioUrl', {
      value: props.siteDomainName
        ? `https://${props.siteDomainName}`
        : `https://${distribution.distributionDomainName}`,
    })
  }
}
