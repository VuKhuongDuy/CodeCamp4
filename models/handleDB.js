var mongoose = require('mongoose');

const mongoPath = process.env.mongoPath || 'localhost';
const mongoPort = process.env.mongoPort || 27017;

let connection = mongoose.createConnection(`mongodb://${mongoPath}:${mongoPort}/CodeCamp4`, {useNewUrlParser: true}, function(err){
    if(err) console.log(err);
    else console.log('Connect success');
})

const UserObject = new mongoose.Schema({
    username: {type: String, require: true, trim: true},
    password: {type: String, require: true, trim: true},
    created: {
        type: Date,
        default: Date.now
    }
})

const CateObject = new mongoose.Schema({
    name: {type: String, require: true, trim: true},
    user: UserObject,
    completed: false,
    created: {
        type: Date,
        default: Date.now
    }
})

const TodoObject = new mongoose.Schema({
    title: {type: String, require: true, trim: true},
    user: UserObject,
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CateObject'
    }],
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const user = connection.model('UserObject',UserObject);
const cate = connection.model('CateObject',CateObject);
const todo = connection.model('TodoObject',TodoObject);

module.exports = {
    user,
    cate,
    todo,
}