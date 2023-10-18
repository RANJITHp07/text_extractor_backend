const { getAlltext, textExtractor } = require("../controller/textController");
const { upload } = require("../middleware/multerMiddleware");
const router=require("express").Router();


router.get("/image_extractor/:id",getAlltext);
router.post("/image_extractor",upload.single("file"),textExtractor)

module.exports=router
