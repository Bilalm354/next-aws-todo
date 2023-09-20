import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Todo } from '../../../common/types/Todo';
import { APIGatewayProxyEvent } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent, _context: any) {
    console.log({event});
    const { AWS_REGION } = process.env;

    if (!event.body) {
        console.error('Invalid request');
        console.error({event});
        throw new Error('Invalid request');
    }

    const todo = JSON.parse(event.body) as Todo;

    const { id, text, isChecked } = todo;

    if (!id || !text || isChecked === undefined) {
        console.error('Invalid todo');
        console.error({todo});
        throw new Error('Invalid todo');
    }

    const client = new DynamoDBClient({ region: AWS_REGION });

    const input: PutItemCommandInput = {
        TableName: 'todo-table',
        Item: {
            'id': {N: id.toString()},
            'text': {S: text},
            'isChecked': {BOOL: isChecked}
        }
    };

    const command = new PutItemCommand(input);

    try {
        const data = await client.send(command);
        console.log({data, command});
        return {statusCode: 200, body: 'OK'};
    } catch (error: any) {
        console.error({error});
        throw new Error(error);
        // error handling.
    } finally {
        // finally.
    }
  
}