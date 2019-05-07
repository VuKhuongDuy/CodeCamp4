var express = require('express');
var router = express.Router();
var handleRequire = require('./controller/handleRequire.js');

router.get('/', (req,res)=>{
    res.status(200).send('Hello, world!');
})

router.post('/register', handleRequire.postRegis);
router.post('/categories', handleRequire.createCate);
router.get('/categories', handleRequire.getCate);
router.get('/categories/:id', handleRequire.getCateById);
router.post('/categories/:id', handleRequire.updateCateById);
router.delete('/categories/:id', handleRequire.deleteCateById);
router.get('/categories/:id/todos', handleRequire.getTodosById);

router.post('/todos', handleRequire.createTodo);
router.get('/todos/:id', handleRequire.getTodoById);
router.post('/todos/:id', handleRequire.updateTodoById);
router.post('/todos/:id/toogle', handleRequire.changeStatusTodo);
router.delete('/todos/:id', handleRequire.deleteTodoById);

module.exports = router;