import { AppError } from '../../../../shared/error/AppError';
import { User } from '../../model/User';
import { IUserRepository } from '../../repositories/IUserRepository';

class ListUserUseCase {
    constructor(private userRepository: IUserRepository){}

    public async execute(nickname:string): Promise<User | undefined> {
        const user = this.userRepository.list(nickname);

        if(!user){
            throw new AppError(404, "Nickname doesn't find")
        }

        return user;
    }

}

export { ListUserUseCase };