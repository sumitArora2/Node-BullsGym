var express=require('express');
var cors=require('cors');
var bodyparser=require('body-parser');
//var path=require('path');
var app=express();

const route=require('./routes/route');
var mongoose=require('mongoose');

const port=3000;







app.use(cors());
app.use(bodyparser.json());

//app.use(express.static(path.join(__dirname,'public')));
app.use('/api',route);

//connected to database
mongoose.connect('mongodb://localhost:27017/GymProject');

//checking the  database connected 
mongoose.connection.on('connected',()=>{
console.log('Connected to the database mongodb @27017');
});

//checking error 
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('Error in connecting the databse ' + err);
    }

});

//checking the database is disconnected
mongoose.connection.on('disconnected',()=>{
    console.log('Database disconnected');
});


app.get('/',(req,res)=>{
res.send("Hello welcome to the Gym Project");
});

app.listen(port,()=>{
console.log(`Server Started at port : ${port}`);
});
