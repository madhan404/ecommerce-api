// const mongoose = require('mongoose');
// let delay = 2000;

// const dbConnect = ()=>{
//     mongoose.connect(process.env.MONGOURI,{
//         serverSelectionTimeoutMS : 1000
//     })
//     .then(cd=>{
//         console.log(`db connected : `+cd.connection.host, cd.connection.port , cd.connection.name );
//         delay = 2000;
//     })
//     .catch(error =>{
//         setTimeout(dbConnect , delay);
//         console.error(`not mongodb cncted : ${error.message}` );
//         console.log(` retrying in ${delay/2000 }`);
//         delay = Math.min(delay*2 , 10000);
//     })
// }

// module.exports = dbConnect;

const mongoose =require('mongoose');
let delay = 2000;
const dbConnect = async ()=>{
    try {
        const contn = await mongoose.connect(process.env.MONGOURI 
            , {
            serverSelectionTimeoutMS : 1000
        }
    );
    console.log(`db connected :` +contn.connection.host , contn.connection.port , contn.connection.name);
    delay = 2000;
}
catch(err){
    console.error(`db mongo not connected :  ${err.message }`);
    console.log(`restarting in ${delay /2000} seconds... !!!!`);
    setTimeout(dbConnect , delay);
    delay = Math.min(delay*2000 , 10000);
}
}

module.exports = dbConnect;
