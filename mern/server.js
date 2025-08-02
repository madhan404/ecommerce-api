const express = require('express');
const postTodo = require('./model/postTodo');
const getTodo = require('./routes/getTodo');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');
dotenv.config({path:path.join(__dirname,'./.env')});
db();

// const todo=[];


app.post('/todo',async (req,res)=>{{
    const {title,desc} = req.body;
    try{
        // todo.push({id : todo.length+1 ,title,desc});
        // console.log(title,desc);
        // res.status(200).json(todo);
        // if(Object.keys(title).length === 0){
        //     throw new Error('title cant be empty');
        // }
        await postTodo.create({Description:desc, Title:title});
        // const posttoto = new postTodo({
        //     Description:desc, Title:title
        // })
        // await posttoto.save();
        res.status(200).json({success: true , message : 'created post successlfully', title,desc  });
    }catch(error){
        console.error(error.message)
        res.status(400).json({
            success:false,
            message: error.message
        })
    }
}})
app.use('/todo',getTodo);

app.listen(process.env.port , ()=>{
console.log(`server lst to ${process.env.port}` );
// setTimeout (()=>{
//   console.log("setimout");
  
// },1000);
// const hi =()=>{
//     console.log("hlpignseti");
    
// }
// setTimeout( hi , 2000 );


});