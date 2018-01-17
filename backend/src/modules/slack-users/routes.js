import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { getList } from './slackUsersController.js';
import { getDetail } from './slackUsersController.js';

const router = expressAsyncAwait(Router());
router.get('/list', getList);
router.get('/detail/:id', getDetail);

export default router;

