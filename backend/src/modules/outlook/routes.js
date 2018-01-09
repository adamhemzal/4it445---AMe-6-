import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { getMsCalendarController } from "./outlookController.js";

const router = expressAsyncAwait(Router());
router.post("/:calendarId/:timespanFrom/:timespanTo", getOutlookController);

export default router;