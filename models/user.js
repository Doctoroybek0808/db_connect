const Joi = require('joi');
const config = require('config')
const jwt = require('jsonwebtoken');
function validateUser(user){
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user, schema);
}

generateAuthToken = function(user){
    const token = jwt.sign({_id: user.id, isAdmin: user.admin }, 'mySecureKey');
    return token;
}
exports.generateAuthToken = generateAuthToken;
exports.validate = validateUser;