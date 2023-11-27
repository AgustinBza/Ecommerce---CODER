import fs from 'fs';

export default class ProductDaoFileSystem{
    
    constructor(path){
        this.path = path
    }

    async getAll(){
        try{
            if(fs.existsSync(this.path)){
                const productsJson = await fs.promises.readFile(this.path,'utf-8');
                const productsJs = JSON.parse(productsJson);
                return productsJs;
            }else{
                return [];
            }
        } catch(error) {
            console.log(error);
        }
    }

    async createProduct(prod){
        
        if(prod.status !== false){
            prod.status = true;
        }

        const product = 
        {
            id: await this.#getMaxId() +1,
            title: prod.title,
            description: prod.description,
            code: prod.code,
            price: prod.price,
            status: prod.status,
            stock: prod.stock,
            category: prod.category,
            thumbnail: prod.thumbnail
        }
        
        try{
            const prudctsFile = await this.getAll();
            prudctsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(prudctsFile));
            return product;
       }catch(error){
            console.log(error);
       }
    };

    
  async #getMaxId(){     
        let maxId = 0;       
        try{
            if(fs.existsSync(this.path)){
                const productsJson = await fs.promises.readFile(this.path,'utf-8');
                const productsJs = JSON.parse(productsJson);
                productsJs.map((product) =>{
                    if(product.id > maxId) maxId = product.id;
                });
            }

        return maxId;
            
        }catch(error){
            console.log(error);
        }
    };



    async getById(id){
        try{
            if(fs.existsSync(this.path)){
                const productFileJs =  await this.getAll();
                const product = productFileJs.find((productsaved) => {
                   return productsaved.id === Number(id);
                })
                if(product){
                    return product;
                }else{
                    console.log('Producto no encontrado');
                }
            }
        }catch(error){
            console.log(error);
        }
    };
    
    //A esta funcion se le pasa el producto completo con todos sus campos
    async updateProduct(id,object){
        try{
            if(fs.existsSync(this.path)){
                const product = await this.getById(Number(id));
                if(product){
                    const productFileJs = await this.getAll();
                    const productsFilter = productFileJs.filter(products=>
                    products.id !== Number(id))

                    const productModify = {
                        id:Number(id),
                        ...object
                    };

                    productsFilter.push(productModify);
                    await fs.promises.writeFile(this.path,JSON.stringify(productsFilter));
                    return productModify;
                }
            }           
        }catch(error){
            console.log(error);
        }
    } 

    async deleteProduct(id){
        try{
            if(fs.existsSync(this.path)){
                const product = await this.getById(Number(id));
                if(product){
                    const productFileJs = await this.getAll();
                    const productsFilter = productFileJs.filter(products =>
                    products.id !== Number(id))
                    console.log(productsFilter);
                    await fs.promises.writeFile(this.path,JSON.stringify(productsFilter));
                    console.log('Producto eliminado con exito!')
                    return true;
                }
            }
        }catch(error){
            console.log(error);
        }
    }


}
