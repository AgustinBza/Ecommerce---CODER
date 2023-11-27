import { cartDao } from "../persistence/daos/factory.js";
import Services from "./class.services.js";
import { logger } from '../logger.js';


export default class CartService extends Services {
    
    constructor() {
        super(cartDao);
    }


    addCartProducts = async(idCart,idProd)=>{
        try {
            logger.info('Ejecturando el Servicio addCartProducts');
            const response = await cartDao.addCartProducts(idCart,idProd);
            return response;
        } catch (error) {
            logger.error('Error en el Servicio addCartProducts');
        }
    }


    getAllLimit= async(limit) => {
        try {
            logger.info('Ejecturando el Servicio getAllLimit');
            const response = await cartDao.getAllLimit(limit);
            return response;
        } catch (error) {
            logger.error('Error en el Servicio getAllLimit');
        }
    }


    deleteCartProducts= async(idCart,idProd) => {
        try {
            logger.info('Ejecturando el Servicio deleteCartProducts');
            const response = await cartDao.deleteCartProducts(idCart,idProd);
            return response;
        } catch (error) {
            logger.error('Error en el Servicio deleteCartProducts');
        }
    }


    updateQuantityProducts = async(idCart,idProd,quantity) => {
        try {
            logger.info('Ejecturando el Servicio updateQuantityProducts');
            const response = await cartDao.updateQuantityProducts(idCart,idProd,quantity);
            return response;
        } catch (error) {
            logger.error('Error en el Servicio updateQuantityProducts');
        }
    }

    deleteAllProductsCart = async(idCart) => {
        try {
            logger.info('Ejecturando el Servicio deleteAllProductsCart');
            const response = await cartDao.deleteAllProductsCart(idCart);
            return response;
        } catch (error) {
            logger.error('Error en el Servicio deleteAllProductsCart');
        }
    }


    updateAllProductsCart = async(idCart,newProducts) => {
        try {
            logger.info('Ejecturando el Servicio updateAllProductsCart');
            const response = await cartDao.updateAllProductsCart(idCart,newProducts);
            return response;
        } catch (error) {
            logger.error('Error en el Servicio updateAllProductsCart');
        }
    }


}

