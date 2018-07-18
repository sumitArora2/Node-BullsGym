const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const bcrypt = require('bcryptjs');
const contact=require('../models/contactus');
//Add the details of users
router.post('/register',(req,res,next)=>{
    let newUser=new User({
    name:req.body.name,
    email:req.body.email,
    contact_no:req.body.contact_no,
    age:req.body.age,
    gender:req.body.gender,
    password:req.body.password,
    });
    User.addUser(newUser,(err,user)=>{
    if(err)
    {
        res.json({success:false,msg:'Failed to add the user'});
    }
    else
    {
        res.json({success:true,msg:'User Registered Successfully'});
    }
    });
});

//authenticate the user 
router.post('/authenticate',(req,res,next)=>{
const email=req.body.email;
const password=req.body.password;
User.getUserByEmail(email,(err,user)=>{
  if(err)throw err;
  if(!user)
  {
      return res.json({success:false,msg:'User not found'});
  }
  User.comparePassword(password,user.password,(err,isMatch)=>{
if(err) throw err;
if(isMatch)
{
const token=jwt.sign(user.toJSON(),config.secret,{
expiresIn:604800 //1 week
});
res.json({
 success:true,
    token:'JWT '+token,
    user:{
        id:user._id,
        email:user.email,
        name:user.name,
        contact_no:user.contact_no,
        age:user.age,
        gender:user.gender,
        role:user.role
    }
});
}
else
{
return res.json({success:false,msg:'Wrong Password'});
}
}); 
});
});

//get the profile details of user
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
res.json({user:req.user});
});



//update the user_details information
router.put('/update/:id',(req,res,next)=>{
    var   myPlaintextPassword=req.body.password;

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                myPlaintextPassword=hash;
   User.findOneAndUpdate({_id:req.params.id},
{    
        $set:{
        name:req.body.name,
        email:req.body.email,
        contact_no:req.body.contact_no,
        age:req.body.age,
        gender:req.body.gender,
        password:myPlaintextPassword
    }
},function(err,result)
{
   
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(result);
    }
});
});
});
});

router.get('/hello',(req,res,next)=>{
    User.find(function(err,contact)
    {
        if(err)
        {
            res.json(err);
        }
      else
      {
        res.json(contact);
      } 
        
    });
    });


router.post('/contact',(req,res,next)=>{
let newmessage=new contact({
name:req.body.name,
email:req.body.email,
contact_no:req.body.contact_no,
message:req.body.message
});
newmessage.save((err,result)=>{
    if(err)
    {
       res.json(err);
    }
    else
    {
          res.json(result);
    }
});
});


/*
//getting the users details
router.get('/hello',(req,res,next)=>{
    User.find(function(err,contact)
    {
      //  res.json({msg:'contacts showing successfully',contacts}); 
        res.json(contact);
    });
    });








//delete the particular user Detail
router.delete('/signup/:id',(req,res,next)=>{
Signup.remove({_id:req.params.id},function(err,result){
if(err)
{
    res.json(err);
}
else
{
  res.json(result);
}
});
});

*/
module.exports=router;