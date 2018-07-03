const mongoose = require('mongoose');
const SignupSchema = mongoose.Schema({

    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique:true,
        type: String
    },
    contact_no: {
        required: true,
        type: Number,
        minlength:10,
        maxlength:10
    },
    age: {
        required: true,
        type: Number,
        min:15,
        max:65
    },
    gender:
    {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

const SignUp=module.exports=mongoose.model('Signup',SignupSchema);
