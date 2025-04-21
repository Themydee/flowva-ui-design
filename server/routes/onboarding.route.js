import express from 'express'

import { createOnboarding} from '../controller/onboarding.controller.js'

const router = express.Router();

router.post("/", createOnboarding);

export default router