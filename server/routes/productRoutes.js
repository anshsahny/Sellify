import express from 'express'
import { getProducts, getProduct } from '../controller/productCtrl'
const productRoutes = express.Router()

productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProduct)

export default productRoutes