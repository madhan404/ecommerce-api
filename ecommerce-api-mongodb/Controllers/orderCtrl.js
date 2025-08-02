// const orderModel = require('../model/orderModel');
// const productModel = require('../model/productModel');
// const getOrder = (req,res)=>{
//     try {
//         const cartItems = req.body;
//         if(!Array.isArray(cartItems)){
//             throw new Error("cartItems array value required");
//         }
//         if(cartItems.length === 0){
//             throw new Error('cart items are empty array')
//         }
//         const amount = cartItems.reduce((accumualtrrr , crtValueeee)=>{
//             if( Object.keys(crtValueeee).length === 0 ){
//                 throw new Error ("no crntvalue or no values in prd ")
//             }
//             if(!crtValueeee.prd || Object.keys(crtValueeee.prd).length === 0){
//                 throw new Error('no value in prd')
//             }
//             if( typeof crtValueeee.prd.price === 'number' || typeof crtValueeee.qty === 'string' ){
//                 res.status(400).json({
//                     message : `invalid datas`
//                 })
//             }
//             const op = accumualtrrr + crtValueeee.prd.price * crtValueeee.qty
//             return op ; 
//         },0).toFixed(2);

//         const status = 'pending';
//         const order = orderModel.create({cartItems,amount,status});

//         cartItems.forEach(async(ittmmes)=>{
//             const products = await productModel.findById(ittmmes.prd._id);
//             const stock = products.Stocks - ittmmes.qty;
//             products.Stocks = stock ;
//            await products.save();
//         })

//         res.status(202).json({
//         success: true,message : 'post success',amount , order
//         })
//         console.log(amount);
//     } catch (error) {
//         console.log(error.message);
//         res.status(400).json({
//             success : false,
//             message: `catch error :   ${error.message}`
//         })
        
//     }
// }

// module.exports = {getOrder};

const orderModel = require('../model/orderModel');
const productModel = require('../model/productModel');
const getOrder = async (req,res)=>{
    try{

    const iteminCart = req.body;
    if(!Array.isArray(iteminCart)){
        throw new Error ("cart items must be an array");
    }

    if(!iteminCart.length === 0 || Object.keys((iteminCart).length === 0)){
        throw new Error ( 'ulla onuh ila')
    }
    const kaasu = iteminCart.reduce((acc,crtvalue)=>{
        // const op =
         return acc + crtvalue.prd.price * crtvalue.qty
        // return op;
    },0);
    const tatus = 'pending da';

    const postingOrder = await orderModel.create({cartItems : iteminCart ,
        amount :kaasu , status:tatus
    });


    // const update = productModel.findById()
    // await Promise.all(
    //     iteminCart.map(async (itms)=>{
    //         const update = await productModel.findById(itms.prd._id)
    //         update.Stocks = update.Stocks - itms.qty

    //         if(update.Stocks < 0){
    //             throw new Error ("stocks are less then the qty");
    //         }

    //         await update.save();
    //     }) )
    for (const ittms of iteminCart){
        const upddate = await productModel.findById(ittms.prd._id);
        if(upddate.Stocks < ittms.qty){
            throw new Error (" stocks are less than qty ")
        }
        if(upddate.Stocks > ittms.qty ){
            // throw new Error ('onuh meh ila');
            upddate.Stocks -= ittms.qty ;
        }

       await upddate.save();
    }
    
    res.status(202).json({
        success: true, kaasu , postingOrder 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    })
}catch(error){
    res.status(400).json({
        success: false , message : error.message
    })
}
}
module.exports = {getOrder};





