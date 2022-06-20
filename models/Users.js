const mongoose = require('mongoose');
const {Schema}= mongoose;
const bcrypt = require('bcryptjs');
const { mongo } = require('../database');

const UsersSchema = new Schema({
    name:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    tipo: {
        type:String,
        required:true,
        trim:true
        }
});

module.exports = mongoose.model('Users', UsersSchema);