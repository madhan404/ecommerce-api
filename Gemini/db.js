const mogoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const asynConnection =  ()=>{
try{

    const cnct =  mogoose.connect(process.env.MAAMBALAM_DB, {
        serverSelectionTimeoutMS: 1000,
    })
    .then(res=>{
        console.error(
            `🥭🥭 MAAMBALA CONNECTED succefully !! 💀⛔️⚠️‼️...😍 \n ${res.connection.host} ${res.connection.name} \n ${res.connection.port}`
        );

    })
    .catch(err =>{
        console.log(err.message);
        
    })
}catch(errrr){
    console.error('db not connected !! ⛔️‼️');
}
}

module.exports = asynConnection;
