const express = require('express');
const router = express.Router();
const modelsDb = require('./modelsDb');
router.post('/save', async (req,res)=>{
try{
    const {question,answer} = req.body;
    if(!question || !answer){
        console.log(`nothing in kelvi bathil`);
    };

    const saveData = await modelsDb.create({kelvi : question , bathil : answer });
    
    res.status(200).json({
        success: true,
        saveData
    });
}catch(err){
    console.error(`catched from route : ${err.message}`);
}
} )
module.exports = router;