import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { topAmePostsController } from './topAmePostsController.js';

const router = expressAsyncAwait(Router());
router.get('/', topAmePostsController);

export default router;
