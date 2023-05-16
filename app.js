import express from 'express';
import userRoutes from './routes/user.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { taskRouter } from './routes/task.js';
import cors from 'cors'


// creating app from express
export const app = express();

config({
    path: './database//config.env'
})

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['process.env.FRONTEND_URL'],
    methods:['GET','POST','PUT','DELETE'],
    // credentials:true
}))




// using routers
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/task',taskRouter)

// home route
app.get('/',(req,res)=>{
    res.send("<h1>hii from express </h1>")
})
