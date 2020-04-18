const { Router } = require('express')
const router = Router()
const path = require('path')
const fs = require("fs");

router.get('/images/:name',async (req,res,next)=>{
    try{
        const n = req.params.name
        if (fs.existsSync(path.join(__dirname+"../../../images/"+n))) {
            res.sendFile(path.join(__dirname+"../../../images/"+n));
        } else {
            res.sendStatus(404)
        }
    } catch(err){
        next(err)
    }
})

module.exports = router