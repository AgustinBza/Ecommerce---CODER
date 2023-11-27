import app from '../server.js';
import request from 'supertest';
import mongoose from 'mongoose';
import { initMongoDbConnection } from '../persistence/daos/mongodb/connection.js';

describe('[POST] /api/products',()=>{

    test('Creamos un Producto', async()=>{
        const prodTest = {
            title: "Product Test",
            description: "descripción del Test",
            code: "TestP",
            price: 345,
            status: true,
            stock:25,
            category:"Test"
        }
        const response = await request(app).post('/api/products').send(prodTest);
        expect(response.body.data).toHaveProperty('_id');
    })

})


describe('[DEL] /api/products',()=>{

    test('Eliminamos un Producto buscando por su Id', async()=>{
        const prodTest = {
            title: "Product Test",
            description: "descripción del Test",
            code: "TestP",
            price: 345,
            status: true,
            stock:25,
            category:"Test"
        }
        const prodAdd = await request(app).post('/api/products').send(prodTest);
        const idProdAdd = prodAdd.body.data._id;
        expect(prodAdd.body.data).toHaveProperty('_id');
        const prodDel = await request(app).del(`/api/products/${idProdAdd}`);
        //console.log(prodDel.body.data);
        const idProdDel = prodDel.body.data._id;
        expect(idProdDel).toBe(idProdAdd);
    })

})


describe('[GET-BY-ID] /api/products',()=>{

    test('Obetenemos un Producto buscando por su ID', async()=>{
        const prodTest = {
            title: "Product Test",
            description: "descripción del Test",
            code: "TestP",
            price: 345,
            status: true,
            stock:25,
            category:"Test"
        }
        const prodAdd = await request(app).post('/api/products').send(prodTest);
        const idProdAdd = prodAdd.body.data._id;
        expect(prodAdd.body.data).toHaveProperty('_id');
        const prodSearch = await request(app).get(`/api/products/${idProdAdd}`);
        //console.log(prodSearch.body.data);
        const idProdSearch = prodSearch.body.data._id;
        expect(idProdSearch).toBe(idProdAdd);
    })

})



describe('[POST] /api/carts',()=>{

    test('Creamos un Carrito', async()=>{
        const response = await request(app).post('/api/carts')
        expect(response.body.data).toHaveProperty('_id');
    })

})


describe('[DEL] /api/carts',()=>{

    test('Eliminamos un Carrito buscando por su Id', async()=>{
        const cartAdd = await request(app).post('/api/carts')
        const idCartAdd = cartAdd.body.data._id;
        expect(cartAdd.body.data).toHaveProperty('_id');
        const cartDel = await request(app).del(`/api/carts/${idCartAdd}`);
        //console.log(cartDel.body._id);
        const idCartdDel = cartDel.body._id;
        expect(idCartdDel).toBe(idCartAdd);
    })

})


describe('[GET-BY-ID] /api/carts',()=>{

    test('Obetenemos un Carrito buscando por su ID', async()=>{
        const cartAdd = await request(app).post('/api/carts')
        const idCartAdd = cartAdd.body.data._id;
        expect(cartAdd.body.data).toHaveProperty('_id');
        const cartSearch = await request(app).get(`/api/carts/${idCartAdd}`);
        //console.log(cartSearch.body.data);
        const idCartdSearch = cartSearch.body.data._id;
        expect(idCartdSearch).toBe(idCartAdd);
    })

})