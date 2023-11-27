import { createResponse,errorDictionary } from "../utils.js";

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll();
      if (!items)
      createResponse(res, 404, {
        msg: errorDictionary.ITEMS_NOT_FOUND
      });
      createResponse(res, 200, items);
    } catch (error) {
      res.status(501).send(error.message);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        createResponse(res, 404, {
          msg: errorDictionary.ITEM_NOT_FOUND
        });
      else createResponse(res, 200, item);
    } catch (error) {
      res.status(501).send(error.message);
    }
  };

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body);
      if (!newItem)
        createResponse(res, 404, {
          msg: errorDictionary.CREATE_ERROR
        });
      else createResponse(res, 200, newItem);
    } catch (error) {
      res.status(501).send(error.message);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        createResponse(res, 404, {
          msg: errorDictionary.ITEM_NOT_FOUND
        });
      else {
        const itemUpd = await this.service.update(id, req.body);
        createResponse(res, 200, itemUpd);
      }
    } catch (error) {
      res.status(501).send(error.message);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item)
        createResponse(res, 404, {
          msg: errorDictionary.ITEM_NOT_FOUND
        });
      else {
        const itemDel = await this.service.delete(id);
        createResponse(res, 200, itemDel);
      }
    } catch (error) {
      res.status(501).send(error.message);
    }
  };
}
