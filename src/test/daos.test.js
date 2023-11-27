import {cartDao, productDao} from '../persistence/daos/factory.js';
import {expect,assert} from 'chai';
import { initMongoDbConnection } from '../persistence/daos/mongodb/connection.js';


describe('Test unitarios de ProductDao', ()=>{
    it('Debe retornar un array con todos los productos de la base de datos', async()=>{
        const products = await productDao.getAll();
        assert.isArray(products);
        assert.isNotEmpty(products);
    });
    
    it('Debe ingresar correctamente un producto y luego buscarlo por id', async()=>{
        const prodTest = {
            title: "Product Test",
            description: "descripción del Test",
            code: "TestP",
            price: 345,
            status: true,
            stock:25,
            category:"Test"
        }
        const productAdded = await productDao.create(prodTest);
        const idProductAdded = productAdded._id
        assert.isObject(productAdded);
        assert.deepPropertyVal(productAdded,'title','Product Test');
        assert.property(productAdded,'_id');
        const product = await productDao.getById(idProductAdded);
        const idProductSearch = product._id
        assert.deepPropertyVal(product,'title','Product Test');
        assert.notStrictEqual(idProductSearch,idProductAdded);
    });
    
    it('Debe borrar un producto buscando por su id', async()=>{
        const prodTest = {
            title: "Product Test Delete",
            description: "descripción del Test Delete",
            code: "TestPD",
            price: 345,
            status: true,
            stock:25,
            category:"Test"
        }
        const productAdded = await productDao.create(prodTest);
        const idProductAdded = productAdded._id
        assert.isObject(productAdded);
        assert.deepPropertyVal(productAdded,'title','Product Test Delete');
        assert.property(productAdded,'_id');
        const product = await productDao.delete(idProductAdded);
        const idProductDeleted = product._id
        assert.deepPropertyVal(product,'title','Product Test Delete');
        assert.notStrictEqual(idProductDeleted,idProductAdded);
    });

});

describe('Test unitarios de CartDao', ()=>{
    it('Debe retornar un array con todos los carritos de la base de datos', async()=>{
        const carts = await cartDao.getAll();
        assert.isArray(carts);
        assert.isNotEmpty(carts);
    });
    
    it('Debe ingresar correctamente un carrito y luego buscarlo por id', async()=>{

        const cartAdded = await cartDao.create();
        assert.property(cartAdded,'_id');
        assert.isObject(cartAdded);
        const idCartAdded = cartAdded._id
        const cart = await cartDao.getById(idCartAdded);
        const idCartSearch = cart._id
        assert.property(cart,'_id');
        assert.notStrictEqual(idCartSearch,idCartAdded);
    });
    
    it('Debe borrar un carrito buscando por su id', async()=>{
        const cartAdded = await cartDao.create();
        assert.property(cartAdded,'_id');
        assert.isObject(cartAdded);
        const idCartAdded = cartAdded._id
        const cart = await cartDao.delete(idCartAdded);
        const idCartDeleted = cart._id
        assert.property(cart,'_id');
        assert.notStrictEqual(idCartDeleted,idCartAdded);
    });

})