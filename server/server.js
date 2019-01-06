require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();
const port = process.env.PORT;

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
});0

//GET /todos/1234324
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(todo){
            res.status(200).send({todo, test: 'hello'});
        }
        else{
            res.status(404).send();
        }
        
    }).catch((e) => {
        res.status(400).send();
    });    
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndDelete(id).then((todo) => {
        if(todo){
            res.status(200).send({todo, test: 'hello'});
        }
        else{
            res.status(404).send();
        }
        
    }).catch((e) => {
        res.status(400).send();
    });      
});


app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

//Lecture: 82 - 0:00

app.listen(port, () => {
    console.log('App listening at port', port);
});

//For testing
module.exports = {app};