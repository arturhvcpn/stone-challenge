import { UserProps } from '../../repositories/IUserRepository';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { ListUserUseCase } from './ListUserUseCase';

describe('CreateUser', () => {
    let userRepository: UserRepository;
    let listUserUseCase: ListUserUseCase;
    let userOne: UserProps;
    let userTwo: UserProps;
    
    beforeEach(() => {
        userOne = {
            name:'Artur',
            lastname:'Polo Norte',
            email: 'teste@teste.com.br',
            nickname: 'arturhvcpn',
            password: '123456'
        }
        userTwo = {
            name:'Artur',
            lastname:'Polo Norte',
            email: 't@t.com.br',
            nickname: 'artur',
            password: '123456'
        }
    });
    
    beforeAll(() => {
        userRepository = UserRepository.getInstance();
        listUserUseCase = new ListUserUseCase(userRepository);
    });

    it('it should be list any users', () => {
        const user = listUserUseCase.execute();

        expect(user).toBe(0)
    });

    it('it should be list user exists', () => {
        const user = listUserUseCase.execute();

        expect(user).toBe(undefined)
    });
})