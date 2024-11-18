import * as controller from '../controllers/vocab-builder.controller.js'
import express from "express";

const router = express.Router()

router.get('/ping', controller.ping)

export default router