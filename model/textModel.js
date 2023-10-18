const mongoose = require("mongoose");

const textSchema = new mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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

module.exports = mongoose.model("Text", textSchema);