const bcrypt=require('bcrypt')
const User=require("../model/userModel")

const userRegistration=async(req,res,next)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        
        if(user){
            res.status(200).json({
                sucess:false,
                message:"Already Exist"
            })
        }else{
       
        const salt = await bcrypt.genSaltSync(10);
        const hashpassword =await  bcrypt.hashSync(req.body.password, salt);
            const newUser=new User({
                username:req.body.username,
                email:req.body.email,
                password:hashpassword
            })
            await newUser.save()
            res.status(200).json({
                success:true,
                message:"Signed In successfully"
            })
        }
        
    }catch(err){
       next(err)
    }
}


const userLogin=async(req,res,next)=>{
    try {
        const user = await User.findOne({ email: req.body.email });
        const key=process.env.JWT_KEY
        if (user && key) {
          const isMatch = await bcrypt.compare(req.body.password, user.password);
          if (isMatch) {
            const token = jwt.sign({ id: user._id }, key);
            res.status(200).send({
              success: true,
              message: "Signed In succesfully",
              token:{
                token,
                id:user._id
              }
            });
          } else {
            res.status(200).send({
              success: false,
              message: "Wrong password",
            });
          }
        } else {
          res.status(200).send({
            success: false,
            message: "Wrong email",
          });
        }
      } catch (err) {
        res.status(401).send({
          success: false,
          message: err,
        });
      }
}


module.exports={
    userRegistration,
    userLogin
}
