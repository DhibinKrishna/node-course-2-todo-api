//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let user = {name: 'Raju', age: 9};
// let {name} = user;
// console.log(name);

// let obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/', {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         console.log('Unable to insert tod', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Raju',
        age: 8,
        location: 'Forest'
    }, (err, result) => {
        if(err){
            console.log('Unable to insert tod', err);
        }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    });    

    client.close();
});