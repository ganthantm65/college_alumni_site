import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

import bodyParser from 'body-parser'

import authRoutes from './routes/authRoutes.js';
import alumniProfileRoute from './routes/alumniProfileRoute.js';
import eventRoutes from './routes/eventRoutes.js';
import announcementRouter from './routes/announcementRouter.js';

const app=express();

app.use(cors())

app.use(bodyParser.json())

app.use('/api/auth',authRoutes)
app.use('/api/alumni',alumniProfileRoute)
app.use("/api/events",eventRoutes)
app.use("/api/announcement",announcementRouter)

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})