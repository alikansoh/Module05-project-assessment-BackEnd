import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  price: { //add currency to price later
    type: Number,
    required: true,
  },
  image: { //might make required false
    type: String,
  },
  
}, {timestamps: true,});

const Product = model('Product', ProductSchema);

export default Product;