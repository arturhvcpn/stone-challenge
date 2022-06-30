import AWS, { DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../../../config';
import { User } from '../../../modules/user/model/User';

class DynamoClient {
    private TABLE_NAME = 'stone-challenge';
    public dynamoClient!: DynamoDB.DocumentClient;

    constructor(){
        AWS.config.update({
            region: AWS_REGION,
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        });

        this.dynamoClient = new AWS.DynamoDB.DocumentClient();
    }
/**
    public async createConnection(): Promise<DynamoDB.DocumentClient> {
        AWS.config.update({
            region: AWS_REGION,
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        });
        
        const dynamoClient = new AWS.DynamoDB.DocumentClient();
        
        return dynamoClient;
    }
 */
    public async list(nickname: string): Promise<PromiseResult<DynamoDB.DocumentClient.ScanOutput, AWS.AWSError>> {
        const params = {
            TableName: this.TABLE_NAME,
            Items: nickname
        }
        
        const data = await this.dynamoClient.scan(params).promise();

        return data;
    }

    public async create(user: User): Promise<PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>> {
        const params = {
            TableName: this.TABLE_NAME,
            Item: user
        }

        const data = await this.dynamoClient.put(params).promise();

        return data;
    }
}

export { DynamoClient };