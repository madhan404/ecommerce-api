const express = require('express');
const router = express.Router();
const { listAllUsers, deleteUser } = require('../controllers/adminController');

router.get('/users', listAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;
