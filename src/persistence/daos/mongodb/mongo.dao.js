import { logger } from "../../../logger.js";

export default class MongoDao {
    constructor(model) {
      this.model = model;
    }
  
    async getAll() {
      try {
        logger.info('Ejecturando el proceso de getAll del DAO Padre ');
        const response = await this.model.find({});
        logger.debug(`Response del Proceso de getAll del DAO Padre: ${response}`);
        logger.info('Finalizacion de la ejecucion el proceso de getAll del DAO Padre ');
        return response;
      } catch (error) {
        logger.error('Error en la ejecucion del proceso de getAll del DAO Padre');
      }
    }
  
    async getById(id) {
      try {
        logger.info('Ejecturando el proceso de getById del DAO Padre ');
        const response = await this.model.findById(id);
        logger.debug(`Response del Proceso de getById del DAO Padre: ${response}`);
        logger.info('Finalizacion de la ejecucion el proceso de getById del DAO Padre ');
        return response;
      } catch (error) {
        logger.error('Error en la ejecucion del proceso de getById del DAO Padre');
      }
    }
  
    async create(obj) {
      try {
        logger.info('Ejecturando el proceso de Create del DAO Padre ');
        const response = await this.model.create(obj);
        logger.debug(`Response del Proceso de Create del DAO Padre: ${response}`);
        logger.info('Finalizacion de la ejecucion el proceso de Create del DAO Padre ');
        return response;
      } catch (error) {
        logger.error('Error en la ejecucion del proceso de create del DAO Padre');
      }
    }
  
    async update(id, obj) {
      try {
        logger.info('Ejecturando el proceso de update del DAO Padre ');
        await this.model.updateOne({ _id: id }, obj);
        logger.debug(`Response del Proceso de update del DAO Padre: ${obj}`);
        logger.info('Finalizacion de la ejecucion el proceso de update del DAO Padre ');
        return obj;
      } catch (error) {
        logger.error('Error en la ejecucion del proceso de update del DAO Padre');
      }
    }
  
    async delete(id) {
      try {
        logger.info('Ejecturando el proceso de delete del DAO Padre ');
        const response = await this.model.findByIdAndDelete(id);
        logger.debug(`Response del Proceso de delete del DAO Padre: ${response}`);
        logger.info('Finalizacion de la ejecucion el delete de update del DAO Padre ');
        return response;
      } catch (error) {
        logger.error('Error en la ejecucion del proceso de delete del DAO Padre');
      }
    }
  }
  