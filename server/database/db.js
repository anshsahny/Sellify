import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})

const db = mongoose.connection

export default db