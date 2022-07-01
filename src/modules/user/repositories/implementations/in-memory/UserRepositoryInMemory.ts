import { User } from "../../../model/User";
import { IUserRepository, UserProps } from "../../IUserRepository";

function attributeExists(value:any): boolean {
  if(value !== undefined){
      return true;
  } else {
      return false;
  }
}

class UserRepositoryInMemory implements IUserRepository {
    private users: User[] = [];
    private static INSTANCE: UserRepositoryInMemory;

    constructor(){}

    public static getInstance(): UserRepositoryInMemory {
        if(!UserRepositoryInMemory.INSTANCE){
            UserRepositoryInMemory.INSTANCE = new UserRepositoryInMemory();
        }
        return UserRepositoryInMemory.INSTANCE;
    }

    public async create({ name, lastname, nickname, email, password }: UserProps): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            lastname,
            nickname,
            email,
            password,
            createdAt: new Date,
            updatedAt: new Date,
            avatarUrl: null
        });
        
        this.users.push(user);
    }

    public async list(nickname: string): Promise<[User]> {
        const data = this.users.find(user => user.nickname === nickname);

        const user = [data];

        return user as [User];
    }
    
    public async findByEmail(email: string): Promise<boolean> {
        const data = this.users.find(user => user.email === email);
        
        const emailExists = attributeExists(data);

        return emailExists;
    }

    public async findByNickname(nickname: string): Promise<boolean> {
        const data = this.users.find(user => user.nickname === nickname);
        
        const nicknameExists = attributeExists(data);
        
        return nicknameExists;
    }
    
}

export { UserRepositoryInMemory };