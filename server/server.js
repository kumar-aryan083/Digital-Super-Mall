import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import env from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRouter from './routers/admin.router.js'
import commonRouter from './routers/common.router.js'

env.config();
const app = express();

const corsAllow = {
    origin: 'http://localhost:5173',
    methods: 'POST, GET, PUT, DELETE, PATCH, HEAD',
    credentials: true
}
const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_STRING).then(()=>{
        console.log(chalk.inverse.green("db is connected"));
    }).catch((e)=>{
        console.log(chalk.inverse.red(e));
    })
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsAllow));
app.use('/api/admin', adminRouter);
app.use('/api/common', commonRouter);

app.get('/', (req, res)=>{
    res.send("server is running fine.")
});

app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log(chalk.inverse.yellow(`server is live on port ${process.env.PORT}`));
        dbConnection();
    }else{
        console.log(chalk.inverse.red("error in listening server"));
    }
});