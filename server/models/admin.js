const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt =require('bcryptjs');
const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Company:{
        type:String,
        required:true
    },
    UserName:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    AboutMe:{
        type:String,
        required:true
    },
    tokens: [
        {
            token:{
                type:String
            }
        }
    ]
});

adminSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);  
    }
    next();
  })

adminSchema.methods.generateAuthToken = async function(){
    try{
        let myToken = jwt.sign({_id:this._id},'IAmGeneratingTokenToAuthticateCredintialBelongToUser');
        this.tokens = ({token:myToken});
        await this.save();
        return myToken;
    }
    
    catch(err){console.log(err)};

}
module.exports = mongoose.model('admin',adminSchema)