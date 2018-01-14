import expressAsyncAwait from 'express-async-await';
import { Router } from 'express';

import { getOutlookController } from "./outlookController.js";

const router = expressAsyncAwait(Router());
router.post("/:calendarId/:timespanFrom/:timespanTo", getOutlookController);
router.get("/", getOutlookController);

export default router;
