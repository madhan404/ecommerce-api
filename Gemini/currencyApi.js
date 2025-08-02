// const express = require('express');
// const app = express();
// app.use(express.json());
// const dotenv = require('dotenv');
// const path = require('path');
// dotenv.config({path:path.join(__dirname , '.env')})

// const have = 'GBP';
// const want = 'AUD';
// const amt = '87';

//  function keySd(){
//     const apiKey = process.env.MONGO_URL  ;
//     // '0Rcodb7ot3WSgiZE/Qbmng==9AwVSRkn6pWqS0G2';
//     return apiKey;
// }

// let op =  process.env.MONGO_URL;
// console.log(op);

// // const url = `https://api.api-ninjas.com/v1/convertcurrency?have=${encodeURIComponent(have)}&want=${encodeURIComponent(want)}&amount=${encodeURIComponent(amt)}`;
//  const url=  'https://api.api-ninjas.com/v1/convertcurrency?have=' + have + '&want=' + want + '&amount=' + amt;

// console.log(url);

// const fetchFun = async (linkuuh  )=>{
//     try {
//     const fetOP = await fetch(linkuuh,
//         {
//             method:'GET',
//             headers:{
//                 'X-Api-Key' : keySd(),
//             }
//         });

//     if(!fetOP.ok){
//         throw new Error (fetOP.statusText);
//     }
//     const dtd = await fetOP.json();
//     console.log(' data gotted : ',dtd);
//     return dtd;
// }
// catch(error){
//     console.error(`this cats\ch : ${error.message}`);
// }
// }
// fetchFun(url);



const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
const axios = require('axios');
const removeMarkdown = require('remove-markdown');
const cors = require('cors');
app.use(express.static(path.join(__dirname , 'public' )));
const fs = require('fs');
app.use(cors());
const dbJs = require('./db');
dbJs();
const saveRoute = require('./saveRoute');

router.post('/getOP',async (req,res)=>{
    try{

    const oPs =  req.body.data ;
    // const sTop = JSON.stringify(oPs);
    // console.log(sTop);
    console.log(oPs);
const reQbody = {
    contents:[
        {
            parts:[
                {text : oPs}
            ]
        }
    ]
}

    const urlll = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.KEY}` ;
    console.log(urlll);
 const fsWrite = (parseAlone)=>{
        fs.writeFileSync('geminiFile.json' , parseAlone , 'utf8' );
        
    };

    const axioSend = async (oPs,parseAlone)=>{
    const routeCall = await axios.post(`http://localhost:2000/dabi/save`, {question:oPs,answer:parseAlone},{
        headers:{
            'Content-type':'application/json'
        }
    } )
    return routeCall ;
}

const fetchingFu =async (url)=>{

        const fetFnc = await axios.post(url ,reQbody,
            {
                // method:'POST',
                headers : {
                    'Content-type': 'application/json'
                },
                // body : JSON.stringify(oPs.data)
            }
        );
        const results = fetFnc.data;
        const textAlon = results.candidates[0].content.parts[0].text ;
        const parseAlone  = removeMarkdown(textAlon).trim();
        // textAlon.replace(/\*\*(.*?)\*\*/g, '$1').trim();
        // const consoleOp = console.error(parseAlone);
        // const consoleOp = parseAlone.replace(/\\n/g,'<br />')
        fsWrite(parseAlone);
        axioSend(oPs,parseAlone);
        res.status(200).json({
            success : true,parseAlone
        });
        console.log(parseAlone);
        
    }
   

    fetchingFu(urlll);
    
}
catch(err){
    res.status(404).json(` veliya CATCH ;;;;; ${err.message}`)
}});

app.use('/dabi',saveRoute);

app.use('/rte', router);
app.listen(2000 , ()=>{
    console.log(`servre lst to 2000`);
    const urlll = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.KEY}` ;

    console.log(urlll);
    
})