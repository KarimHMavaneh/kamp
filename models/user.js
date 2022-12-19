const mongoose = require("mongoose"),
      pssportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username : String,
    password : String
});

UserSchema.plugin(pssportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);