import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import {
	createWidgetController,
	removeWidgetController,
} from './widgetController.js';

const router = expressAsyncAwait(Router());

router.post('/', createWidgetController);
router.delete('/:id', removeWidgetController);

export default router;
