import express from 'express'

const app = express();

app.use(express.json());

const PORT = 5000;

const products = [];

app.get('/products', (req, res) => {

    res.json({
        success: true,
        data: products,
        messeage: 'successfully fetch all product'
    })
})

app.post('/product', (req, res) => {
    const { name, price, description, quantity } = req.body

    const product = {
        name: name,
        price: price,
        description: description,
        quantity: quantity
    }

    products.push(product)

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

    if (!quantity) {
        return res.json({
            success: false,
            message: "Product quantity is required"
        })
    }

    res.json({
        success: true,
        data: product,
        messeage: 'successfully add new product'
    })
})

app.get('/product', (req, res) => {

    const { name } = req.query
    let product = null;

    products.forEach((prod) => {
        if (prod.name == name) {
            return product = prod
        }
    })

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

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});