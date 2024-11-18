import { validateRegistration } from "../middlewares/authenticate.middleware.js";
import * as controller from "../controllers/authenticate.controller.js";
import express from "express";

const authenticateRouter = express.Router()

authenticateRouter.post('/sign-up', validateRegistration, controller.signUp)

export default authenticateRouter