var mongoose = require('mongoose');

var schema = mongoose.Schema;

var OTPSchema = new schema({
    User_Email:{
        type: String,
        required: true,
    },
    OTP: {
        type: String,
        required: true,
    },
    

});
module.exports = mongoose.model('OTP', OTPSchema);