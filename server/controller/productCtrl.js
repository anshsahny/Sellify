import Product from '../Models/Products'

const getProducts = async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}

export default getProducts