import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default:0
    },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    carts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'carts',
          default: []
        }
      ],
    documents:[
        {
            name:{
                type: String
            },
            reference:{
                type: String
            },
            _id: false
        },
   
    ],
    last_connection: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

export const UserModel = model('userscollection', userSchema);