const express = require('express');
const router = express.Router();
const { createUser,loginUser, listUsers } = require('../controllers/userController');

router.post('/register', createUser);
router.post('/login', loginUser); 
router.get('/', listUsers);

module.exports = router;
