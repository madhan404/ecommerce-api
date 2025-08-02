const express = require('express');
const router = express.Router();
const { addToCart, viewCart, removeFromCart } = require('../controllers/cartController');

router.post('/add', addToCart);
router.get('/:buyerId', viewCart);
router.delete('/remove', removeFromCart);

module.exports = router;
