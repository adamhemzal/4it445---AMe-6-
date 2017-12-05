import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { weatherController } from './weatherController.js';

const router = expressAsyncAwait(Router());
router.get('/', weatherController);

export default router;
