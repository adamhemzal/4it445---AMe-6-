import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { adminIndexController } from './adminIndexController.js';

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

const router = expressAsyncAwait(Router());
router.get('/', isLoggedIn, adminIndexController);

export default router;
