import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { OutlookController, saveWidgetSettingsToDB } from './OutlookController.js';

const router = expressAsyncAwait(Router());
router.get('/', OutlookController).post('/', saveWidgetSettingsToDB);

export default router;