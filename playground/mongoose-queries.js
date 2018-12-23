const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c1f2c72e9311e84e5bc36e311';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id /*mongoose will convert to object id*/
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id /*mongoose will convert to object id*/
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch((e) => {
//     console.log(e);
// });

User.find({
    _id: id /*mongoose will convert to object id*/
}).then((users) => {
    console.log('Users', users);
});

User.findOne({
    _id: id /*mongoose will convert to object id*/
}).then((user) => {
    console.log('User', user);
});

User.findById(id).then((user) => {
    if(!user){
        return console.log('Id not found');
    }
    console.log('User by Id', user);
}).catch((e) => {
    console.log(e);
});