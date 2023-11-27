import ProductService from "../services/product.services.js";
import UserDao from "../persistence/daos/mongodb/user.dao.js";
import { logger } from "../logger.js";
logger
const userDao = new UserDao();
const prodService = new ProductService();

export const register = (req, res) => {
    res.render('register')
};

export const errorRegister = (req, res) => {
    res.render('errorRegister')
};

export const login = (req, res) => {
    res.render('login')
};

export const errorLogin = (req, res) => {
    res.render('errorLogin')
};

export const profile = (req, res) => {
    res.render('profile')
    console.log(req.session);
};

export const newpass = (req, res) => {
    res.render('new-pass')
    console.log(req.session);
};


export const homeProducts = async (req,res) => {
        try{
            const products = await prodService.getAll();
            const user = await userDao.getById(req.user);
            const nombre = user.first_name;
            const email = user.email;
            const role = user.role;
            console.log(user);
            res.render('home',{products,nombre,email,role});
        }catch(error){
            res.status(500).json({message:error.message});
        }    
}


export const loggerTest = (req, res) => {
    logger.silly('Logueo SILLY');
    logger.debug('Logueo DEBUG');
    logger.verbose('Logueo VERBOSE');
    logger.http('Logueo HTTP');
    logger.info('Logueo INFO');
    logger.warn('Logueo WARN');
    logger.error('Logueo ERROR');
    res.status(200).json({message:'LoggerTest'});
};


