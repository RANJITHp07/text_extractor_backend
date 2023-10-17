const express=require('express')
const multer=require('multer');
const path=require('path')
const tesseract = require("node-tesseract-ocr")
const cors=require('cors');
const morgan=require('morgan');
const helmet=require('helmet')
const connectDB=require("./db")
const dotenv=require('dotenv')
const Text=require("./model/textModel")

const app=express()

dotenv.config();
connectDB();


// Configure middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const io = require("socket.io")(6005, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/image_extractor",async()=>{
   const all_files=await Text.find()
   res.status(200).json(all_files)
})

app.post("/image_extractor",upload.single('file'),async(req,res,next)=>{
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
          originalImageName:req.file.originalname,
          extractedText:text
        })
        await saveFile.save()
        res.status(200).json(text)
      })
      .catch((error) => {
        console.log(error.message)
      })
    

   }catch(err){
    console.log(err)
   }
})

app.listen(5500,()=>{
  console.log("Successfully connected to the server")
})  

