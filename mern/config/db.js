const mongoose = require('mongoose');
// const dB = mongoose.connect('mongodb://localhost:27017/todo',()=>{
  
// })
const delay = 2000;
const db=async()=>{
    try{
     const contn=  await mongoose.connect(process.env.mongo_uri);
        console.log(`db connected :`+ mongoose.connection.port,mongoose.connection.host);
            console.log(`db connected :` +contn.connection.host , contn.connection.port , contn.connection.name);

    }catch(err){
        console.log('db not connected :  '+err.message);
        console.log(`restarting in ${delay/2000} seconds...`);
        setTimeout(db , delay);
    }
    
}
module.exports = db;
// db();