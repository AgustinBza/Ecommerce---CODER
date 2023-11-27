import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import { productDao, userDao } from "../persistence/daos/factory.js";
import { createResponse , errorDictionary} from "../utils.js";
import UserService from "../services/user.services.js";
import { logger } from '../logger.js';
import { sendMailDeletPremium } from "../services/email.service.js";

const userService = new UserService();
const productService = new ProductService();

export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }

    getall = async(req,res,next) =>{
        try {
            const {limit , sort , category , status } = req.query;           
            const response = await productService.getAll(limit,sort,category,status)
            if (!response)
            createResponse(res, 404, {
              method: "service",
              error: errorDictionary.ITEMS_NOT_FOUND
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(501).send(error.message);
        }
    }

    getallPaginate = async(req,res,next) =>{
        try {
            let status;
            const {page,limit} = req.query;

            const response = await productService.getAllPaginate(page,limit);
            
            if(response){
                status = 'succes'
            }else{
                status = 'error';
            }

            const prevLink = response.hasPrevPage ? `http://localhost:8080/api/products/paginate?page=${response.prevPage}` : null;
            const nextLink = response.hasNextPage ? `http://localhost:8080/api/products/paginate?page=${response.nextPage}` : null;

            res.json({
                status,
                payload:response.docs,
                totalPages: response.totalpages,
                page:response.page,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink,
                nextLink
            });


        } catch (error) {
            next(error.message);
        }
    }

    getallMock = async(req,res,next) =>{
        try {
            const user = await userService.getById(req.user);
            const nombre = user.first_name;
            const email = user.email;
            const role = user.role;
            const products = await productService.createProductsMock();
            res.render('home',{products,nombre,email,role});
        } catch (error) {
            next(error.message);
        }
    }

    delete = async(req,res,next) =>{
        try {
            
            const userReq = req.user;
            const idUser = userReq._id
            const {id} = req.params;
            logger.debug('ProdId ' + id);
            const user = await userService.getById(idUser);
            const userRole = user.role;
            const product = await productService.getById(id);
            console.log(product)
            const ownerId = product.owner;
            logger.debug('UserId: ' + idUser);
            logger.debug('OwnerId: ' + ownerId);
            const userOwner = await userService.getById(ownerId);


            if(userRole == "premium"){
                if(idUser == ownerId){
                    logger.info('Usuario Premium')
                    const responsePremium = await productService.delete(id);
                    sendMailDeletPremium(user,product,'deletePremium');
                    console.log(responsePremium)
                    createResponse(res, 200, responsePremium);
                }else{
                    createResponse(res, 404,{msg: errorDictionary.DELETE_PRODUCT_ERROR_OWNER});
                }
            }
            else {
                logger.info('Usuario Administrador')
                const response = await productService.delete(id);
                if(userOwner.role == 'premium'){
                    sendMailDeletPremium(userOwner,product,'deletePremium');
                }
                if(!response) createResponse(res, 404,{msg: errorDictionary.DELETE_PRODUCT_ERROR });
                createResponse(res, 200, response);
            }
        } catch (error) {
            console.log(error);
        }
    }


    create = async (req,res,next)=>{
        try {

            const {id} = req.user; // id usuario
            const newProduct = req.body;
            console.log(newProduct);
            const ownerId = id
            const newProductOwner = {
                ...newProduct,
                owner : ownerId
            }

            console.log(newProduct);
            const response  = await productService.create(newProductOwner);

            if (!response)
            createResponse(res, 404, {
              msg: errorDictionary.CREATE_ERROR
            });
            else createResponse(res, 200, response);

        } catch (error) {
            logger.error(error);
        }
    }


}