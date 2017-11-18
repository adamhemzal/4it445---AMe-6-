const passport = require('passport')

import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { loginController } from './loginController.js';
import { logoutController } from './logoutController.js';

const router = expressAsyncAwait(Router());
router.get('/login', loginController);
router.post('/login', passport.authenticate('local', { successRedirect: '/login', failureRedirect: '/login', successFlash: true, failureFlash: true }));
router.get('/logout', loginController);

export default router;
