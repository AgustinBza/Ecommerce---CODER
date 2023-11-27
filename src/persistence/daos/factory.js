import ProductDaoMongo from "./mongodb/product.dao.js";
import UserDaoMongo from "./mongodb/user.dao.js";
import TicketDaoMongo from "./mongodb/ticket.dao.js";
import CartDaoMongo from "./mongodb/cart.dao.js"
import { initMongoDbConnection } from './mongodb/connection.js';
import { config } from "../../config.js";
import { logger } from "../../logger.js";

let userDao;
let productDao;
let cartDao;
let ticketDao;
let persistence = config.PERSISTENCE;

logger.info(`Persistence: ${persistence}`);

switch (persistence) {
  case "file":
    console.log(persistence);
    break;
  case "MONGO":
    await initMongoDbConnection();
    userDao = new UserDaoMongo();
    productDao = new ProductDaoMongo();
    ticketDao = new TicketDaoMongo();
    cartDao = new CartDaoMongo();
    break;
  case "mysql":
    await initMySqlDB();
    break;
  default:
    persistence = "file";
    break;
}

export { productDao , userDao , cartDao , ticketDao };
