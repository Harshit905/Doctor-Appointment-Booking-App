const express=require('express');
// var cors = require("cors");
const app=express();
require('dotenv').config()
const port= process.env.PORT || 5000;

const connectToMongo = require('./config/dbconfig');
connectToMongo();
// app.use(cors())
app.use(express.json());
const userRoute=require('./routes/userRoute');
const adminRoutes=require('./routes/adminRoutes');
app.use('/api/user',userRoute);
app.use('/api/admin',adminRoutes);

app.listen(port, () => {
    console.log(`Hospital backend listening on port ${port}`)
}) 