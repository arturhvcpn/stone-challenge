import { Request, Response } from 'express';
import { ListUserUseCase } from './ListUserUseCase';
import { AppError } from '../../../../shared/error/AppError';

class ListUserController {
    constructor(private listUserUseCase: ListUserUseCase){}

    public async handle(request:Request, response: Response): Promise<Response>{
        try {
            const { nickname } = request.params;
            
            const user = await this.listUserUseCase.execute(nickname);
            
            return response.status(200).json(user);
        } catch (error) {
            const errorTyped = error as unknown as AppError;
            return response.status(errorTyped.httpStatus).json({ Error: errorTyped.message });
        }
    }
}

export { ListUserController };