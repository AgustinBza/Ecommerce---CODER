export default class ProductResDto {
    constructor(product) {
        this.product_name = product.title,
        this.product_description = product.description,
        this.product_code = product.code,
        this.product_price = product.price,
        this.product_stock = product.stock,
        this.product_status = product.status,
        this.product_category = product.category
    }
};