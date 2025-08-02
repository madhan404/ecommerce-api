const fs = require('fs');
const pp = './arrBd.json';
const express= require('express');
const app = express();
app.use(express.json());

const linkFunc = ()=>{
    const ogLinkT ={
        name : 'icanhazdadjoke',
        com:'com'
    };
    return ogLinkT;
};
const link2Sei =(lnkFunc)=>{
    const url = `https://${lnkFunc.name}.${lnkFunc.com}`;
    console.log(url);
    return url ; 
};

const link3Usg = async (linkStore)=>{
    const response = await fetch(linkStore,
        {
            method :'GET',
            headers : { Accept : 'application/json' }
        }
    );
    // JOSN AH MATHALA !!
    const data = await response.json();
    arFunc(data);
    return data;
};



const Func1 = async ()=>{
    const lnkFunc =  linkFunc();
    const linkStore =  link2Sei(lnkFunc);
    const linkUse = await link3Usg(linkStore);
    const jsonlinkUse = JSON.stringify(linkUse);
    const pardsds = JSON.parse(jsonlinkUse);
    console.log(`this is console op || iddd:${pardsds.id} jokewq : ${pardsds.joke} status:${pardsds.status}`);
    
}

Func1();

 
const arFunc=(vandrichiiii)=>{
    let areyy = [];
    areyy.push(vandrichiiii)
      const jArray = JSON.stringify(areyy , null ,3 );
      createFile(jArray);
}

const createFile=(jArray) =>{
    // const fss = 
    fs.writeFileSync(pp ,jArray,'utf8');
    // console.log(`write fie : ${jArray} `);   
    readFile(pp);
};

const readFile =(pp)=>{
    // const fsRead = 
    fs.readFile( pp , 'utf8' ,(err,data)=>{
        const ogdaatsas = JSON.stringify(data);
        // console.log(`read file op :  ${ogdaatsas}`);
        const parde = JSON.parse(ogdaatsas);
        // console.log(`read file op :  ${parde}`);
        
    } );
}












// const createFle = (jsonArr )=>{
//     try{    
//         fs.writeFileSync( path, jsonArr , 'utf-8');
//         console.log(jsonArr);
        
//     }catch(err){
//         console.error(err.message);
//     }
//     readFle(path);
// };



// const readFle = (path)=>{
//     try{
//         fs.readFileSync(path , 'utf8' , (err,data)=>{
//             const arrparseg =  JSON.parse(data);
//             console.log(arrparseg);;
//         });
//     }
//     catch(err){
//         console.error('no file foundsds');
// }}

// arFunc();



// const jokeFun = ()=>{
//     const joke = {
//         namess : 'icanhazdadjoke',
//         cls:'com'
//     }
//     return joke;
// }

// const twoFunc =(jokeData)=>{
//     const urll = `https://${jokeData.namess}.${jokeData.cls} `
//     return urll;
// }
// const threeFunc = async(urll)=>{
//     const fetcUrlData = await fetch(urll,{
//         headers: {'Accept' : 'application/json'}
//     });
//     const urlJson = await fetcUrlData.json();
//     const jokealone = urlJson.joke;
//     console.log('this is joke alone : ',jokealone);
//     areyy.push(jokealone);
//     console.log('the aray elmts are : ' , areyy);
// }
// const sOne = async ()=>{
//     const jokeData =  jokeFun();
//     const jk2ndFunc = twoFunc(jokeData); 
//     await threeFunc(jk2ndFunc)
// }
// sOne();





















// router.post('/htpost',async (req,res) =>{
//     const oppp = req.body;
//     const fetcggh = await fetch('https://httpbin.org/post',{
//         method:"POST",
//         headers : {'Content-type': 'application/json'},
//         body : JSON.stringify(oppp)
//     })
//     let datta = await fetcggh.json();
//     res.status(200).json({
//         message : 'nammdhaan' , datta
//     })
// })

// app.use('/d',router);
// app.listen(2000,()=>{
//     console.log('server lst 1234');
    
// })
// post(joke);
// const post = async(req,res,jkkkk)=>{
//     const fetcDatah = await fetch("https://httpbin.org/post",
//         {
//             method:'POST',
//             headers : {
//                 "Content-type": "application/json"
//             },
//             body : JSON.stringify(jkkkk)
//         }
//     )
//     const dataGt = await fetcDatah.json();
//     console.log(dataGt);   
// }

// 1234567890-

// const joke = {
//      id:'wewwq',
//      jose:'weewewewe'
// };

// const pods = async (jkkk)=>{
// const fetds = await fetch('https://httpbin.org/post',{
//     method:'POST',
//     headers:{
//         "Content-type": " application/json"
//     },
//     body: JSON.stringify(jkkk)
//     }
// );
// const answe = await fetds.json();
// console.log(answe);
// }

// pods(joke);