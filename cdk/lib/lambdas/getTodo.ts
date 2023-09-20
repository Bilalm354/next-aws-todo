import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import  { unmarshall }  from '@aws-sdk/util-dynamodb';

export async function handler(event: APIGatewayProxyEvent, _context: any) {
    console.log({event});
    const { AWS_REGION } = process.env;

    const client = new DynamoDBClient({ region: AWS_REGION });

    const command = new ScanCommand({
        TableName: 'todo-table',
    });

    try {
        const data = await client.send(command);
        const { Items } = data;
        if (!Items) throw new Error('No items found');

        const todos = Items.map((Item) => unmarshall(Item));
        console.log({data, command});
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ todos }),
        };
    } catch (error: any) {
        console.error({error});
        throw new Error(error);
    } finally {
        client.destroy();
    }
}