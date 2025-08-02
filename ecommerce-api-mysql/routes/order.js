
const express = require('express');
const router = express.Router();
const { placeOrder, listOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/', listOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
