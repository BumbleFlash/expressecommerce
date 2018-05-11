const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');



const Schema = mongoose.Schema;

let emailValidation = {
    type: String,
    required: true,
    trim:  true,
    minlength: 1,
    unique: true,
    validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
    }
};

let passwordValidation = {
    type: String,
    required: true,
    minlength: 6
};


let userSchema = new Schema({
    username: String,
    email: emailValidation,
    password: passwordValidation,
    tokens:[{
        access:{
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    cart_id:{type: Schema.Types.ObjectId, ref: 'User'}
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'username', 'email','cart_id']);
};

userSchema.methods.generateAuthToken = function(){
    let user = this;
    let access = "auth";
    let token = jwt.sign({_id:user._id.toHexString(), access}, '123abc');

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};



userSchema.statics.findByToken = function(token){
    let User = this;
    let decoded;
    try{
        decoded = jwt.verify(token, '123abc');
    }catch(e){
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

userSchema.statics.findByCredentials = function(email, password){
    let User = this;

    return User.findOne({email}).then((user) => {
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res){
                    resolve(user);
                }
                else{
                    reject();
                }
            });
        });

    });
};

userSchema.statics.forgotPassword = function(email){
    let User = this;

    return User.findOne({email}).then((user) =>{

        if(!user){
            return Promise.reject();
        }
        else {
            Promise.resolve();
        }




    });
};

userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else{
        next();
    }
});


userSchema.virtual('url').get(function(){
    return '/user/' + this._id;
});

let User = mongoose.model('User', userSchema);

module.exports = {User};