const mongoose = require('mongoose');
const ContactSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
      
        type: String
    },
    contact_no: {
        required: true,
        type: Number,
    },
    message: {
        required: true,
        type: String,
    }
});

const SignUp=module.exports=mongoose.model('Contact',ContactSchema);
