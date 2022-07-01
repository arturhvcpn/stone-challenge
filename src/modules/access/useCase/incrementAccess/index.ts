import { IncrementAccessUseCase } from './IncrementAccessUseCase';
import { IncrementAccessController } from './IncrementAccessController';

const incrementAccessUseCase = new IncrementAccessUseCase();
const incrementAccessController = new IncrementAccessController(incrementAccessUseCase);

export { incrementAccessController };
