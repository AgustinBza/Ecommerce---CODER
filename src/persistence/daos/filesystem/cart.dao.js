import fs from 'fs';

export default class CartDaoFileSystem{
    constructor (path){
        this.path = path;
    }

    async getCarts(){
        try{
            if(fs.existsSync(this.path)){
                const cardFile = await fs.promises.readFile(this.path,'utf-8');
                const cardFileJs = JSON.parse(cardFile);
                return cardFileJs;
            }else{
                return []
            }
        }catch(error){
            console.log(error);
        }
    }


    async getCartsById(id){
        try{
            const cartFile = await this.getCarts();
            if(cartFile){
                const cartSearch = cartFile.find((cart)=>{
                   return cart.id === Number(id);
                })
                return cartSearch;
            }else{
                console.log("Cart not found");
            }
        }catch(error){
            console.log(error);
        }
    }

    async #getMaxId(){
        let maxId = 0
        try{
            const cartFile = await this.getCarts();
             cartFile.map((cart) =>{
                 if(cart.id > maxId) maxId = cart.id;
             });
            return maxId;
        }catch(error){
            console.log(error);
        }
    }

    async addCart(){
        try{   
            const cart = {
                id:  await this.#getMaxId() + 1,
                products: []
            }
            const cartFile = await this.getCarts();
            cartFile.push(cart);
            await fs.promises.writeFile(this.path,JSON.stringify(cartFile));
            return cartFile;
        }catch(error){ 
            console.log(error);
        }
    }

    async addCartProducts(idCart,prodId){
        try{
            const cartSearch = await this.getCartsById(Number(idCart));

            if(cartSearch){
                const filterCartFile = await this.cartFilter(Number(idCart));
                let prodCart = cartSearch.products.find((prod)=>{
                    return  prod.product === Number(prodId);})

                if(prodCart){
                    prodCart.quantity =  prodCart.quantity + 1;
                }else{
                    const newProd = {
                                        product: Number(prodId),
                                        quantity:1
                                    }
                    cartSearch.products.push(newProd);
                }
                filterCartFile.push(cartSearch);
                await fs.promises.writeFile(this.path,JSON.stringify(filterCartFile));
                return cartSearch;
            }else{
                console.log('Nonexistent Cart');
            }

        }catch(error){
            console.log(error);
        }
    }

    async cartFilter(idCart){
        try{
            const cartFile = await this.getCarts();
            const filterCartFile = cartFile.filter(cart =>cart.id !== idCart)
            return filterCartFile;
        }catch(error){
            console.log(error);
        }
    }

}