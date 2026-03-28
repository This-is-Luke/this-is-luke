import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib'
import {
  AllowedMethods,
  CachePolicy,
  Distribution,
  OriginRequestPolicy,
  PriceClass,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront'
import {
  RestApiOrigin,
  S3BucketOrigin,
} from 'aws-cdk-lib/aws-cloudfront-origins'
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { Architecture, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
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

    const quotaTable = new Table(this, 'LukeAiQuotaTable', {
      partitionKey: {
        name: 'pk',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      timeToLiveAttribute: 'expiresAt',
    })

    const chatHandler = new Function(this, 'LukeAiChatHandler', {
      architecture: Architecture.ARM_64,
      code: Code.fromAsset(path.resolve(currentDir, '../lambda')),
      handler: 'chat-handler.handler',
      memorySize: 512,
      runtime: Runtime.NODEJS_22_X,
      timeout: Duration.seconds(20),
      environment: {
        GLOBAL_DAILY_LIMIT: '1500',
        GLOBAL_MONTHLY_LIMIT: '10000',
        MODEL_ID: process.env.LUKE_AI_MODEL_ID ?? 'eu.amazon.nova-lite-v1:0',
        MODEL_REGION: process.env.LUKE_AI_MODEL_REGION ?? 'eu-west-1',
        QUOTA_TABLE_NAME: quotaTable.tableName,
        SESSION_HOURLY_LIMIT:
          process.env.LUKE_AI_SESSION_HOURLY_LIMIT ?? '10',
      },
    })

    quotaTable.grantReadWriteData(chatHandler)

    chatHandler.addToRolePolicy(
      new PolicyStatement({
        actions: [
          'bedrock:Converse',
          'bedrock:ConverseStream',
          'bedrock:InvokeModel',
          'bedrock:InvokeModelWithResponseStream',
        ],
        resources: ['*'],
      })
    )

    const chatApi = new RestApi(this, 'LukeAiApi', {
      deployOptions: {
        stageName: 'prod',
      },
      defaultCorsPreflightOptions: {
        allowHeaders: ['content-type'],
        allowMethods: ['OPTIONS', 'POST'],
        allowOrigins: ['*'],
      },
    })

    chatApi.root
      .addResource('api')
      .addResource('chat')
      .addMethod('POST', new LambdaIntegration(chatHandler))

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
      additionalBehaviors: {
        'api/*': {
          origin: new RestApiOrigin(chatApi),
          allowedMethods: AllowedMethods.ALLOW_ALL,
          cachePolicy: CachePolicy.CACHING_DISABLED,
          originRequestPolicy:
            OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      },
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
      memoryLimit: 1024,
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

    new CfnOutput(this, 'LukeAiApiUrl', {
      value: `${chatApi.url}api/chat`,
    })

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
