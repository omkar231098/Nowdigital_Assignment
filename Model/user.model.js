const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({

 name:String,
 email: String,
 phone:Number,
  role:{
    type:String,
    default:"User",
    enum:["User","Moderator"]
  }
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
