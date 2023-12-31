const express=require('express')
const multer=require('multer');
const path=require('path')
const cors=require('cors');
const morgan=require('morgan');
const connectDB=require("./db")
const dotenv=require('dotenv')
const TextRoute=require("./route/textRoute");
const UserRoute=require("./route/userRoute")


const app=express()

dotenv.config();
//connection to database established
connectDB();


// Configure middleware
app.use(cors({
  origin:"https://text-extractor-q1q798t18-ranjithp07s-projects.vercel.app"
}));
app.use(morgan('combined'));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.use(TextRoute);
app.use(UserRoute)



app.listen(8000,()=>{
  console.log("Successfully connected to the server")
})  

