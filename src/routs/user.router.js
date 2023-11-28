import { Router } from 'express';
import UserController from '../controllers/user.controllers.js';
import { checkAuth } from '../middlewares/authJwt.js';
import { upload } from '../middlewares/multer.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
const controller = new UserController();


const router = Router();
router.get('/',controller.getAllDto);
router.delete('/deleteUsers',checkAdmin,controller.deleteUsers)
router.post('/register',controller.register);
router.post('/login',controller.login);
router.get('/logout',checkAuth,controller.logout);
router.post('/premium/:idUser',checkAdmin,controller.updatePremium);
router.post('/upload',checkAuth,upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'ident', maxCount: 1 },{ name: 'domicilio', maxCount: 1 },{ name: 'cuenta', maxCount: 1 }, { name: 'product', maxCount: 3 }]),controller.documentUpload);
router.post('/add/:idProd/quantity/:quantity',checkAuth,controller.addProdToUserCart);
router.post('/reset-pass', checkAuth, controller.resetPass);
router.put('/new-pass', checkAuth, controller.updatePass);


export default router;