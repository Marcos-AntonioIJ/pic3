const multer = require("multer");

const imageFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image")){
        cb(null,"true");
    }
    else{
        cb("Upload Only Images",false);
    }
}

var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "C:/xampp/htdocs/teste node/public/Images/Uploads");
    },
    filename: (req,file,cb) =>{
        cb(null, file.fieldname + '.jpg');
    }
});

var uploadfile = multer({storage : storage,fileFilter: imageFilter})
module.exports = uploadfile;