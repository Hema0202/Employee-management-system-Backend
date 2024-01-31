const jwt = require('jsonwebtoken');
const employeeModel=require('../models/employeeModels');

async function authentication(req,res,next){
    try {
        let token = req.headers['x-api-key'];

        if(!token) return res.status(401).send({
            status:false,
            message:'Login first'
        })

        jwt.verify(token,'jwtPrivateKey',(err,decodedToken) =>{
            if(err) return res.status(498).send({
                status:false,
                message:'Invalid token'
            })
            req.userData = decodedToken;
            next();
        })
    } catch (error) {
        res.status(500).send({
            status:false,
            message:err.message
        })
    }
}

async function authorization(req,res,next){
    try {
        let userData = req.userData;
        if(userData.type != 'admin') return res.status(403).send({
            status:false,
            message:'You are not authorized'
        })
        next();
    } catch (error) {
        res.status(500).send({
            status:false,
            message:err.message
        })
    }
}

module.exports = {authentication,authorization}