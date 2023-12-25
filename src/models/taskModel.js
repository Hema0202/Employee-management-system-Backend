const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId:{
        type:mongoose.Types.ObjectId,
        ref:'Project',
        required:true
    },
    projectManager:{
        type:mongoose.Types.ObjectId,
        ref:'Employee',
        required: true
    },
    team:{
        type:[mongoose.Types.ObjectId],
        ref:'Employee',
    },
    start:{
        type: Date,
        default:()=> new Date()
    },
    end:{
        type:Date
    },
    status:{
        type:String,
        enum:['In Progress', 'Done'],
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('Task',taskSchema);