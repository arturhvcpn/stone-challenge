import { User } from "../model/User";

export interface UserProps {
    id?: string;
    name: string;
    lastname: string;
    nickname: string;
    email:string;
    password:string;
}

interface IUserRepository {
    create({ name, lastname, nickname, email, password }: UserProps): Promise<void>;
    list(nickname: string): Promise<[User]>;
    findByEmail(email:string): Promise<boolean>;
    findByNickname(nickname: string): Promise<boolean>;
}

export { IUserRepository };