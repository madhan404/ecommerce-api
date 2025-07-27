// const { Router } = require("express");
const express= require('express');
const router = express.Router();
const {getOrder} = require('../Controllers/orderCtrl');
// router.route('/order').get(getOrder);

router.post('/order',getOrder);
module.exports = router;