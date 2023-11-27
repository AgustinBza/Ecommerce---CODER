import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));
import MongoStore from 'connect-mongo';
import { config } from "./config.js";
import { fakerES as faker } from '@faker-js/faker';

import {hashSync,compareSync,genSaltSync} from 'bcrypt';

/**
 * Método que recibe password sin hashear y retorna password hasheada
 * @param {*} password string
 * @returns password hasheada -> string
 */
export const createHash = (password)=> hashSync(password, genSaltSync(10));

/**
 * Método que compara password hasheada con password de login
 * @param {*} user -> Objeto usuario
 * @param {*} password string
 * @returns boolean
 */
export const isValidPassword = (user, password) => compareSync(password, user.password);


export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ data });
  };
  

export const generateProduct = async () => {
  return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(), 
      code: faker.commerce.isbn(10),
      price: faker.commerce.price(),
      status: true,
      stock: faker.number.int({ max: 200 }),
      category: faker.commerce.department()
  };
}



export const errorDictionary = {
  ITEMS_NOT_FOUND: 'Items Not Found',
  ITEM_NOT_FOUND: 'Item not Found',
  CREATE_ERROR: 'Create Error',
  SERVER_ERROR: 'Server Error',
  LOGIN_ERROR: 'User Module Error: Login Error',
  DELETE_PRODUCT_ERROR: 'Product Module Error: Cant Delete the product',
  DELETE_PRODUCT_ERROR_OWNER: 'Product Module Error: The Product was not created by the user, you cannot execute the deletion process',
  REGISTER_ERROR: 'User Module Error: User already exists',
  USER_ERROR_ADD_PRODUCT: 'User Module Error: Error add product to user cart',
  USER_RESET_PASS_ERROR: 'User Module Error: Email not sent',
  TOKEN_EXPIRED: 'User Module Error: Tken expired',
  ADD_CART_PRODUCT_ERROR: 'Carts Module Error: Cant Add Prodcut',
  DELETE_CART_PRODUCT_ERROR: 'Carts Module Error: Cant Delete the Product',
  ADD_QUANTITY_ERROR: 'Carts Module Error: Cant Add Quantity',
  DELETE_ALL_CART_PRODUCT_ERROR: 'Carts Module Error: Cant Delete All Products',
  UPDATE_ALL_CART_PRODUCT_ERROR: 'Carts Module Error: Cant Update the Products'
}

const github = 'Hola';