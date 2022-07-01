import { ListUserUseCase } from './ListUserUseCase';
import { AppError } from '../../../../shared/error/AppError';
import { UserRepositoryInMemory } from '../../repositories/implementations/in-memory/UserRepositoryInMemory';


describe('Unit - ListUser', () => {
    let userRepositoryInMemory: UserRepositoryInMemory;
    let listUserUseCase: ListUserUseCase;
    
    beforeAll(() => {
        userRepositoryInMemory = UserRepositoryInMemory.getInstance();
        listUserUseCase = new ListUserUseCase(userRepositoryInMemory);
    });

    it('it should be list test user', async () => {
        await userRepositoryInMemory.create({
            name: 'Usuario',
            lastname: 'Teste Ton',
            email: 'tonstone@stone.com.br',
            nickname: 'tonstone',
            password: '123456123'
        });
        
        const userListed = await listUserUseCase.execute('tonstone');

        await userListed.map(user => {
            expect(user.name).toBe('Usuario');
            expect(user.lastname).toBe('Teste Ton');
            expect(user.nickname).toBe('tonstone');
            expect(user.email).toBe('tonstone@stone.com.br');
            expect(user.avatarUrl).toBeNull();
        });

    });
    it('it should be list none users', () => {
        try {
            const user = listUserUseCase.execute('iamnotexists');

        } catch (error) {
            const errorTyped = error as unknown as AppError;
            expect(errorTyped).toBeInstanceOf(AppError);
            expect(errorTyped.httpStatus).toBe(404);
            expect(errorTyped.message).toBe("Nickname doesn't find");
        }
    });

})