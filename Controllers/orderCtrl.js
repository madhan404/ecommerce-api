const orderModel = require('../model/orderModel');
const productModel = require('../model/productModel');
const getOrder = (req,res)=>{
    try {
        const cartItems = req.body;
        if(!Array.isArray(cartItems)){
            throw new Error("cartItems array value required");
        }
        if(cartItems.length === 0){
            throw new Error('cart items are empty array')
        }
        const amount = cartItems.reduce((accumualtrrr , crtValueeee)=>{
            if( Object.keys(crtValueeee).length === 0 ){
                throw new Error ("no crntvalue or no values in prd ")
            }
            if(!crtValueeee.prd || Object.keys(crtValueeee.prd).length === 0){
                throw new Error('no value in prd')
            }
            if( typeof crtValueeee.prd.price === 'number' || typeof crtValueeee.qty === 'string' ){
                res.status(400).json({
                    message : `invalid datas`
                })
            }
            const op = accumualtrrr + crtValueeee.prd.price * crtValueeee.qty
            return op ; 
        },0).toFixed(2);

        const status = 'pending';
        const order = orderModel.create({cartItems,amount,status});

        cartItems.forEach(async(ittmmes)=>{
            const products = await productModel.findById(ittmmes.prd._id);
            const stock = products.Stocks - ittmmes.qty;
            products.Stocks = stock ;
           await products.save();
        })

        res.status(202).json({
        success: true,message : 'post success',amount , order
        })
        console.log(amount);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success : false,
            message: `catch error :   ${error.message}`
        })
        
    }
}

module.exports = {getOrder};