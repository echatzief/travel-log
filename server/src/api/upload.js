const { Router } = require('express')
const router = Router()
const { generateId } = require('../modules')
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'images')
    },
    filename:function (req, file, cb) {
        let imageId = generateId(50)
        cb(null,imageId+"_"+file.originalname)
    },
})
var upload = multer({ 
    storage: storage ,
    fileFilter: function (req, file, cb) {
        console.log(path.extname(file.originalname))
        if ((path.extname(file.originalname) !== '.png') &&
            (path.extname(file.originalname) !== '.PNG') &&
            (path.extname(file.originalname) !== '.jpg') &&
            (path.extname(file.originalname) !== '.JPG') &&
            (path.extname(file.originalname) !== '.jpeg') &&
            (path.extname(file.originalname) !== '.JPEG') ){
            req.fileValidationError = 'Only images are allowed.'
            return cb(null, false, new Error('Only images are allowed.'))
        }

        cb(null, true)
    }
})
router.post('/img',upload.single('file'),async (req,res,next)=>{
    try{
        if (req.fileValidationError) {
            res.status(400).send({ error: 'Only images are allowed' })
        } else {
           res.json({filename:req.file.filename})
        }
    } catch(err){
        next(err)
    }
})

module.exports = router