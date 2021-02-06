require("dotenv").config();
const users = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../middleware/error')
const express = require('express')

module.exports = function(app){
    app.use(express.json())
    app.get('/', (req, res) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
    })
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error)
}