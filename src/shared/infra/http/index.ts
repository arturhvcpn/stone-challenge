import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import { router } from '../http/routes';
import swagger from '../http/doc/swagger.json';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use('/api/swagger', serve, setup(swagger));

export { app };
