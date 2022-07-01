import { Router } from 'express';
import { access } from './count.routes';
import { users } from './user.routes';

const router = Router();

router.use('/api', users, access)

export { router };
