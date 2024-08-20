const Product = require('../models/products')

exports.addProduct = async(req,res)=>{
    const{name,images,location,quantity,price,details} = req.body

    if(!name || !quantity || !price)
    {
        return res.status(400).send('Information Missing')
    }

    try{
        const product = new Product({
            name:name,
            images:images,
            location:location,
            quantity:quantity,
            price:price,
            details:details
        })

        await product.save()

        return res.status(200).send('Product added')
    }catch(error){
        console.error(error)
        return res.status(400).send('Internal Server Error')
    }
}

exports.getProduct = async(req,res) =>{
    const productId = req.params.id

    if(!productId)
        return res.status(500).send('Give a product id')

    try{
        const product = await Product.findById(productId)

        if(!product){
            return res.status(400).send('The product is not found')
        }

        return res.status(200).send(product)
    }catch(error){
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}