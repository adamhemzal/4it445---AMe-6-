import { Router } from 'express';

import topAmersRoutes from './modules/top-amers/routes';
import topAmePostsRoutes from './modules/top-ame-posts/routes';
import weatherRoutes from './modules/weather/routes';
import securityRoutes from './modules/security/routes';
import adminRoutes from './modules/admin/routes';
import dashboardRoutes from './modules/dashboard/routes';
import slackChannelsController from './modules/slack-channels/routes';

const router = Router();

// router.use(function(req, res, next){
//   // if (req.isAuthenticated()) {
//   //   res.isAuthenticated = true;
//   // } else {
//   //   res.isAuthenticated = false;
//   // }
//   res.write("test");
//   console.log("test");
//   next();
//   // console.log(req.user);
//   // next();
//   // if (req){
//   //   next();
//   // } else{
//   //   next();
//   //   // next(new Error(401)); // 401 Not Authorized
//   // }
// });

router.use('/top-amers', topAmersRoutes);
router.use('/top-ame-posts', topAmePostsRoutes);
router.use('/weather', weatherRoutes);
router.use('/', securityRoutes);
router.use('/admin', adminRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/slack-channels', slackChannelsController);

export default router;
