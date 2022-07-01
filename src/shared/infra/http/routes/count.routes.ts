import { Router } from 'express';
import { consultAccessController } from '../../../../modules/access/useCase/consultAccess'
import { incrementAccessController } from '../../../../modules/access/useCase/incrementAccess'

const access = Router();

access.get('/access/consult', (request, response) => {
  return consultAccessController.handle(request, response);
});

access.get('/access/increment', (request, response) => {
  return incrementAccessController.handle(request, response)
});

export { access };
