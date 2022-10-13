var mongoose = require('mongoose');

var schema = mongoose.Schema;

var DetectionSchema = new schema({
    Anomaly_ID:{
        type: String,
        required: true,
    },
    Anomaly_Name: {
        type: String,
        required: true,
    },
    Anomaly_Date: {
        type: String,
        required: true,
    },
    Anomaly_Time: {
        type: String,
        required: true,
    },
    Traceback_Image: {
        type: String,
    },
});
module.exports = mongoose.model('Detection', DetectionSchema);