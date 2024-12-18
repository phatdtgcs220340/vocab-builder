import * as controller from '../controllers/vocab-builder.controller.js'
import express from "express";
import {validateAccessToken} from "../middlewares/authenticate.middleware.js";

const router = express.Router()

router.post('/', validateAccessToken, controller.create_a_word)
router.get('/', validateAccessToken, controller.find_all_words)
router.get('/:id', validateAccessToken, controller.find_a_word_by_id)
router.put('/:id', validateAccessToken, controller.update_a_word)
router.delete('/:id', validateAccessToken, controller.delete_a_word)

export default router