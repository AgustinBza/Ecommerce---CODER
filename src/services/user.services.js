import Services from "./class.services.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import {userDao , productDao} from "../persistence/daos/factory.js";
import { config }  from "../config.js";
import { sendMail } from "./email.service.js";
import UserRepository from "../persistence/repository/user.repository.js";
const userRepository = new UserRepository();
import { logger } from '../logger.js';

export default class UserService extends Services {
    constructor() {
      super(userDao);
    }

    async register(user) {
      try {
        logger.info('Ejecutando servicio de registro de usuarios')
        await sendMail(user, 'register');
        return await userDao.register(user);
      } catch (error) {
        logger.error('Error en el Servicio Register');
      }
    };

    generateToken(user, exp = '10m') {
      logger.info('Ejecutando servicio de Generacion de Token')
      const payload = {
        userId: user.id,
      };
      logger.info('Generando Token')
      return sign(payload, config.SECRET_KEY, { expiresIn: exp });
    };


    
    async login(user) {
      try {
        const userExist = await userDao.login(user);
        if(userExist) return this.generateToken(userExist);
        else return false;
      } catch (error) {
        logger.error('Error en el Servicio de Login');
      }
    };


    async addProdToUserCart(userId, prodId, quantity){
      try {
        const existProd = await productDao.getById(prodId);
        logger.info('Ejecutando servicio de addProdToUserCart')
        logger.debug(`Producto: ${existProd}`);
        if(!existProd) return false;
        return userDao.addProdToUserCart(userId, prodId, quantity);
      } catch (error) {
        logger.error('Error en el Servicio de addProdToUserCart');
      }
    }

    
    async getByIdDTO(id){
      try {
          const user = await userRepository.getByIdDTO(id);
          logger.debug(`User: ${user}`);
          if(!user) return false;
          else return user;
      } catch (error) {
        logger.error('Error en el Servicio de getByIdDTO');
      }
  }

  async getAllDto(){
    try {
        const users = await userRepository.getAllDto();
        logger.info(`User: ${users}`);
        if(!users) return false;
        else return users;
    } catch (error) {
      logger.error(error);
    }
}


  async resetPass(user) {
    try {
      const token = await userDao.resetPass(user);
      if(!token) return false;
      return await sendMail(user, 'resetPass', token);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updatePass(user, pass){
    try {
      return await userDao.updatePass(user, pass);
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
