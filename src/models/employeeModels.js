const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, 'First name is required']
    },
    lastName:{
        type:String,
        required: [true, 'Last name is required']
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    phoneNumber:{
       type:String,
       required:true
    },
    address:{
        street:String,
        city:String,
        state:String,
        zip:String,
        country:String
    },
    password:{
        type:String,
        required:[true,"Why you no password?"]
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        default:'Male',
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        enum:['Manager','HR','Project Manager','SD1','SDE2','Intrn'],
        default:'Intern'
    },
    type:{
        type:String,
        enum:["admin","Employee","Intern"],
        default:'Intern'
    },
    dateOfJoining:{
        type:Date,
        required:true
    },
    salary:{
        type:String,
        required: function(){
            return this.type === 'Employee';
        }
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Employee',employeeSchema);