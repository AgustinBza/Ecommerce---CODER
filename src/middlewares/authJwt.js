import pkg from 'jsonwebtoken';
const { verify } = pkg;
import UserDaoMongo from '../persistence/daos/mongodb/user.dao.js';
const userDao = new UserDaoMongo();
import { config } from '../config.js';
import UserService from '../services/user.services.js';
const userService = new UserService();
import { logger } from '../logger.js';


export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    const decode = verify(token, config.SECRET_KEY);
    console.log("TOKEN DECODIFICADO");
    console.log(decode);
    const user = await userDao.getById(decode.userId);
    if (!user) return res.status(400).json({ msg: "Unauthorized" });

    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    const tokenExp = decode.exp; // Expiracion del token
    const timeOutUntilExp = tokenExp - now; // Tiempo hasta la expiracion del token

    if(timeOutUntilExp <= 300){ // Si faltan menos de 5 min para que expire el token, se renueva
      const newToken = userService.generateToken(user,'15m'); // Renovamos el token por 15min mas
      logger.info('Token Actualizado');
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
