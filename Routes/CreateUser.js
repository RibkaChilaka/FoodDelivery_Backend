const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {body, validationResult}=require('express-validator');

const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
// const jwtSecret="asdfghjklqwertyuiopzxcvbnm"

router.post("/createuser", [
    body('email','Invalid Email').isEmail(),
    body('name','Type Correct Name').isLength({min:5}),
    body('password','Incorrect Password').isLength({min:5})]
,async(req,res)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10)
    let secPassword=await bcrypt.hash(req.body.password, salt)

    try{
        User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})


router.post("/loginuser",[
    body('email','Invalid Email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})]
, async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }

   let email=req.body.email
    try{
        let userData = await User.findOne({email})
        if(!userData){
            return res.status(400).json({error: "Try logging in correct credentials"})
        }

        const pwdCompare=await bcrypt.compare(req.body.password, userData.password)

        if(!pwdCompare){
            return res.status(400).json({error: "Try logging in correct credentials"})
        }

        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,process.env.JWTSECRET)
        return res.json({success:true, authToken:authToken})
    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})





module.exports=router;

