import { CartModel } from "./models/cart.model.js";
import MongoDao from "./mongo.dao.js"
import { logger } from "../../../logger.js";

export default class CartDaoMongoDb extends MongoDao{
   
    constructor(){
        super(CartModel);
    }

    async getAll(){
        try {
            logger.info('Ejecutando proceso de getAll del DAO de Cart');
            const response = await CartModel.find({}).populate('products.id');
            return response;
        } catch (error) {
            logger.error('Error en la ejecucion del proceso de getAll del DAO de Cart');
        }
    }


    async getById(id) {
        try {
          logger.info('Ejecutando proceso de getById del DAO de Cart');
          const response = await CartModel.findById(id).populate('products.id');;
          return response;
        } catch (error) {
          logger.error('Error en la ejecucion del proceso de getById del DAO de Cart');
        }
      }

    async create(){
        try {
            logger.info('Ejecutando proceso de create del DAO de Cart');
            const cart = {
                products: []
            }
            const response = await CartModel.create(cart);
            logger.debug(`Response: ${response}`);
            return response;
        } catch (error) {
            logger.error('Error en la ejecucion del proceso de create del DAO de Cart');
        }
    }

    async addCartProducts( idCart, idProd , paramQuantity = 1){
        try {
            logger.info('Ejecutando proceso de addCartProducts del DAO de Cart');
            const cart = await super.getById(idCart);
            logger.debug(`cart: ${cart}`);
            console.log(cart.products)
            if(!cart){
                return false
            }
            else {
                let prodCart = cart.products.find((prod)=>{
                return  String(prod.id) === idProd;}) // Tenemos que pasar a string porque el dato que accede el find es del tipo ObjectId y no matchea con idProd
                
                logger.debug(`ProdCart: ${prodCart}`);

                if(prodCart){
                    if(paramQuantity !== 1){
                        prodCart.quantity =  prodCart.quantity + paramQuantity;
                    }
                    else{
                        prodCart.quantity =  prodCart.quantity + 1;
                    }
                }else{
                    const newProduct= {
                        id:idProd,
                        quantity: paramQuantity
                    }
                    cart.products.push(newProduct);
                }
                cart.save();
                logger.debug(`Cart: ${cart}`);
                return cart;
            }
        } catch (error) {
            logger.error('Error en la ejecucion del proceso de addCartProducts del DAO de Cart');
        }
    }

    async updateQuantityProducts(idCart,idProd,quantity){
        try {
            logger.info('Ejecutando proceso de updateQuantityProducts del DAO de Cart');
            const cart = await super.getById(idCart);
            logger.debug(`Cart: ${cart}`);
            const quantityNumber = Object.values(quantity)[0];

            if(!cart){
                return false
            }
            else {
                let prodCart = cart.products.find((prod)=>{
                return  String(prod.id) === idProd;}) // Tenemos que pasar a string porque el dato que accede el find es del tipo ObjectId y no matchea con idProd
                logger.debug(`ProdCart: ${prodCart}`);
                if(prodCart){
                    prodCart.quantity = quantityNumber
                }    
                cart.save();
                logger.debug(`Cart: ${cart}`);
                return cart;
            }
        } catch (error) {
            logger.error('Error en la ejecucion del proceso de updateQuantityProducts del DAO de Cart');
        }
    }

    async deleteAllProductsCart(idCart){
        try {
            logger.info('Ejecutando proceso de deleteAllProductsCart del DAO de Cart');
            const cart = await super.getById(idCart);
            if(!cart){
                return false
            }
            else {
                cart.products = [];
                cart.save();
                logger.debug(`Cart: ${cart}`);
                return cart;
            }
        } catch (error) {
            logger.error('Error en la ejecucion del proceso de deleteAllProductsCart del DAO de Cart');
        }
    }

    async updateAllProductsCart(idCart,newProducts){
        try {
            logger.info('Ejecutando proceso de updateAllProductsCart del DAO de Cart');
            logger.debug(`idCart: ${idCart}`);
            logger.debug(`newProducts: ${newProducts}`);
            const cart = await super.getById(idCart);
            logger.debug(`Cart: ${cart}`);
            if(!cart){
                return false
            }
            else {
                    cart.products =[];
                    cart.products.push(newProducts);
                    console.log(cart.products)
                    cart.save();
                    return cart;
                }
            
        } catch (error) {
            logger.error('Error en la ejecucion del proceso de updateAllProductsCart del DAO de Cart');
        }
    
    }

    async deleteCartProducts(idCart,idProd){
        try {
            logger.info('Ejecutando proceso de deleteCartProducts del DAO de Cart');
            logger.debug(`idCart: ${idCart}`);
            logger.debug(`idProd: ${idProd}`);
            const cart = await super.getById(idCart);
            //console.log(cart.products)
            if(!cart){
                return false
            }
            else {
                let prodCart = cart.products.find((prod)=>{
                return  String(prod.id) !== idProd;}) // Tenemos que pasar a string porque el dato que accede el find es del tipo ObjectId y no matchea con idProd
                
                logger.debug(`ProdCart: ${prodCart}`);  

                if(prodCart){
                    cart.products = [];
                    cart.products.push(prodCart);
                }else{
                    cart.products = [];
                }    
                //console.log(cart.products);
                cart.save();
                logger.debug(`Cart: ${cart}`);
                return cart;
            }
        } catch (error) {
            logger.error('Error en la ejecucion del proceso de deleteCartProducts del DAO de Cart');
        }
    }
}
