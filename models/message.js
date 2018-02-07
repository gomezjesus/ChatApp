const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    initials: {
        type:String,        
        required:true,
        trim:true
    },
    message: {
        type:String,
        required:true,
        trim:true
    }    
});



const Message = mongoose.model('Message', UserSchema);
module.exports=Message;