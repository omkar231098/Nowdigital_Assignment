const express = require("express");
const { UserModel } = require("../Model/user.model");


userRouter = express.Router();

userRouter.post("/add", async (req, res) => {
    const { name,email, role,phone} = req.body;
  
    try {
      const UserPresent = await UserModel.findOne({ email });
  
      if (UserPresent) {
        res.status(200).send({ Message: "User already exist, please login" });
      }
      
      const NewUser = new UserModel({
        name,
        email,
        role,
        phone
      });
  
      await NewUser.save();
  
      res.status(200).send({ Message: "Save Successfully User Data" });
    } catch (err) {
      res.status(404).send(err);
    }
  });



  userRouter.get("/get",  async (req, res) => {
 
  
    try {
      const Users = await  UserModel.find({}); 
      res.status(200).send(Users);
    } catch (err) {
      res.status(404).send({ msg: "Not able to find users" });
    }
  });
  


  userRouter.get("/:userid",async (req, res) => {
    const { userid } = req.params;
  
    try {
        const Users= await  UserModel.findOne({ _id: userid });
        res.status(200).send(Users);
    
    } catch (err) {
      res.status(404).send({ msg: "User is Not Found" });
    }
  });



  userRouter.delete("/delete/:userid",async (req, res) => {
    const { userid } = req.params;
  
    try {
      await  UserModel.findByIdAndDelete({ _id: userid });
      res.status(200).send("User has been deleted");
    } catch (err) {
      res.status(404).send({ msg: "Not able to delete User" });
    }
  });
  

  userRouter.put("/update/:userid", async (req, res) => {
    const { userid } = req.params;
    const payload = req.body;
    try {
      await   UserModel.findByIdAndUpdate({ _id: userid }, payload);
      res.status(200).send("User Data has been updated");
    } catch (err) {
      res.status(404).send({ msg: "Not able to update user data" });
    }
  });

  module.exports={userRouter}