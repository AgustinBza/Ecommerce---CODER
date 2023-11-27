import { Router } from "express";
import { currentResponse } from "../controllers/session.controllers.js";
const router = Router();
import { checkAuth } from "../middlewares/authJwt.js";

router.get('/current',checkAuth,currentResponse);

export default router;