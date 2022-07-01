import { ConsultAccessUseCase } from './ConsultAccessUseCase';

describe('Unit - ConsultAccessUseCase', () => {

    let consultAccessUseCase: ConsultAccessUseCase;
    beforeAll(() => {
      consultAccessUseCase = new ConsultAccessUseCase();
    });

    it('it should be get access number', async () => {
      const data = await consultAccessUseCase.execute();

      expect(data.toString().length).toBe(4);
    });

})