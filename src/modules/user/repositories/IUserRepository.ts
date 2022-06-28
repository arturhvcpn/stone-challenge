import { User } from "../model/User";

export interface UserProps {
    name: string;
    lastname: string;
    nickname: string;
    email:string;
    password:string;
}

interface IUserRepository {
    create({ name, lastname, nickname, email, password }: UserProps): Promise<void>;
    list(nickname: string): Promise<User | undefined>;
    findByEmail(email:string): Promise<User | undefined>;
    findByNickname(nickname: string): Promise<User | undefined>;
}

export { IUserRepository };