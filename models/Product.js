import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;



// import { model, models, Schema } from "mongoose";

// const ProductSchema = new Schema ({
//     title: {type: String, required: true},
//     description: String,
//     price: {type: Number, required: true}
// })


// export const Product = model('Product', ProductSchema)
// module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);
// mongoose.models.Product ?? mongoose.model('Product', ProductSchema)
