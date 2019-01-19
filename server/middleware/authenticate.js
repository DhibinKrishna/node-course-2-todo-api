var {User} = require('./../models/user');

//Middleware for authentication, can be used wherever required
var authenticate = (req, res, next) => {
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject(); //so it will be caught in the catch()
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send(); //Unauthorized
    });
};

module.exports = {authenticate};