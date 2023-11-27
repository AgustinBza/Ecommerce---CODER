import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { createResponse, errorDictionary } from "../utils.js";
import { logger } from '../logger.js';
import { sendMail } from "../services/email.service.js";
const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }


    register = async(req, res,next) => {
        try {
          const newUser = await userService.register(req.body);
          if(!newUser) createResponse(res, 404, {msg:errorDictionary.REGISTER_ERROR});
          else createResponse(res, 200, newUser);
        } catch (error) {
            next(error.message);
        }
    };

    login = async (req, res, next) => {
        try {
          const token = await userService.login(req.body);
          if(!token) createResponse(res, 404, {msg:errorDictionary.LOGIN_ERROR});
          logger.info('Token Generado');
          res.header("Authorization", token);
          logger.info('Logeo exitoso!');
          createResponse(res, 200, token);
          //res.redirect('/api/session/current');
        } catch (error) {
          next(error.message);
        }
      };


    logout = async(req, res) => {
        try {
            req.session.destroy((err) => {
                if(!err) res.render('logout');
                else res.json({ msg: err });
            })
        } catch (error) {
                console.log(error);
        }
    }


      async addProdToUserCart(req, res, next){
        try {
          const { _id } = req.user;
          const { idProd } = req.params;
          const { quantity } = req.params;
          const newProdToUserCart = await userService.addProdToUserCart(_id, idProd, Number(quantity));
          if(!newProdToUserCart) {
            createResponse(res, 404,{msg: errorDictionary.USER_ERROR_ADD_PRODUCT});
          }
          else createResponse(res, 200, newProdToUserCart);
        } catch (error) {
          next(error.message);
        }
      }

      async getByIdDTO(req, res, next) {
        try {
          const { id } = req.params;
          const item = await userService.getByIdDTO(id);
          if (!item)
            createResponse(res, 404, {
              msg: errorDictionary.ITEM_NOT_FOUND
            });
          else createResponse(res, 200, item);
        } catch (error) {
          next(error.message);
        }
      }


      async getAllDto(req, res, next) {
        try {
          const users = await userService.getAllDto();
          if (!users)
            createResponse(res, 404, {
              msg: errorDictionary.ITEM_NOT_FOUND
            });
          else createResponse(res, 200, users);
        } catch (error) {
          next(error.message);
        }
      }

      async resetPass(req, res, next){
        try {
          const user = req.user;
          const tokenResetPass = await userService.resetPass(user);
          if(!tokenResetPass) {
            createResponse(res, 404,{msg: errorDictionary.USER_RESET_PASS_ERROR});
          }
          else{
            res.cookie('tokenpass', tokenResetPass)
            createResponse(res, 200, {msg:'PassReseteada'});
          }
        } catch (error) {
          next(error.message)
        }
      }
    
      async updatePass(req, res, next){
        try {
          const user = req.user;
          const { password } = req.body;
          logger.info(user);
          logger.info(password);
          // console.log(req.cookies);
          const { tokenpass } = req.cookies;
          if(!tokenpass) return createResponse(res, 200, {msg:errorDictionary.TOKEN_EXPIRED});
          const updPass = await userService.updatePass(user, password);
          logger.info(updPass);
          if(!updPass) return logger.info(res, 'Password not found');
          res.clearCookie('tokenpass');
          createResponse(res, 200, {msg:'Password Actualizada'});
        } catch (error) {
          next(error.message);
        }
      }


      documentUpload = async (req,res,next)=>{
        const files = req.files;
        const user = await userService.getById(req.user._id);
        console.log(user);
        
        if(files.ident){
            const fileIdent = {
                name: 'Identificacion',
                reference: files.ident[0].path
            }
            user.documents.push(fileIdent);
            logger.info('Identificacion cargada')
        }
        
        if(files.domicilio){
            const fileDomi = {
                name: 'Comprobante de Domicilio',
                reference: files.domicilio[0].path
            }
            user.documents.push(fileDomi);
            logger.info('Comprobante de Domicilio cargado')
        }
        
        if(files.cuenta){
            const fileCuenta = {
                name: 'Comprobante de Estado de Cuenta',
                reference: files.cuenta[0].path
            }
            user.documents.push(fileCuenta);
            logger.info('Comprobante de Estado Cuenta cargado')
        }
        user.save();
        return res.status(200).end();
    }

    updatePremium = async(req,res,next)=>{
      const {idUser} = req.params;
      let validateDoc = false;
      const user = await userService.getById(idUser);
      const userDocs = user.documents
      let validateIdent;
      let validateDom;
      let validateCuenta;
      if(!user) {
        createResponse(res, 404,{msg: errorDictionary.USER_RESET_PASS_ERROR});
      }
      else{
        console.log(userDocs)
        for (let index = 0; index < userDocs.length; index++) {
          let doc = userDocs[index].name;
            if(doc == 'Identificacion'){
              validateIdent = true
            }
            else if(doc == 'Comprobante de Domicilio'){
              validateDom = true
            } 
            else if(doc == 'Comprobante de Estado de Cuenta'){
              validateCuenta = true
            }
        }
        if(validateIdent == true && validateDom == true && validateCuenta == true ){
          validateDoc = true;
          user.role = 'premium';
          user.save();
          createResponse(res, 200, {msg:'Documentacion correcta ¡Felicitaciones, ya eres Premium!'});
        }else{
          createResponse(res, 404,{msg: 'La documentacion no esta completa'});
        }
      }
    }


  deleteUsers = async(req,res,next) => {

      try {
        const dateNow = new Date();
        let dateUser;
        let difference;
        let diasDif;
        const usersDeletedArray = [];
        const response = await userService.getAll();
        response.forEach( async userData => {
          dateUser = userData.last_connection;
          logger.info(userData.first_name)
          difference = dateUser.getTime() - dateNow.getTime();
          diasDif = (Math.round(difference/ (1000*60*60*24)) * -1)
          if(diasDif >= 2){
              sendMail(userData,'delete');
              console.log(String(userData._id))
              const userDeleted = await userService.delete(String(userData._id))
              usersDeletedArray.push(userData.email)
          }
        })
        createResponse(res, 200, {msg:usersDeletedArray});
        ;
    } catch (error) {
        logger.error(error);
    }
  }

}
