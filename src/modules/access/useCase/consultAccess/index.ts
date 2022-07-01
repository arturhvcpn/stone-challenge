import { ConsultAccessUseCase } from './ConsultAccessUseCase';
import { ConsultAccessController } from './ConsultAccessController';

const consultAccessUseCase = new ConsultAccessUseCase();
const consultAccessController = new ConsultAccessController(consultAccessUseCase);

export { consultAccessController };
