var mongoose = require('mongoose');

var schema = mongoose.Schema;

var NotifierSchema = new schema({
    FirstName:{
        type: String,
        required: true,
    },
    LastName:{
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Notifier', NotifierSchema);