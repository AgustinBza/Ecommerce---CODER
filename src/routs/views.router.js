import { Router } from "express";
const router = Router();
import { login, register, errorLogin, errorRegister, profile, homeProducts,loggerTest,newpass } from "../controllers/views.controllers.js";
import { checkAuth } from "../middlewares/authJwt.js";
import ProductController from '../controllers/product.controllers.js';
const controller = new ProductController();

router.get('/login', login);
router.get('/register', register);
router.get('/error-login', errorLogin);
router.get('/error-register', errorRegister);
router.get('/profile',checkAuth, profile);
router.get('/home',checkAuth, homeProducts);
router.get('/loggerTest',loggerTest);
router.get('/mockingproducts',checkAuth,controller.getallMock);
router.get('/new-pass',checkAuth,newpass);

export default router;