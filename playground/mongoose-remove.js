const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Deprecated
// Todo.remove({}).then((result) => {
//     console.log(result);
// });
//Todo.findOneAndRemove() - Deprecated?
//Todo.findByIdAndRemove() - Deprecated?

//Todo.deleteMany
//Todo.findOneAndDelete
//Todo.findByIdAndDeleted

// Todo.deleteMany({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndDelete({_id: '5c318eddf6846b5b8f53260a'}).then((todo) => {
    console.log(todo);
});

// Todo.findByIdAndDelete('5c318d56f6846b5b8f5325af').then((todo) => {
//     console.log(todo);
// });
