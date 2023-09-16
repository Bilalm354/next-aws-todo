import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new dynamodb.TableV2(this, 'TodoTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
      tableName: 'todo-table',
    });
  }
}