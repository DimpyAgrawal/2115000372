const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const path = require('path');

require('./models/user');
const router =  require('./routes/auth');
const applicat = require('./routes/router')

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true}));

const port  = process.env.PORT||8080;

mongoose.connect(`mongodb+srv://dimpy:${process.env.DB_PASSWORD}@cluster0.glj5682.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('database is connected');
}).catch(err =>{
    console.log('Connection error', err.message);
})

app.use('/auth',router);
app.use('/',applicat);


const server = app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
   
})
