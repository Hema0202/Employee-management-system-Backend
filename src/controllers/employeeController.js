const employeeModel =require('./../models/employeeModels');
const employeeValidation = require('./../validation/employeeValidation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        for(let field of fields){
            if(data[field]) data[field]=data[field].toString().trim();
            if(!data[field]) return res.status(400).send({
                status:false,
                message:`${field} is required`
            })
        }

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
        let newEmp = new employeeModel(data);

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

async function login(req,res){
    try {
        let data= req.body;
        let email = data.email;
        let password = data.password;

        if(!email) return res.status(400).send({
            status:false,
            message:'Please enter email'
        });
        if(!password) return res.status(400).send({
            status:false,
            message:'Please enter password',
        });
      
        const user=await employeeModel.findOne({
            email:email,
        });

        if(!user){
            return res.status(400).send({
                status:false,
                message:`${email} is not registered!`,
            });
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).send({
                status:false,
                message:'your password is incorrect',
            });
        }

        const token = jwt.sign({
            email:user.email,
            name:user.name,
            id:user._id,
        },
        process.env.SECRET_KEY,
        {expiresIn:'1h'}
        );

        res.status(200).send({
            status:true,
            message:'You are logged in!',
            token:token,
        });

    } catch (err) {
       res.status(500).send({
        status:false,
        message:err.message
       }) 
    }
}

async function getEmployee(req,res){
    try {
        
    } catch (err) {
       res.status(500).send({
        status:false,
        message:err.message
       }) 
    }
}

async function getEmployees(req,res){
    try {
        
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