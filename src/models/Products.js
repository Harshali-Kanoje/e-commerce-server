import { Schema,model } from "mongoose";

const productSchema = new Schema({
    name : String,
    price : Number,
    description : String,
    imgUrl : String,
    brand : String
})

const Products = model('Product',productSchema)

export default Products;