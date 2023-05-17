import dotenv from 'dotenv'
import express from 'express'
import db from './database/db'

// Routes
import productRoutes from './routes/productRoutes'

dotenv.config()

const app = express()

db.on('connected', () => console.log('Connected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json())

const port = process.env.API_PORT || 8080

app.use('/api/products', productRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`))