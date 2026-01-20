import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

import bodyParser from 'body-parser'

import authRoutes from './routes/authRoutes.js';

const app=express();

app.use(cors())

app.use(bodyParser.json())

app.use('/api/auth',authRoutes)

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})