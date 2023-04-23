const mongoose = require('mongoose');

const MathlabPost = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categories:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('post',MathlabPost);