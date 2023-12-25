const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    type:{
        type:[String],
        enum:['mobile','ios','desktop'],
        default:['desktop']
    },
    status:{
        type:String,
        enum:['ToDo','InProgress','Completed'],
        default:'Todo'
    }
},
{
    timestamps:true
})