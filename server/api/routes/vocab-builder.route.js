import * as controller from '../controllers/vocab-builder.controller.js'
import express from "express";
import {validateAccessToken} from "../middlewares/authenticate.middleware.js";

const router = express.Router()

router.get('/ping', controller.ping)
router.post('/create-a-word', validateAccessToken, controller.create_a_word)
router.get('/find-all', validateAccessToken, controller.find_all_words)

export default router