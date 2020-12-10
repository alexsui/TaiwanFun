const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
 
const User = new Schema({
    //local strategy
    email:{
        type:String,
        
    },
    password:{
        type:String,
    
    },
    name:{
        type:String,
    },
    //google oauth
    googleId:{
        type:String,
    },

});
 
module.exports = mongoose.model('User', User);