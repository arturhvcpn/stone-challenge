import { CreateUserUseCase } from './CreateUserUseCase';
import { AppError } from '../../../../shared/error/AppError';
import { UserProps } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/implementations/in-memory/UserRepositoryInMemory';

describe('Unit - Create User', () => {
    let userRepositoryInMemory: UserRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;

    
    beforeAll(() => {
        userRepositoryInMemory = UserRepositoryInMemory.getInstance();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it('it should be create a new user with sucessfully', async () => {
        
        await createUserUseCase.execute({
            name: 'Usuario',
            lastname: 'Teste Ton',
            email: 'ton@stone.com.br',
            nickname: 'ton',
            password: '123456'
        });
        const userCreated = await userRepositoryInMemory.list('ton');

        userCreated.map(user => {
            expect(user.name).toBe('Usuario');
            expect(user.lastname).toBe('Teste Ton');
            expect(user.nickname).toBe('ton');
            expect(user.email).toBe('ton@stone.com.br');
            expect(user.avatarUrl).toBeNull();
        });

    });

    it('it should be email already exists', async () => {
        try {            
            await createUserUseCase.execute({
                name: 'Usuario',
                lastname: 'Teste Ton',
                email: 'ton@stone.com.br',
                nickname: 'ton',
                password: '123456'
            });
        } catch (error) {
            const errorTyped = error as unknown as AppError;
            expect(errorTyped).toBeInstanceOf(AppError);
            expect(errorTyped.httpStatus).toBe(400);
            expect(errorTyped.message).toBe('Email already exists');
        }
    });

    it('it should be nickname already exists', async () => {
        try {
            await createUserUseCase.execute({
            name: 'Usuario',
            lastname: 'Teste Ton',
            email: 'ton@ton.com.br',
            nickname: 'ton',
            password: '123456'
        });
        } catch (error) {
            const errorTyped = error as unknown as AppError;
            expect(errorTyped).toBeInstanceOf(AppError);
            expect(errorTyped.httpStatus).toBe(400);
            expect(errorTyped.message).toBe('Nickname already exists');
        }
    });
})