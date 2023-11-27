import { productDao } from "../persistence/daos/factory.js";
import Services from "./class.services.js";
import '../utils.js';
import { generateProduct } from "../utils.js";
import { logger } from '../logger.js';

export default class ProductService extends Services {
    constructor() {
        super(productDao);
    }

    getAll = async (limit = 10, sort = 0, category = 0, status = 0) => {
        try {
            logger.info('Ejecturando el Servicio getAll');
            const response = await productDao.getAll(limit,sort,category,status)
            logger.info('Servicio getAll ejectuado exitosamente');
            return response;
        } catch (error) {
            logger.error('Error en el Servicio getAll');
        }
    }

    getAllLimitService = async(limit) => {
        try {
            logger.info('Ejecturando el Servicio getAllLimitService');
            const response = await productDao.getAllLimit(limit);
            logger.info('Servicio createProductsMock ejectuado exitosamente');
            return response;
        } catch (error) {
            logger.error('Error en el Servicio getAllLimitService');
        }
    }

    getAllPaginate = async(page,limit) => {
        try {
            logger.info('Ejecturando el Servicio getAllPaginate');
            const response = await productDao.getAllPaginate(page,limit);
            logger.info('Servicio createProductsMock ejectuado exitosamente');
            return response;
        } catch (error) {
            logger.error('Error en el Servicio getAllPaginate');
        }
    }

    createProductsMock = async() =>{
        try {
            logger.info('Ejecturando el Servicio createProductsMock');
            const cant = 100
            const products = [];
            for(let i = 0 ; i < cant ; i++ ){
                const product = await generateProduct();
                products.push(product);
            }
            logger.info('Servicio createProductsMock ejectuado exitosamente');
            return products;
        } catch (error) {
            logger.error('Error en el Servicio createProductsMock');
        }
    }

}