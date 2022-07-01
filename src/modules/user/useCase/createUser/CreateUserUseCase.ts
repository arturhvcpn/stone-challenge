import { hash } from 'bcryptjs';
import { IUserRepository, UserProps } from '../../repositories/IUserRepository';
import { AppError } from '../../../../shared/error/AppError';

class CreateUserUseCase {
    constructor(private userRepository: IUserRepository){}

    public async execute({ name, lastname, nickname, email, password }: UserProps): Promise<void> {
        const emailAlredyExists = await this.userRepository.findByEmail(email);

        if(emailAlredyExists){
            throw new AppError(400, 'Email already exists');
        }
        
        const nicknameAlreadyExists = await this.userRepository.findByNickname(nickname);

        if(nicknameAlreadyExists){
            throw new AppError(400, 'Nickname already exists')
        }

        const hashedPassword = await hash(password,8);

        await this.userRepository.create({ name, lastname, nickname, email, password:hashedPassword });
    }
}

export { CreateUserUseCase };
