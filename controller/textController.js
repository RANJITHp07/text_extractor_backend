const Text=require("../model/textModel")
const tesseract = require("node-tesseract-ocr")


//socket connection established
const io = require("socket.io")(6005, {
    cors: {
      origin: "http://localhost:3000",
    },
  });


const getAlltext=async(req,res,next)=>{
    try{
        const all_files=await Text.find({user_id:req.params.id})
     res.status(200).json({
        success: true,
        data:all_files
     })
    }catch(err){
        next(err)
    }
}

const textExtractor=async(req,res,next)=>{
     try{
      const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
      }
      
      tesseract
        .recognize(req.file.path, config)
        .then(async(text) => {
          const saveFile=new Text({
            originalImageName:Date.now() + '-' + req.file.originalname,
            extractedText:text
          })
          await saveFile.save()
          res.status(200).json(text)
        })
        .catch((error) => {
          console.log(error.message)
        })
      
  
     }catch(err){
     next(err)
     }
  }

module.exports={
    textExtractor,
    getAlltext
}  
  