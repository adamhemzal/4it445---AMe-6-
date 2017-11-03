import { Router } from 'express';

import topAmersRoutes from './modules/top-amers/routes';
import topAmePostsRoutes from './modules/top-ame-posts/routes';

const router = Router();

router.use('/top-amers', topAmersRoutes);
router.use('/top-ame-posts', topAmePostsRoutes);

export default router;
