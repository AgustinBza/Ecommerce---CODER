import mongoose from "mongoose";
import { config } from "../../../config.js";
import { logger } from "../../../logger.js";

export const initMongoDbConnection = async () =>{
    try {
        await mongoose.connect(config.MONGO_ATLAS_URL)
        logger.info('We are connected to Mongo!');
    } catch (error) {
        logger.error('Error en la ejecucion de initMongoDbConnection');
    }
}
