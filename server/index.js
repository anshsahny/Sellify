import dotenv from 'dotenv'
import express from 'express'
import db from './database/db'

// Routes
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'

dotenv.config()

const app = express()

db.on('connected', () => console.log('Connected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json())

const port = process.env.API_PORT || 8080

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`))