import { Router } from 'express';
import { createUserController } from '../../../../modules/user/useCase/createUser';
import { listUserController } from '../../../../modules/user/useCase/listUser';

const users = Router();

users.post('/user/create', (request, response) => {
    return createUserController.handle(request, response);
});

users.get('/user/list/:nickname', (request, response) => {
    return listUserController.handle(request, response);
});

export { users };
