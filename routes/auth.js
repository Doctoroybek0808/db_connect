const Joi = require('joi');
const {generateAuthToken} = require('../models/user');
const express = require('express');
const router = express.Router();
const db = require('./db')
 
router.post('/', async (req, res) => {
  let user;
  const { error } = validate(req.body); 
  
  if (error) return res.status(400).send(error.details[0].message);

  await db.getUserByEmail(req.body.email,(response)=>{

     user = response.rows[0];
     if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = req.body.password === user.password ? true : false;
    if (!validPassword) return res.status(400).send('Invalid email or password.');
  
    const token = generateAuthToken(user);
    return res.status(200).send(token);;
  });

});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
