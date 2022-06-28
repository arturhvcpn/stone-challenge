import { UserProps } from '../../repositories/IUserRepository';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { AppError } from '../../../../shared/error/AppError';

describe('Unit - Create User', () => {
    let userRepository: UserRepository;
    let createUserUseCase: CreateUserUseCase;
    let user: UserProps;

    beforeEach(() => {
        user = {
            name:'Artur',
            lastname:'Polo Norte',
            email: 'teste@teste.com.br',
            nickname: 'arturhvcpn',
            password: '123456'
        }
    });
    
    beforeAll(() => {
        userRepository = UserRepository.getInstance();
        createUserUseCase = new CreateUserUseCase(userRepository);
    });

    it('it should be create a new user with sucessfully', async () => {
        
        await createUserUseCase.execute(user);
        const userCreated = await userRepository.findByEmail(user.email);

        expect(userCreated?.name).toBe(user.name)
        expect(userCreated?.lastname).toBe(user.lastname)
        expect(userCreated?.nickname).toBe(user.nickname)
        expect(userCreated?.email).toBe(user.email)
    });

    it('it should be email already exists', async () => {
        try {            
            await createUserUseCase.execute(user);
            await createUserUseCase.execute(user);
        } catch (error) {
            const errorTyped = error as unknown as AppError;
            expect(errorTyped).toBeInstanceOf(AppError);
            expect(errorTyped.httpStatus).toBe(400);
            expect(errorTyped.message).toBe('Email already exists');
        }
    });

    it('it should be nickname already exists', async () => {
        try {
            const userWithSameNickname: UserProps = {
                name:'Artur',
                lastname:'Polo Norte',
                email: 't@t.com.br',
                nickname: 'arturhvcpn',
                password: '123456'
            };

            await createUserUseCase.execute(userWithSameNickname);
            await createUserUseCase.execute(userWithSameNickname);
        } catch (error) {
            const errorTyped = error as unknown as AppError;
            expect(errorTyped).toBeInstanceOf(AppError);
            expect(errorTyped.httpStatus).toBe(400);
            expect(errorTyped.message).toBe('Nickname already exists');
        }
    });
})