import { User } from '../../model/User';
import { AppError } from '../../../../shared/error/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IUserPropsWithoutRequiredPassword {
    id: string;
    name: string;
    lastname: string;
    nickname: string;
    email: string;
    password?:string;
    avatarUrl: any;
    createdAt: Date;
}

class ListUserUseCase {
    constructor(private userRepository: IUserRepository){}

    public async execute(nickname:string): Promise<User[]> {
        const user: IUserPropsWithoutRequiredPassword[] = await this.userRepository.list(nickname);

        if(user.length <= 0){
            throw new AppError(404, "Nickname doesn't find");
        };

        const userWithoutPassword = user.filter(user => delete user.password);

        return userWithoutPassword as User[];
    }
}

export { ListUserUseCase };