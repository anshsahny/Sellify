import express from 'express'
import getProducts from '../controller/productCtrl'

const productRoutes = express.Router()

productRoutes.get('/', getProducts)

export default productRoutes