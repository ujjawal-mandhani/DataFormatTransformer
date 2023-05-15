const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express()
let ext = ""

app.use(function(req, res, next) {
    res.append('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin');
    next();
  });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype == "text/csv") {
            cb(null, "Volume/files/csv/")
        } else if(file.mimetype == "application/json") {
            cb(null, "Volume/files/json/")
        } else if(file.mimetype == "application/octet-stream") {
            cb(null, "Volume/files/parquet/")
        }
    },
    filename: function (req, file, cb) {
        if(file.mimetype == "text/csv") {
            ext = "csv"
        } else if(file.mimetype == "application/json") {
            ext = "json"
        } else if(file.mimetype == "application/octet-stream") {
            ext = "parquet"
        }
      cb(null, file.fieldname + "-" + Date.now()+`.${ext}`)
    }
  })
const maxSize = 40 * 1024 * 1024;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
        arry = ["text/csv", "application/json", "application/octet-stream"]
        console.log(file.mimetype, file, path.extname(file.originalname).toLowerCase())
        if(arry.includes(file.mimetype)) {
            return cb(null, true);
        } else {
            cb("Error: File upload only supports the "
                + "following filetypes - " + arry.join(" "));
        }
      } 
}).single("hello");
    
app.post("/uploadFiles",function (req, res, next) {
    upload(req,res,function(err) {
  
        if(err) {
            console.log(err);
            res.send(err)
        }
        else {
            res.send({
                "message": "success"
            })
        }
    })
})

app.listen(10404,function(error) {
    if(error) throw error
        console.log("Server created Successfully on PORT 10404")
})