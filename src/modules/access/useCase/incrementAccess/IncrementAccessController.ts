import { Request, Response } from 'express';

import { AppError } from "../../../../shared/error/AppError";
import { IncrementAccessUseCase } from "./IncrementAccessUseCase";

class IncrementAccessController {
  constructor(private incrementAccessUseCase: IncrementAccessUseCase){}

  public async handle(request:Request, response:Response):Promise<Response>{
    try {
      const access = await this.incrementAccessUseCase.execute();
      
      return response.status(200).json({NumeroDeAcesso: access});
    } catch (error) {
      const errorTyped = error as unknown as AppError;
      return response.status(errorTyped.httpStatus).json({ Error: errorTyped.message });
    }
  }
}

export { IncrementAccessController };