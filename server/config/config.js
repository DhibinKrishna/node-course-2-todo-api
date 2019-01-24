var env = process.env.NODE_ENV || 'development'; //In production, this will be set to 'production' by Heroku, for testing this will be set to 'test' while running using mocha (package.json)
console.log('env ******', env);

if(env === 'development' || env === 'test') {
    let config = require('./config.json'); //Automatically parsed to an object
    //console.log(config);
    let envConfig = config[env];
    //console.log(Object.keys(envConfig));
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

// if(env === 'development') {
//     process.env.port = 3000;
//     //process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
//     process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.port = 3000;
//     // process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
//     process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
// }