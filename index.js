import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Products from './src/models/Products.js';

const app = express();

app.use(express.json());

const PORT = 5000;

// const MONGODB_URI = 'mongodb+srv://harshalikanoje:uLmeUdQROQ3tVoyy@mongodatabase.1tz4hp4.mongodb.net/e-commerce';

const connectMongoDB = async () => {
    const connect = await mongoose.connect(process.env.MONGODB_URI);

    if(connect)
    {
        console.log("Succesfully connected with MongoDB")
    }
}
connectMongoDB();

// const productSchema = new Schema({
//     name : String,
//     price : Number,
//     description : String,
//     quantity : Number
// })

// const Products = model('Product',productSchema)

// const products = [];

app.get('/products', async (req, res) => {

    const products = await Products.find()

    res.json({
        success: true,
        data: products,
        messeage: 'successfully fetch all product'
    })
})

app.post('/product',async (req, res) => {
    const { name, price, description, brand ,imgUrl} = req.body

    const newProduct = new Products({
        name: name,
        price: price,
        description: description,
        brand: brand,
        imgUrl: imgUrl
    })

    const saveProduct = await newProduct.save();
    // products.push(product)



    if (!name) {
        return res.json({
            success: false,
            message: "Product name is required"
        })
    }

    if (!price) {
        return res.json({
            success: false,
            message: "Product price is required"
        })
    }


    if (!description) {
        return res.json({
            success: false,
            message: "Product description is required"
        })
    }

    if (!brand) {
        return res.json({
            success: false,
            message: "Product brand is required"
        })
    }

    if (!imgUrl) {
        return res.json({
            success: false,
            message: "Product imgUrl is required"
        })
    }

    res.json({
        success: true,
        data: saveProduct,
        messeage: 'successfully add new product'
    })
})

app.get('/product', async (req, res) => {

    const { name } = req.query

    const product = await Products.findOne({name : name})
    // let product = null;

    // products.forEach((prod) => {
    //     if (prod.name == name) {
    //         return product = prod
    //     }
    // })

    if (product == null) {
        res.json({
            success: false,
            messeage: 'Product not found'
        })
    }
    
    res.json({
        success: true,
        data: product,
        messeage: 'successfully fetch all product'
    })
})

// delete method to delete a particular product with id

app.delete('/product/:_id', async (req , res) => {
    const {_id} = req.params;

    const deleteProduct = await Products.deleteOne({_id : _id})

    res.json({
        success: true,
        data: deleteProduct,
        message: `Successfully deleted product with id ${_id}`
    })
})

// put method to update a particular product

app.put('/product/:_id', async (req , res) => {
    const {_id} = req.params;
    const {name , price, description, imgUrl, brand} = req.body;

    if (!name) {
        return res.json({
            success: false,
            message: "Product name is required"
        })
    }

    if (!price) {
        return res.json({
            success: false,
            message: "Product price is required"
        })
    }


    if (!description) {
        return res.json({
            success: false,
            message: "Product description is required"
        })
    }

    if (!brand) {
        return res.json({
            success: false,
            message: "Product brand is required"
        })
    }

    if (!imgUrl) {
        return res.json({
            success: false,
            message: "Product imgUrl is required"
        })
    }

    await Products.updateOne({_id: _id}, {$set:{
        name: name,
        price: price,
        description: description,
        imgUrl: imgUrl,
        brand: brand
    
    }})

    const updateProduct = await Products.findOne({_id: _id})

    res.json({
        success:true,
        data:updateProduct,
        message: "succesfully updated product"
    })
})


app.patch('/product/:_id', async (req , res) => {
    const {_id} = req.params;
    const {name , price, description, imgUrl, brand} = req.body;

    const product = await Products.findById(_id)

    if(name)
    {
        product.name = name
    }

    if(price)
    {
        product.price = price
    }

    if(description)
    {
        product.description = description
    }

    if(imgUrl)
    {
        product.imgUrl = imgUrl
    }

    if(brand)
    {
        product.brand = brand
    }

    const updatedProduct = await product.save();
    // const saveProduct = await newProduct.save();

    res.json({
        success:true,
        data:updatedProduct,
        message: "succesfully updated product"
    })
})


app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});