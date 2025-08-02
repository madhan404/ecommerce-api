const express = require('express');
// const router = express.Router();
const postTodo = require('../model/postTodo');
const getTodo = async(req,res)=>{
    const id = req.params.id;
    try{
        if(!id){
            throw new Error('id property value required for fetch prds...')
        }
      const gettingProduct=  await postTodo.findById(id); 
      if(!gettingProduct){
        return res.status(400).json({
            success: false,message :'no item in prd'
        })
      }       
        console.log('get products working');
        res.status(200).json({
            success: true , 
            message : ` get products for the gvn id `,
            gettingProduct
        })
    }catch(err){
        if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format.'
      });
    }
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: `there is erererere ::::: ${err.message}`
        })
    }

    
}

// const updateTodo = async (req,res)=>{
//   const getIdforUpdate = req.params.id ;
//   const {Title,Description } = req.body;
//   try{
// const before = await postTodo.findById(getIdforUpdate);
// if(!getIdforUpdate){
//   res.status(400).json({
//     message : `no inp gvn || np todo found ::: ${getIdforUpdate}`
//   })
// }
//   const update = await postTodo.findByIdAndUpdate(
//     getIdforUpdate,
//     {Title,Description},
//     {new : true , runValidators : true}
//   );
//   if(!update){
//     return res.status(400).json({
//       success:false ,
//       message : `no todo found for gvn id : ${getIdforUpdate}`
//     });
//   };
//   res.status(200).json({
//     success:true,
//     message : `updated successfullfy from [${before.Title} ${before.Description}] to [ ${update.Title} | ${update.Description}]`,
//     before,  after : update,
//   });
// }
// catch(thappu){
//   res.status(400).json({
//     success :  false,
//     message : `error found : ${thappu.name}, ${thappu.message}`
//   })
// }

// }


const updateTodo = (req,res)=>{
  const updId = req.params.id;
  const {Title , Description} = req.body; 

return postTodo.findByIdAndUpdate(
    updId,
    {Title , Description},
    {new :  true, runValidator : true}
  ).then(upddsdsd=>{
    if(!upddsdsd){
      res.status(400).json({
        message : `no id foud`
      })
    }

    res.status(200).json({
      message : upddsdsd
    })
  })
}


const deleteTodo = async(req,res)=>{
  const getIdforDelete = req.params.id;
  // const {Title,Desc}
  try{   
    const Delete = await postTodo.findByIdAndDelete(getIdforDelete);
    if(!getIdforDelete){
      return `gvn id : ${getIdforDelete} not found`;
    }
    res.status(200).json({
      mesage:`item deleted for gvn id : ${getIdforDelete}`,
      Delete 
    })
  }catch(kolaru){
    res.status(400).json({
      message:kolaru.message
    })
  }
}

module.exports = {getTodo,updateTodo,deleteTodo};
