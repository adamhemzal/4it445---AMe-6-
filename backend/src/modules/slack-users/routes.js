import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { getList } from './slackUsersController.js';
import { getDetails } from './slackUsersController.js';

const router = expressAsyncAwait(Router());
router.get('/list', getList);
router.get('/details', getDetails);

export default router;

