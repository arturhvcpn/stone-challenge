import AWS from 'aws-sdk';
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../../../config'

AWS.config.update({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'stone-challenge';

const listUsers = async () => {
    const params = {
        TableName: TABLE_NAME
    }

    const data = await dynamoClient.scan(params).promise();

    console.log(data)

    return data;
}
export { dynamoClient, listUsers }
