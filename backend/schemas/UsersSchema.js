const {Schema} = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const UsersSchema=new Schema({
    name:String,
    email : {
        type:String,
        required:true,
        unique:true
    }
});

UsersSchema.plugin(passportLocalMongoose);
module.exports={UsersSchema};
