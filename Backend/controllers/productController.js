const Product = require('../models/products')


//API ENDPOINT FOR ADDING A PRODUCT
exports.addProduct = async(req,res)=>{
    const{name,images,location,quantity,price,details,seller,category,availability} = req.body

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
            details:details,
            seller:seller,
            category:category,
            availability:availability
        })

        const createdProduct = await product.save()
        console.log('CreatedProduct:',createdProduct)

        return res.status(200).send('Product added')
    }catch(error){
        console.error(error)
        return res.status(400).send('Internal Server Error')
    }
}


//API ENDPOINT FOR GETTING A SINGLE PRODUCT
exports.getProduct = async(req,res) =>{
    const productId = req.params.id
    console.log("user:",req.user.user)

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

//API ENDPOINT FOR GETTING ALL THE PRODUCT
exports.getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find()

        return res.status(200).send(products)
    }catch(error){
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}


//API ENDPOINT TO GET ALL THE PRODUCTS OF A SELLER

exports.getProductForSeller = async(req,res) =>{
    try{
        const sellerId = req.params.sellerId
        if(!sellerId){
            console.log('Need a seller id')
            res.status(404).send('You need to provide a seller id')
        }

        const sellerProducts = await Product.find({seller:sellerId})
        console.log("seller products:",sellerProducts)
        if(!sellerProducts){
            console.log(`No product with id: ${sellerId}`)
            res.status(408).send(`No product with id: ${sellerId}`)
        }

        return res.status(200).send(sellerProducts)
    }catch(error){
        console.error(error)
        return res.status(500).send("Internal server error")
    }
}

//API ENDPOINT TO UPDATE A PRODUCT BY ID

exports.updateProduct = async(req,res)=>{
    try{
        const productId = req.body.productId
        const updateData = req.body.updateData
        const updatedProduct = await Product.findByIdAndUpdate(productId,updateData,{new:true})

        if(!updatedProduct){
            console.log(`There is not product with id: ${productId}`)
            return res.status(405).send(`There is no product with id: ${productId}`)
        }

        return res.status(200).send(updatedProduct)
    }catch(error){
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}


//API ENDPOINT TO DELETE A PRODUCT BY ID

exports.deleteProduct = async(req,res) =>{
    try{
        const productId = req.params.productId
        if(!productId){
            console.log('Need a product id')
            res.status(404).send('You need to provide a product id')
        }

        const deletedProduct = await Product.findByIdAndDelete(productId)

        if(!deletedProduct){
            console.log(`No product with id: ${productId}`)
            res.status(406).send(`No product with id: ${productId}`)

        }

        return res.status(200).send("Product Deleted")
    }catch(error){
        console.error(error)
        return res.status(500).send("Internal server error")
    }
}


//API ENDPOINT TO IMPLEMENT ADVANCED SEARCH AND FILTERS

exports.filterProducts = async(req,res)=>{
    try{

        const{priceHigh,priceLow,category,location,availability} = req.body

        const queryString = {}
        if(priceHigh != "" && priceLow != ""){
            const priceObject = {};
            priceObject['$lt'] = priceHigh;
            priceObject['$gt'] = priceLow;
            queryString['price'] = priceObject
        }

        if(category != ""){
            const categoryObject = {}
            categoryObject['$in']= category
            queryString['category'] = categoryObject
        }

        if(location != ""){
            queryString['location'] = location
        }

        queryString['availability'] = availability

        const products = await Product.find(queryString)
        
        return res.status(200).send(products)

    }catch(error){
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}