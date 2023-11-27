import { productDao } from "../daos/factory.js";
import ProductResDto from "../dto/product/product.res.dto.js";

export default class ProductRepository {
    constructor(){
        this.dao = productDao;
    }

    async getByIdDTO(id){
        try {
            const response = await this.dao.getById(id);
            const prodDto = new ProductResDto(response);
            return prodDto
        } catch (error) {
            console.log(error);
        }
    }

}