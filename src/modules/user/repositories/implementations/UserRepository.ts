import { User } from "../../model/User";
import { IUserRepository, UserProps } from "../IUserRepository";
import { DynamoClient } from "../../../../shared/infra/dynamo/DynamoClient";

function attributeExists(value:any): boolean {
    if(value > 0 || value === undefined){
        return true;
    } else {
        return false;
    }
}

class UserRepository implements IUserRepository {
    private dynamoDB: DynamoClient;
    private static INSTANCE: UserRepository;

    constructor(){
        this.dynamoDB = new DynamoClient();
    }

    public static getInstance(): UserRepository {
        if(!UserRepository.INSTANCE){
            UserRepository.INSTANCE = new UserRepository();
        }
        return UserRepository.INSTANCE;
    }

    public async create({ name, lastname, nickname, email, password }: UserProps): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            lastname,
            nickname,
            email,
            password,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            avatarUrl: null
        });
        
        await this.dynamoDB.create(user);
    }

    public async list(nickname: string): Promise<[User]> {
        const data = await this.dynamoDB.list(nickname);
        
        const user = data as unknown as [User];

        return user;
    }
    
    public async findByEmail(email: string): Promise<boolean> {
        const data = await this.dynamoDB.findByEmail(email);
        
        const emailExists = attributeExists(data)
        
        return emailExists;
    }

    public async findByNickname(nickname: string): Promise<boolean> {
        const data = await this.dynamoDB.findByNickname(nickname);
        
        const nicknameExists = attributeExists(data)

        return nicknameExists;
    }
    
}

export { UserRepository };