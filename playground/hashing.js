const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => { //No of rounds. This will also add a delay, to avoid any brute force attacks
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash); //The hash has the salt built in
    });
});

let hashedPassword = '$2a$10$fb9zZ5nE9LY0u992yrpWGOyKjjJ62T8gEgfKnNsi6ABiF361T54Jy';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

/*
let data = {
    id: 10
};

let token = jwt.sign(data, '123abc');
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log(decoded);
*/

/*
let message = 'I am user number 3';
let hash = SHA256(message).toString();

console.log('Message', message);
console.log('Hash', hash);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust');
}
*/