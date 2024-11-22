import {
    validateAccessToken,
    validateAuthentication,
    validateRegistration
} from "../middlewares/authenticate.middleware.js";
import * as controller from "../controllers/authenticate.controller.js";
import express from "express";
import router from "./vocab-builder.route.js";

const authenticateRouter = express.Router()

authenticateRouter.get('/ping', validateAccessToken, controller.ping)
authenticateRouter.post('/sign-up', validateRegistration, controller.signUp)
authenticateRouter.post('/login', validateAuthentication, controller.login)

export default authenticateRouter