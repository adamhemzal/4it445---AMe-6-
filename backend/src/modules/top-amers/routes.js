import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import {
	topAmersController,
	saveWidgetSettingsToDB,
} from './topAmersController.js';

const router = expressAsyncAwait(Router());
router.get('/', topAmersController).post('/', saveWidgetSettingsToDB);

export default router;
