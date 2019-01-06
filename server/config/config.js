var env = process.env.NODE_ENV || 'development'; //In production, this will be set to 'production' by Heroku, for testing this will be set to 'test' while running using mocha (package.json)
//console.log('env ******', env);

if(env === 'development') {
    process.env.port = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.port = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}