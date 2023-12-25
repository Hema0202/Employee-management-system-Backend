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
        countryCode:{
            type:String,
            default:"+91" //INDIA
        },
        number:{
            type:String,
            required:true
        },
        validate(value){
            if(this.countryCode && this.number && value) return true;
            else throw new Error ("phone number must include a country code and a number");
        }
    },
    address:{
        streetAddress:String,
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
    doj:{
        type:Date,
        required:true
    },
    salary:{
        type:String,
        required: function(){
            return this.type === 'Employee';
        }
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Employee',employeeSchema);