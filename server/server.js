import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import env from 'dotenv';
import cookieParser from 'cookie-parser';
import adminRouter from './routers/admin.router.js'

env.config();
const app = express();

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_STRING).then(()=>{
        console.log(chalk.inverse.green("db is connected"));
    }).catch((e)=>{
        console.log(chalk.inverse.red(e));
    })
}

app.use(express.json());
app.use(cookieParser());
app.use('/api/admin', adminRouter);

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