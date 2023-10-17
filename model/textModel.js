const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    originalImageName:{
        type:String,
        required:true
    },
    extractedText:{
        type:String,
        required:true
    }
    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Text", CommentSchema);