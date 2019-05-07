var db = require('../models/handleDB');
var UserObject = db.user;
var CateObject = db.cate;
var ToDoObject = db.todo;
var user = [];

async function postRegis(req, res) {
    try {
        const reqDate = req.body;
        let post = new UserObject({
            username: reqDate.username,
            password: reqDate.password
        })
        let data = await post.save();
        user = data;
        res.status(200).send({
            success: true,
            data
        })
    } catch (err) { res.status(404).send(err) }
}

async function createCate(req, res) {
    try {
        const reqDate = req.body;
        let post = new CateObject({ name: reqDate.name, user: user });
        let data = await post.save();
        res.status(200).send({
            success: true,
            data
        })
    } catch (err) { res.status(404).send({ err }) }
}

async function getCate(req, res) {
    try {
        let data = await CateObject.find({ "user": user });
        res.status(200).send({ success: true, data })
    } catch (err) { res.status(404).send(err) }
}

async function getCateById(req, res) {
    try {
        const id = req.params.id;
        let data = await CateObject.findById(id);
        res.status(200).send({ success: true, data });
    } catch (err) { res.status(404).send(err) }
}

async function updateCateById(req, res) {
    try {
        const id = req.params.id;
        const reqData = req.body;
        let data = await CateObject.update(
            { _id: id },
            {
                $set:
                    { name: reqData.name }
            }
        )

        res.status(200).send({ success:true, data});
    } catch (err) { res.status(404).send(err) }
}

async function deleteCateById(req, res) {
    try{
        const id = req.params.id;
        let data = await CateObject.remove({_id: id});
        res.status(200).send({success: true, data});
    }catch (err) { res.status(404).send(err) }
}

async function getTodosById(req, res) {
    try{
        let todoArr = await ToDoObject.find({categories: req.params.id})
        res.status(200).send({success: true, todoArr})
    }catch (err) { res.status(404).send(err) }
}

async function createTodo(req, res) {
    try{
        const title = req.body.title;
        let cate = await CateObject.find({ "user": user });
        console.log(cate[0]._id);
        const todoOb = new ToDoObject({
            title: title,
            categories: [cate[0]._id]
        })
        let data = await todoOb.save();
        res.status(200).send({success: true, data})
    }catch (err) { res.status(404).send(err) }
}

async function getTodoById(req, res) {
    try{
        const id = req.params.id;
        let data = await ToDoObject.find({_id: id});
        res.status(200).send({success: true, data});
    }catch (err) { res.status(404).send(err) }
}
async function updateTodoById(req, res) {
    try{
        const id = req.params.id;
        const title = req.body.title;
        let data = await ToDoObject.update({_id: id},{$set: {title: title}});
        res.status(200).send({success: true, data});
    }catch (err) { res.status(404).send(err) }
}

async function changeStatusTodo(req, res) {
    try{
        const id = req.params.id;
        let obCompleted = await ToDoObject.findById(id);
        let data = await ToDoObject.findByIdAndUpdate(id,{
            $set: { completed: !obCompleted}
        },{new:true})
        res.status(200).send({success: true, data});
    }catch (err) { res.status(404).send(err) }
}
async function deleteTodoById(req, res) {
    try{
        const id = req.params.id;
        let data = await ToDoObject.remove({_id: id});
        res.status(200).send({success: true, data});
    }catch (err) { res.status(404).send(err) }
}

module.exports = {
    postRegis,
    createCate,
    getCate,
    getCateById,
    updateCateById,
    deleteCateById,
    getTodosById,
    createTodo,
    getTodoById,
    updateTodoById,
    changeStatusTodo,
    deleteTodoById
}