const mongoose=require('mongoose');
const dotenv=require('dotenv')

dotenv.config()

 const connectDB=async()=>{
    try{
        const mongo_uri=process.env.MONGO_URL;
        if(mongo_uri){
            await mongoose.connect(mongo_uri)
            console.log("Connected to database")
        }
    }catch(err){
        console.log(err)
    }
}    

module.exports=connectDB