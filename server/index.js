var express=require('express');
var mongoose=require('mongoose')
var cors=require('cors')
var bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

var corsOptions = {
    origin: true,
    credentials:  true
  }
  
app.use(cors(corsOptions));
  
var adminRouter = require('./routes/adminRoutes.js');

const db='mongodb://localhost:27017/ADTSC';
const PORT=process.env.PORT || 5000 ;

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

app.use('/', adminRouter);
module.exports = app;