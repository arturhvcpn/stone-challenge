import { IncrementAccessUseCase } from './IncrementAccessUseCase';
import { AppError } from '../../../../shared/error/AppError';

describe('Unit - ConsultAccessUseCase', () => {
  let incrementAccessUseCase: IncrementAccessUseCase;
    
    beforeAll(() => {
      incrementAccessUseCase = new IncrementAccessUseCase();
    });

    it('it should be get access number', async () => {
      const data = await incrementAccessUseCase.execute();

      expect(data.toString().length).toBe(4);
    })

})