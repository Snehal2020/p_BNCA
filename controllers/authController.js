
const bcrypt= require('bcrypt')
const User=require("../models/userModel")
// const orderModel=require("../models/orderModel")




const registerController=async (req, res) => {
    const { name, email,password } = req.body
   
    try {
       
        if (!name || !email || !password) {
            res.send({message:"Please fill the complete details"})
        }
      
        const userdata =await User.findOne({ email: email });
        console.log("hello")
        if (userdata) {
            return res.status(200).send(
                {success:false,
                message:"User is alraedy exist"})
        }
        
        var userd = new User({name, email,password})
        
         await userd.save();
         res.status(201).send({success:true,message:"user registered successfully"})
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}

const loginController=async (req,res)=>{
    const {email,password}=req.body
    if(!email||!password)
    {
       return res.send("enter complete details")
    }
    try {
        const userdata=await User.findOne({email:email});
       
        if(!userdata){
            
           return res.send({message:"User not found"})
        }
        else{
          
            const isMathch=await bcrypt.compare(req.body.password,userdata.password)
            console.log(userdata.password)
            console.log(isMathch)
            if(!isMathch)
            {
                res.send("Invalid user details")    
            }
            else{
                const token =await userdata.generateToken();
                console.log(token)
                res.cookie("Mytoken",token,{httpOnly:true})
                res.status(200).send({success:true,message:"login successful",token:token,user:userdata,role:userdata.role})
            }
        }

    } catch (error) {
        console.log(error)
       res.status(500).send({
        success:false,
        message:"Error in login",
        error
       })
    }
}

module.exports={registerController,loginController}