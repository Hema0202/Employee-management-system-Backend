const employeeModel =require('./../models/employeeModels');
const employeeValidation = require('./../validation/employeeValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function registerEmployee(req,res){
    try {
        let data=req.body;
        if(!data) return res.status(400).send({
            status:false,
            message: 'please provide employee details'
        })

        let fields = [
            'firstName',
            'lastName',
            'gender',
            'phoneNumber',
            'email',
            'dateOfBirth',
            'dateOfJoinin',
            'password',
            'type',
            'designation',
            'salary'
        ];
        
        //check all the fieds are available in req body
        for(let field of fields){
            if(data[field]) data[field]=data[field].toString().trim();
            if(!data[field]) return res.status(400).send({
                status:false,
                message:`${field} is required`
            })
        }
        
        //validate the fields
        let isValid = employeeValidation(data);

        if(isValid !== true) return res.status(400).send(isValid);

        //Handle Unique email
        let oldEmp = await employeeModel.findOne({email: data.email});

        if(oldEmp) return res.status(400).send({
            status:false,
            message:`${data.email} is already registered`
        })

        //Hash Password
        let hash = await bcrypt.hash(data.password,10);
        data.password = hash;

        //Store in database
        await employeeModel.create(data);

        return res.status(201).send({
            status:true,
            message:'Your profile is created successfully'
        })
        
    } catch (err) {
       res.status(500).send({
        status:false,
        message:err.message
       }) 
    }
}

async function loginEmployee(req,res){
    try {
        let data= req.body;
     //check email and password available in req body
        if(!data) return res.status(400).send({
            status:false,
            message:'Email address and password are required'
        });

        if(data.email) data.email = data.email.toString().trim();
        if(!data.email) return res.status(400).send({
            status:false,
            message:'Please enter email'
        });

        if(data.password) data.password=data.password.toString().trim();
        if(!data.password) return res.status(400).send({
            status:false,
            message:'Please enter password',
        });
       
        //check email is registered or not
        const user=await employeeModel.findOne({
            email:data.email,
        });

        if(!user){
            return res.status(400).send({
                status:false,
                message:`${data.email} is not registered!`,
            });
        }

        //password match
        let isMatch = await bcrypt.compare(data.password, user.password)
        if(!isMatch){
            return res.status(400).send({
                status:false,
                message:'your password is incorrect',
            });
        }

        //generate token
        const token = jwt.sign(
            {
            email:user.email,
            type:user.type,
            id:user._id,
        },
        'jwtPrivateKey',
        {expiresIn:'1h'}
        );

        const empData = {
            firstName:user.firstName,
            lastName:user.lastName,
            designation:user.designation,
            salary:user.salary,
            phoneNumber:emp.phoneNumber,
            email:user.email,
            address:user.address,
            dateOfJoining: user.dateOfJoining,
            gender:user.gender,
            dateOfBirth:user.dateOfBirth
        }

        res.status(200).send({
            status:true,
            message:'You are logged in!',
            token:token,
            data:empData
        });

    } catch (err) {
       res.status(500).send({
        status:false,
        message:err.message
       }) 
    }
}

async function getEmployeeById(req,res){
    try {
        let id = req.params.id;

        if(!ObjectId.isValid(id)) return res.send(400).send({
            status: false,
            message: 'Invalid user id'
        })

        let emp= await employeeModel.findById(id).select({
            firstName :1,
            lastName : 1,
            gender:1,
            address:1,
            phoneNumber: 1,
            email: 1,
            dateOfBirth:1,
            dateOfJoining:1,
            type:1,
            designation:1,
            salary:1
            
        });

        if(!user) return res.status(404).send({
            status:false,
            message:'user not found'
        })
 
        return res.status(200).send({
            status:true,
            data:user
        })
    } catch (err) {
       res.status(500).send({
        status:false,
        message:err.message
       }) 
    }
}

async function getEmployees(req,res){
    try {
         let employees = await employeeModel.find().select({
            firstName:1,
            lastName:1,
            gender:1,
            address:1,
            phoneNumber:1,
            email:1,
            dateOfBirth:1,
            dateOfJoining:1,
            designation:1,
         });
        
         return res.status(200).send({
            status:true,
            data:employess
         })
    } catch (err) {
       res.status(500).send({
        status:false,
        message:err.message
       }) 
    }
}

async function updateEmployee(req,res){
    try {
        
    } catch (err) {
       res.status(500).send({
        status:false,
        message:err.message
       }) 
    }
}

async function deleteEmployee(req,res){
    try {
        
    } catch (err) {
       res.status(500).send({
        status:false,
        message:err.message
       }) 
    }
}