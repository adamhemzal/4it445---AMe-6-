import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { topAmersController } from './topAmersController.js';

const router = expressAsyncAwait(Router());
router.get('/', topAmersController);

export default router;
