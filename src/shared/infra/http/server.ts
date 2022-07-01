import { app } from ".";
import { PORT } from '../../../config';
import { logger } from '../../../utils/logger';

app.listen(PORT, () => {
    logger.info(`listening server in port ${PORT}`);
});
