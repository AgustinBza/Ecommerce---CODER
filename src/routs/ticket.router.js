import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
const controller = new TicketController();
import { checkAuth } from "../middlewares/authJwt.js";

const router = Router();

router.post('/',checkAuth,controller.generateTicket);

export default router;
