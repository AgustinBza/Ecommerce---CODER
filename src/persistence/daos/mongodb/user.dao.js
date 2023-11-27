import MongoDao from "./mongo.dao.js";
import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js";
import { cartDao } from "../factory.js";
import jwt from 'jsonwebtoken';
import { logger } from "../../../logger.js";
import { config } from "../../../config.js";
import { upload } from '../../../middlewares/multer.js';

export default class UserDaoMongo extends MongoDao {
    
    constructor(){
        super(UserModel)
    }
    
    async register(user) {
        try {
            logger.info('Ejecutando proceso de Registro del DAO de Usuarios');
            const { email } = user;
            logger.debug(`email: ${email}`);
            const existUser = await this.model.findOne({ email });
            logger.debug(`existUser: ${existUser}`);
            logger.debug(`User.Password: ${user.password}`);

            if(existUser === null) {
                const newCart = await cartDao.create();
                const newUser =  await this.model.create({
                  ...user,
                  password: createHash(user.password),
                  carts: newCart
              });
                logger.debug(`NewUser: ${newUser}`);
                return newUser;
            } else return false;
        } catch (error) {
          logger.error('Error en la ejecucion del Proceso de Registro del DAO de Usuarios');
        }
    };

    async login(user) {
        try {
            logger.info('Ejecutando proceso de Login del DAO de Usuarios');
            const { email, password } = user;
            logger.debug(`Email: ${email}`);
            logger.debug(`Password: ${password}`);
            const userExist = await this.model.findOne({ email });
            logger.info(`UserExist: ${userExist}`);
            if(userExist) {
              const passValid = isValidPassword(userExist, password);
              if(!passValid){
                return false;
              } 
              else{
                // Cada vez que el usuario loguea, su propiedad last_connection se actualiza
                const users = await this.getAll()
                logger.info(`Users: ${users}`);
                let user = users.find((userSelected)=>{
                return  userSelected.email === email;})
                if(user){
                  user.last_connection = Date.now();
                  logger.info(`Last_Connection: ${user.last_connection}`);
                }
                user.save();
                return userExist;
              } 
          } return false;
        } catch (error) {
          logger.error('Error en la ejecucion del Proceso de Login del DAO de Usuarios');
        }
    };


    
      async getByEmail(email){
        try {
          logger.info('Ejecutando proceso de getByEmail del DAO de Usuarios');
          const userExist = await this.model.findOne({email}); 
          // console.log(userExist);
          if(userExist) return userExist
          else return false
        } catch (error) {
          logger.error('Error en la ejecucion del Proceso de GetByEmail del DAO de Usuarios');
        }
      }

      async addProdToUserCart(userId, prodId, quantity){
        try {
            logger.info('Ejecutando proceso de addProdToUserCart del DAO de Usuarios');
            const user = await this.model.findById(userId);
            if(!user) return false;
            const cartId = String(user.carts);
            const cart = await cartDao.addCartProducts(cartId,prodId,quantity);
            return cart;
        } catch (error) {
          logger.error('Error en la ejecucion del Proceso de addProdToUserCart del DAO de Usuarios');
        }
      }

      async generateToken(user, timeExp) {
        const payload = {
          userId: user._id
        };
        const token = jwt.sign(payload, config.SECRET_KEY, {
          expiresIn: timeExp,
        });
        return token;
      }
    

      async resetPass(user){
        try {
         const { email } = user;
         const userExist = await this.getByEmail(email);
         if(!userExist) return false; 
         logger.info('Password reseteada');
         return this.generateToken(userExist, '1h');
        } catch (error) {
          logger.error('Error en la ejecucion del Proceso de resetPass del DAO de Usuarios');
        }
      };
    
      async updatePass(user, pass){
        try {
          logger.info('Ejecturando proceso updatePass del UserDao');
          const isEqual = isValidPassword(user, pass);
          logger.debug(user);
          if(isEqual) return false;
          logger.debug(user);
          logger.debug(pass);
          const newPass = createHash(pass);
          logger.info('Password Actualizada');
          return await this.update(user._id, { password: newPass });
        } catch (error) {
          logger.error(error);
        }
      }
}
