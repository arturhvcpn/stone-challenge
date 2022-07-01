import AWS, { AWSError, DynamoDB } from 'aws-sdk';
import { ItemList, PutItemOutput } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../../../config';
import { User } from '../../../modules/user/model/User';

class DynamoClient {
    private TABLE_NAME = 'stone-challenge';
    public dynamoClient: DynamoDB.DocumentClient;

    constructor(){
        AWS.config.update({
            region: AWS_REGION,
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        });

        this.dynamoClient = new AWS.DynamoDB.DocumentClient();
    }

    public async list(nickname: string): Promise<ItemList | undefined> {
        const params = {
            TableName: this.TABLE_NAME,
            ScanFilter: {
                nickname: {
                    AttributeValueList:[ nickname ],
                    ComparisonOperator: "EQ"
                }
            }
        }
        
        const { Items } = await this.dynamoClient.scan(params).promise();

        return Items;
    }

    public async create(user: User): Promise<PromiseResult<PutItemOutput, AWSError>> {
        const params = {
            TableName: this.TABLE_NAME,
            Item: user
        }

        const data = await this.dynamoClient.put(params).promise();

        return data;
    }

    public async findByEmail(email: string): Promise<number | undefined> {
        const params = {
            TableName: this.TABLE_NAME,
            ScanFilter: {
                email: {
                    AttributeValueList:[ email ],
                    ComparisonOperator: "EQ"
                }
            }
        }
        
        const { Count } = await this.dynamoClient.scan(params).promise();

        return Count;
    }

    public async findByNickname(nickname: string): Promise<number | undefined> {
        const params = {
            TableName: this.TABLE_NAME,
            ScanFilter: {
                nickname: {
                    AttributeValueList:[ nickname ],
                    ComparisonOperator: "EQ"
                }
            }
        }
        
        const { Count } = await this.dynamoClient.scan(params).promise();

        return Count;
    }
}

export { DynamoClient };