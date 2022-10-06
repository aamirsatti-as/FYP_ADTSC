var mongoose = require('mongoose');

var schema = mongoose.Schema;

var NotificationSchema = new schema({
    Notification_ID:{
        type: String,
        required: true,
    },
    Notification_Name: {
        type: String,
        required: true,
    },
    Notification_Receiver: {
        type: String,
        required: true,
    },
    Notification_Time: {
        type: String,
        required: true,
    },
    Notification_Date: {
        type: String,
        required: true,
    },

});
module.exports = mongoose.model('Notification', NotificationSchema);