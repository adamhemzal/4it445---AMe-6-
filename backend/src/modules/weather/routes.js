import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { weatherController, saveWidgetSettingsToDB } from './weatherController.js';

const router = expressAsyncAwait(Router());
router.get('/', weatherController).post('/', saveWidgetSettingsToDB);

export default router;
