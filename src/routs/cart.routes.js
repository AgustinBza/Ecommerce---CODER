import { Router } from 'express';
import CartController from '../controllers/cart.controllers.js';
const cartControllers = new CartController();
import TicketController from "../controllers/ticket.controller.js";
const ticketcontroller = new TicketController();
import { checkAuth } from '../middlewares/authJwt.js';

const router = Router();

router.get('/',checkAuth,cartControllers.getAll);

router.get('/:id',/*checkAuth,*/cartControllers.getById);

router.post('/',/*checkAuth,*/cartControllers.create);

router.post('/:cid/product/:pid',checkAuth,cartControllers.addCartProducts);

router.put('/:cid/product/:pid',checkAuth,cartControllers.updateQuantityProducts);

router.put('/:cid',checkAuth,cartControllers.updateAllProductsCart);

router.delete('/:cid/product/:pid',checkAuth,cartControllers.deleteCartProducts);

router.delete('/:cid',/*checkAuth,*/cartControllers.deleteAllProductsCart);

router.post('/:id/purchase',checkAuth,ticketcontroller.generateTicket);

export default router;