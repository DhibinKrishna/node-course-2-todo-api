var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();
let port = 3000;

app.use(bodyParser.json()); //Middleware    

//post /todos
app.post('/todos', (req, res) => {
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

//get /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos, test: 'hello'}) /*Send objec as it's more flexible, so we can add custom properties*/
    }, (e) => {
        res.status(400).send(e);
    })
});

// var newTodo = new Todo({
//     text: ' Cook ',
//     completed: false,
//     completedAt: null
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, e => {
//     console.log('Unable to save todo', e);
// });

// var user = new User({
//     email: 'sample@test.com'
// });

// user.save().then((doc) => {
//     console.log('Saved user', doc);
// }, e => {
//     console.log('Unable to save user', e);
// });

app.listen(port, () => {
    console.log('App listening at port', port);
});

//For testing
module.exports = {app};