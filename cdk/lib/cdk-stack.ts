import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('node:path');

export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const addTodoLambda = new NodejsFunction (this, 'addTodoLambda', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            entry: path.join(__dirname, '.', 'lambdas/addTodo.ts'),
            functionName: 'addTodoLambda',
        });

        const getTodoLambda = new NodejsFunction (this, 'getTodoLambda', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            entry: path.join(__dirname, '.', 'lambdas/getTodo.ts'),
            functionName: 'getTodoLambda',
        });

        const todoTable = new dynamodb.TableV2(this, 'TodoTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
            tableName: 'todo-table',
        });

        todoTable.grantReadWriteData(addTodoLambda);
        todoTable.grantReadData(getTodoLambda);

        const todoRestApi = new apigateway.RestApi(this, 'todoRestApi', {
            restApiName: 'todoRestApi',
        });

        const todoResource = todoRestApi.root.addResource('todo');

        todoResource.addMethod('POST', new apigateway.LambdaIntegration(addTodoLambda));
        todoResource.addMethod('GET', new apigateway.LambdaIntegration(getTodoLambda));
    }
}
