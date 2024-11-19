import {validateAuthentication, validateRegistration} from "../middlewares/authenticate.middleware.js";
import * as controller from "../controllers/authenticate.controller.js";
import express from "express";

const authenticateRouter = express.Router()

authenticateRouter.post('/sign-up', validateRegistration, controller.signUp)
authenticateRouter.post('/login', validateAuthentication, controller.login)

export default authenticateRouter