import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
import { createResponse,errorDictionary } from "../utils.js";

const cartService = new CartService();

export default class CartController extends Controllers {
    constructor(){
      super(cartService);
    }

    getAll = async(req,res,next)=>{
        try {
            const {limit} = req.query; 
            if(limit > 0){
                const responselimit = await cartService.getAllLimit(limit);
                res.status(200).json(responselimit);
            }
            else{
                const response = await cartService.getAll();
                res.status(200).json(response);
            }
        } catch (error) {
            next(error.message);
        }
    }


    addCartProducts = async(req,res,next)=>{
        try {
            const {cid} = req.params;
            const {pid} = req.params;
            const response = await cartService.addCartProducts(cid,pid);
            if(!response) {
            createResponse(res, 404, {
                    msg: errorDictionary.ADD_CART_PRODUCT_ERROR
            });
            }
            else res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }

    deleteCartProducts = async(req,res,next)=>{
        try {
            const {cid} = req.params;
            const {pid} = req.params;
            const response = await cartService.deleteCartProducts(cid,pid);
            if(!response)  {
                createResponse(res, 404, {
                        msg: errorDictionary.DELETE_CART_PRODUCT_ERROR
                });
            }
            else res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }

    updateQuantityProducts = async(req,res,next)=>{
        try {
            const {cid} = req.params;
            const {pid} = req.params;
            const response = await cartService.updateQuantityProducts(cid,pid,req.body);
            if(!response)  {
                createResponse(res, 404, {
                        msg: errorDictionary.ADD_QUANTITY_ERROR
                });
            }
            else res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }
    

    deleteAllProductsCart = async(req,res,next)=>{
        try {
            const {cid} = req.params;
            const response = await cartService.deleteAllProductsCart(cid);
            if(!response)  {
                createResponse(res, 404, {
                        msg: errorDictionary.DELETE_ALL_CART_PRODUCT_ERROR
                });
            }
            else res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }

    updateAllProductsCart = async(req,res,next)=>{
        try {
            const {cid} = req.params;
            const response = await cartService.updateAllProductsCart(cid,req.body);
            if(!response)  {
                createResponse(res, 404, {
                        msg: errorDictionary.DELETE_ALL_CART_PRODUCT_ERROR
                });
            }
            else res.status(200).json(response);
        } catch (error) {
            next(error.message);
        }
    }

}