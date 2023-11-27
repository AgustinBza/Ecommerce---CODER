import multer from 'multer';
import { __dirname } from '../utils.js';
import fs from 'fs';

let fileName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      let path;
      switch (file.fieldname) {
        case 'ident':
          path =  __dirname + '/public/files/documents'
          fileName = 'Identificacion';
          break;
        case 'domicilio':
            path =  __dirname + '/public/files/documents'
            fileName = 'Comprobante_Estado_Domicilio';
        break;  
        case 'cuenta':
          path =  __dirname + '/public/files/documents'
          fileName = 'Comprobante_Estado_Cuenta';
        break;  
        case 'profile':
          path =  __dirname + '/public/files/profile'
          fileName = 'profile';
          break;
        case 'product':
          path =  __dirname + '/public/files/products'
          fileName = 'product';
          break;
      }
      if (!fs.existsSync(path)) fs.mkdirSync(path)
      cb(null,path)
    } catch (error) {
      console.log(error)
      }
    },
  filename: function (req, file, cb) {
    cb(null, fileName + '_' + req.user._id + '_' + file.originalname);
  }
})
  
export const upload = multer({ storage: storage })