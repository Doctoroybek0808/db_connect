const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require('./db')
router.get('/users', db.getUsers)
router.get('/users/:id', db.getUserById)
router.post('/users', db.createUser)
router.put('/users/:id', db.updateUser)
router.delete('/users/:id', db.deleteUser)

module.exports = router;