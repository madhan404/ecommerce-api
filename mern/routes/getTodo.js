const express=require('express');
const router = express.Router();
const {getTodo, deleteTodo , updateTodo} = require('../Controller/getTodoController');
// const postTodo = require('../model/postTodo');

router.get('/:id' ,getTodo);
router.put("/:id",updateTodo);
router.delete('/:id',deleteTodo);
module.exports = router;