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
    Anomaly_Area: {
        type: String,
        required: true,
    },
    Traceback_Video: {
        type: String,
    },
    Detection_Video: {
        type: String,
    },
},{timestamps:true}
);
module.exports = mongoose.model('Detection', DetectionSchema);