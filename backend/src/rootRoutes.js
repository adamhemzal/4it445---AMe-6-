import { Router } from 'express';

import topAmersRoutes from './modules/top-amers/routes';
import topAmePostsRoutes from './modules/top-ame-posts/routes';
import securityRoutes from './modules/security/routes';
import adminRoutes from './modules/admin/routes';

const router = Router();

router.use('/top-amers', topAmersRoutes);
router.use('/top-ame-posts', topAmePostsRoutes);
router.use('/', securityRoutes);
router.use('/admin', adminRoutes);

export default router;
