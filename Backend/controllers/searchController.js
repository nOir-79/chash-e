exports.getProducts = async (req,res) =>{
    const search = req.params.word

    if(search){
        try{
            const products = await Random.find({word:{$regex:search, $options:"i"}})

            if(products)
                return res.status(200).send({products})
            else{
                return res.status(401).send('No product found')
            }
        }catch(error)
        {
            console.error(error)
            return res.status(500).send('Internal Server error')
        }
    }
}