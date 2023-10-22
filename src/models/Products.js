import { Schema,model } from "mongoose";

const productSchema = new Schema({
    name : String,
    price : Number,
    description : String,
    quantity : Number
})

const Products = model('Product',productSchema)

export default Products;