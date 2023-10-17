const bcrypt=require('bcrypt')

const userRegistration=async(req,res,next)=>{
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword =await  bcrypt.hashSync(req.body.password, salt);
    try{
        const newUser={
            username:req.body.username,
            password:req.body.password
        }
        await newUser.save()
    }catch(err){
       next(err)
    }
}

module.exports
