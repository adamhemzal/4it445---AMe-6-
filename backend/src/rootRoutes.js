import { Router } from 'express';

import topAmersRoutes from './modules/top-amers/routes';
import topAmePostsRoutes from './modules/top-ame-posts/routes';
import weatherRoutes from './modules/weather/routes';
import securityRoutes from './modules/security/routes';
import adminRoutes from './modules/admin/routes';
import dashboardRoutes from './modules/dashboard/routes';
import slackChannelsController from './modules/slack-channels/routes';
import slackUsersController from './modules/slack-users/routes';
import outlookRoutes from './modules/outlook/routes';
import widgetRoutes from './modules/widget/routes';


const router = Router();

router.use('/top-amers', topAmersRoutes);
router.use('/top-ame-posts', topAmePostsRoutes);
router.use('/weather', weatherRoutes);
router.use('/', securityRoutes);
router.use('/admin', adminRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/outlook', outlookRoutes);
router.use('/slack-channels', slackChannelsController);
router.use('/slack-users', slackUsersController);
router.use('/widget', widgetRoutes);

export default router;
