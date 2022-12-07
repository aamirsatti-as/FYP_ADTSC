var express = require('express');
var mongoose = require('mongoose')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

var corsOptions = {
    origin: true,
    credentials:  true
  }
  
  app.use(cors(corsOptions));
var adminRouter = require('./routes/adminRoutes.js');

const db = 'mongodb://localhost:27017/ADTSC';
const PORT = process.env.PORT || 5000;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Running on PORT ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})

// mongoose
//     .connect("mongodb+srv://root:root@cluster0.a8kp9l7.mongodb.net/?retryWrites=true&w=majority")
//     .then(() => console.log("DB Connection Successfull!"))
//     .catch((err) => {
//         console.log("DB Connection Fail")
//         console.log(err);
//     });

app.use('/', adminRouter);
module.exports = app;