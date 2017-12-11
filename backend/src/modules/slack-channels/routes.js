import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { slackChannelsController } from './slackChannelsController.js';

const router = expressAsyncAwait(Router());
router.get('/', slackChannelsController);

export default router;
