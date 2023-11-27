import {Router} from 'express';
import ProductController from '../controllers/product.controllers.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
import { checkAuth } from '../middlewares/authJwt.js';


const controller = new ProductController();

const router = Router();

router.get('/',checkAuth,controller.getall);

router.get('/paginate',checkAuth,controller.getallPaginate);

router.get('/:id',checkAuth,controller.getById);

router.post('/',checkAdmin,controller.create); //ok

router.put('/:id',checkAdmin,controller.update); //ok

router.delete('/:id',checkAdmin,controller.delete);//ok

export default router;