const express = require('express');
const app = express();
const cors=require('cors');

app.use(express.urlencoded({extended:true}));
const path=require('path');
app.use('/',express.static(path.join(__dirname,'public')))
app.use(cors());
const dotenv=require('dotenv');
dotenv.config();
app.use(
    express.json()
);

app.listen(3000,()=>{
    console.log('server listening on port 3000');
})


const mongoose = require('mongoose');
const url="mongodb://127.0.0.1:27017/keshvi";

mongoose.connect(url)
const con=mongoose.connection;
con.on('open',()=>{
    console.log('database connection established');
})


const routes = require("./routes/routes");

app.use('/api',routes);


const ejs=require('ejs');
app.set("view engine", "ejs")











