import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { topAmePostsController, saveWidgetSettingsToDB } from './topAmePostsController.js';

const router = expressAsyncAwait(Router());
router.get('/', topAmePostsController).post('/', saveWidgetSettingsToDB);

export default router;
