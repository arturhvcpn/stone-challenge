import { User } from "../../model/User";
import { IUserRepository, UserProps } from "../IUserRepository";

class UserRepository implements IUserRepository {
    private users: User[] = [];

    private static INSTANCE: UserRepository;

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
            createdAt: new Date,
            updatedAt: new Date,
            avatarUrl: null
        });

        this.users.push(user);
    }

    public async list(nickname: string): Promise<User | undefined> {
        const user = this.users.find(user => user.nickname === nickname);

        return user;
    }
    
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    public async findByNickname(nickname: string): Promise<User | undefined> {
        const user = this.users.find(user => user.nickname === nickname);

        return user;
    }
    
}

export { UserRepository };