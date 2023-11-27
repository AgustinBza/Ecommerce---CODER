import Services from "./class.services.js";
import { ticketDao, userDao, productDao, cartDao } from "../persistence/daos/factory.js";
import { logger } from '../logger.js';

export default class TicketService extends Services {
    constructor(){
        super(ticketDao)
    }

    async generateTicket(userId){
        try {
            logger.info('Ejecutando servicio generateTicket');
            const user = await userDao.getById(userId);
            logger.debug(`User: ${user}`);
            if(!user) return false;
            const userCart = await cartDao.getById(String(user.carts));
            logger.debug(`UserCart: ${userCart}`);
            if(!userCart) return false;
            let amountAcc = 0;
            console.log(userCart);
            for (const prod of userCart.products) {
                const idProd = prod.id;
                logger.debug(`Prod id: ${idProd}`);
                const prodDB = await productDao.getById(idProd);
                logger.debug(`ProdDB: ${prodDB}`);
                if(prod.quantity <= prodDB.stock){
                    const amount = prod.quantity * prodDB.price;
                    amountAcc += amount;
                    prodDB.stock = prodDB.stock - prod.quantity;
                    prodDB.save();
                }
            }
            const ticket = await ticketDao.create({
                code: `${Math.random()}`,
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email
            });
            logger.debug(`Ticket: ${ticket}`);
            userCart.products = [];
            userCart.save();
            return ticket;
        } catch (error) {
            logger.error('Error en el Servicio generateTicket');
        }
    }
}