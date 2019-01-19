const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//Add instance methods
UserSchema.methods.toJSON = function() { //Overriding method
    let user = this;
    let userObject = user.toObject(); //Mongoose user to object with only properties in document

    return _.pick(userObject, ['_id', 'email']);
};

//Instance method
UserSchema.methods.generateAuthToken = function () { //Not arrow fn, as we need 'this' keyword
    let user = this; 
    let access = 'auth';
    let token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();

    //user.tokens.push({access, token}); //May not work, use below
    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

//Model method
UserSchema.statics.findByToken = function (token) {
    let User = this; //Model
    let decoded;

    //jwt.verify will throw exception if fails
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject('Some message if required'); //does the same as above. Promise reject is required
        //as we are handling a then() at the caller
    }

    //return so we can handle a then() at the caller
    return User.findOne( {
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};