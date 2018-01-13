import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import {
   saveDashboardLayoutController,
   getDashboardLayoutController,
 } from './dashboardLayoutController.js';

 import {
    saveDashboardController,
    getDashboardController
  } from './dashboardController.js';
  
  import {
    getDashboardList
  } from './getDashboardList.js';

const router = expressAsyncAwait(Router());
router.get('/layout/:dashboardId', getDashboardLayoutController);
router.post('/layout', saveDashboardLayoutController);

router.get('/info/:dashboardId', getDashboardController);
router.post('/info', saveDashboardController);

router.get('/list', getDashboardList);

export default router;
