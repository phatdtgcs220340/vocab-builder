import express from 'express'
import * as vocabController from '../controllers/vocab-builder.controller.js'
import * as authenticateController from '../controllers/authenticate.controller.js'
import {validateRegistration} from "../middlewares/authenticate.middleware.js";
const router = express.Router()

router.get('/ping', vocabController.ping)

router.post('/sign-up', validateRegistration, authenticateController.signUp)
export default router