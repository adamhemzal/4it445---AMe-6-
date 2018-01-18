import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import {
	personDayController,
	saveWidgetSettingsToDB,
} from './personDayController.js';

const router = expressAsyncAwait(Router());
router.get('/', personDayController).post('/', saveWidgetSettingsToDB);

export default router;
