const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();


const users = [{
    _id: userOneId,
    email: 'dk@ok.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'test@ok.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]    
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const populateTodos = (done) => { //done because of middleware, where it is called
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => { //done because of middleware, where it is called
    User.deleteMany({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]); //When all done
    }).then(() => done());
};

module.exports = {populateTodos, todos, users, populateUsers};