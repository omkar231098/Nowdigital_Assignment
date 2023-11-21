const express=require('express');


const { userRouter } = require("./routes/user.route");

const { connection } = require("./configs/db");


const app=express();
app.use(express.json())
require("dotenv").config()
// app.use(cors())


app.use("/user", userRouter);









app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("Connected to MongoDb");
    } catch (err) {
      console.log("Not able to connected to MongoDb");
      
    }
  
    console.log(`Server is running on ${process.env.port}`);
  });