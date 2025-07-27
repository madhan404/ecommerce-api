const express = require('express');
const router = express.Router();
const productModel = require('../model/productModel');
// get allproducts 
// const prodRoute =  async (req,res,next)=>{
    router.get('/get-prd',async (req,res,next)=>{
        try{
            const pd = await productModel.find({});
            res.status(200).json({
                success: true ,
                pd
            });
        }catch(error){
            res.status(400,{
                success: false,
                message: error.message
            })
            console.error( `error is prd getg : ${ error.message}`);
            process.exit(1);
        }
    })
    
    
    
    
    // GET PROD BY PRICE  
    // find will always return [] array coz it is returng multiple documents 
    // and findOne , findById returns single document 
    router.get ('/prd/:prie' , (req,res,next)=>{ 
        productModel.find({price : req.params.prie})
        .then(pdprice =>{
            if(pdprice.length === 0){
                return res.status(404).json({success :false,message : `item for gvn price : ${req.params.prie} not found`})
            }
            res.status(200).json({
                success:true,
                message : `prd for given id : ${req.params.prie} gott !!`,
                pdprice
            })
        })
        .catch(error =>{
            res.status(404).json({
                success:false ,
                message :error.message
            })
            // console.error(error.message)
            
        })
        
    }
);


// GET PROD BY ID 
router.route('/id-prd/:id').get((req,res)=>{
    productModel.findById(req.params.id)
    .then(pdid=>{
        if(!pdid){
            res.status(404).send(`prd for gvn id : ${pdid} not found`)
        }
        res.status(200).json({
            message:`prd for id ${pdid.images[0].image } ${ pdid.Stocks} found `,
            pdid
        })
    }).catch(error =>{
        res.status(500).send(error.message)
    }
    )
})
module.exports = router ;