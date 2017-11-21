import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import {
   saveDashboardLayoutController,
   getDashboardLayoutController
 } from './dashboardLayoutController.js';

const router = expressAsyncAwait(Router());
router.get('/layout/:dashboardId', getDashboardLayoutController);
router.post('/layout', saveDashboardLayoutController);


export default router;
