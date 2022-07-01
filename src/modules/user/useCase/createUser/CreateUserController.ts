import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { AppError } from '../../../../shared/error/AppError';

class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase){}

    public async handle(request:Request, response: Response): Promise<Response>{
        try {
            const { name, lastname, password, nickname, email } = request.body;

            await this.createUserUseCase.execute({ name, lastname, password, nickname, email });

            return response.status(201).json({message:'User created with successful'});
        } catch (error) {
            const errorTyped = error as unknown as AppError;
            return response.status(errorTyped.httpStatus).json({ Error: errorTyped.message });
        }
    }
}

export { CreateUserController };