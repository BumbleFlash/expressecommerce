let {User}= require("../models/userModel");
let {mongoose} = require('../db/mongoose');
let {ObjectID} = require('mongodb');
let {Cart}= require("../models/cartModel");
const _ = require('lodash');


exports.sign_in_post= function (req,res) {

    let cart= new Cart({});
    cart.save().then((cart)=>{
        let user =new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            cart_id: cart.id
        });
        user.save().then(() => {
            //res.send(doc);
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            console.log(e);
            res.status(400).send(e);
        });
    },(e)=>{

    });

};
exports.login_in_post=function(req,res){
    let body = _.pick(req.body, ['email','password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {


            res.header('x-auth', token).send({res:true,user});
        });
    }).catch((e) => {
        res.status(400).send({res:false,e});
    });
};