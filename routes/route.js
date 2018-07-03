const express=require('express');
const router=express.Router();
const Signup=require('../models/signup');


//retrieving the details of users
router.get('/signup',(req,res,next)=>{
Signup.find(function(err,signup)
{
    res.send(signup);
}); 
});

//retrieving the single contact
router.get('/signup/:id',(req,res,next)=>{
    Signup.find({_id:req.params.id},function(err,signup)
    {
        res.send(signup);
    }); 
    });



//Add the details of users
router.post('/signup',(req,res,next)=>{
    let newUser=new Signup({
    name:req.body.name,
    email:req.body.email,
    contact_no:req.body.contact_no,
    age:req.body.age,
    gender:req.body.gender,
    password:req.body.password
    });
    newUser.save((err,signup)=>{
     if(err)
     {
         res.send({msg:'Failed to add the Details of user'});
     }
     else
     {
     res.send({msg:'Details added Successfully',data:signup});
     }
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

//update the user_details information
router.put('/signup/:id',(req,res,next)=>{
Signup.findOneAndUpdate({_id:req.params.id},
{
    $set:{
        name:req.body.name,
        email:req.body.email,
        contact_no:req.body.contact_no,
        age:req.body.age,
        gender:req.body.gender,
        password:req.body.password
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
module.exports=router;