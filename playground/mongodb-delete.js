const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //DeleteMany
    //DeleteOne
    //FindOneAndDelete - returns those values deleted

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Raju'}).then((result) => {
    //     console.log(result);
    // });
    
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c0ff67b6d8bb70c586456c8')}).then((result) => {
        console.log(result);
    });    

    client.close();
});