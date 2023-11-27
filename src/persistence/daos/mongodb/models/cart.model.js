import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:[{
        id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity:{type:Number},
        _id:false
        }]
});


export const CartModel = mongoose.model('carts',cartSchema);

