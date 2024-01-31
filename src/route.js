const router = require('express').Router();
const {
    registerEmployee,
    loginEmployee,
    getEmployeeById,
    getEmployees,
    updateEmployee,
    deleteEmployee
} =require("./controllers/employeeController")
const {
    authentication,
    authorization
}=require('./middlewares/auth')


router.get('/test',(req,res)=>res.send('Working fine'));

router.post('/register',authentication,authorization,registerEmployee);
router.post('/login',loginEmployee);
router.get("/employee/:id",authentication,authorization,getEmployeeById);
router.get('/employees',authentication,authorization,getEmployees);

router.all('/*',(req,res)=>status(404).send({
    status:false,
    message:'Not found'
}))

module.exports =router;