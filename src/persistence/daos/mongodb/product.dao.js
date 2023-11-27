import { ProductModel } from "./models/product.model.js";
import MongoDao from "./mongo.dao.js";
import { logger } from "../../../logger.js";

export default class ProductDaoMongo extends MongoDao{
       
        constructor() {
            super(ProductModel);
        }

        async getAll(limit = 10, sort = 0, category = 0, status = 0){
            try {
                logger.info('Ejecutando proceso de getAll del DAO de Productos');
                let statusValue;

                logger.debug(`Limit: ${limit}`);
                logger.debug(`Sort: ${sort}`);
                logger.debug(`Category: ${category}`);
                logger.debug(`Status: ${status}`);

                if(status === 'true'){
                    statusValue = true;
                }else{
                    statusValue = false;
                }  

                logger.debug(`StatusValue: ${statusValue}`);

                console.log(status);
                console.log(sort)
                if(sort !== 0){ 
                    if(sort === 'desc'){
                        const response = await ProductModel.aggregate([
                            {$limit: Number(limit)},
                            {$sort : {price: -1 }}
                        ]);
                        return response;
                    }else{    
                        const response = await ProductModel.aggregate([
                            {$limit: Number(limit)},
                            {$sort : {price: 1}}
                        ]);
                        return response;
                    }
                    
                }

                if(status !== 0){
                      if(statusValue){
                        const response = await ProductModel.aggregate([
                            {$limit: Number(limit)},
                            {$match: {status: true}}
                        ]);
                        return response;
                    }else{   
                        const response = await ProductModel.aggregate([
                            {$limit: Number(limit)},
                            {$match: {status: false}}
                        ]);
                        return response;
                    }
                    
                }

                if(category !== 0){

                    const response = await ProductModel.aggregate([
                        {$limit: Number(limit)},
                        {$match: {category: `${category}`}},
                        
                    ]);
                    return response;
                }
                    
                else{
                    const response = await ProductModel.aggregate([{$limit: Number(limit)}]);
                    return response;
                }


            } catch (error) {
                logger.error('Error en la ejecucion del proceso de getAll del DAO de Productos');
            }
        }


        async getAllLimit(limit){
            try {
                logger.info('Ejecutando proceso de getAllLimit del DAO de Productos');
                const response = await ProductModel.find({}).limit(limit);
                logger.debug(`Response: ${response}`);
                return response;
            } catch (error) {
                logger.error('Error en la ejecucion del proceso de getAllLimit del DAO de Productos');
            }
        }

        async getAllPaginate(page = 1,limit = 10){
            try {
                logger.info('Ejecutando proceso de getAllPaginate del DAO de Productos');
                const response = await ProductModel.paginate({},{page,limit})
                logger.debug(`Response: ${response}`);
                return response;
            } catch (error) {
                logger.error('Error en la ejecucion del proceso de getAllPaginate del DAO de Productos');
            }
        }
        
}