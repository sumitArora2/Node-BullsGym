const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({

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
        minlength: 10,
        maxlength: 10
    },
    age: {
        required: true,
        type: Number,
        min: 15,
        max: 65
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

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function (email, callback) {
    const query = { email: email };
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}












