const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require('./db')
router.get('/', db.getUsers)
router.get('/:id', db.getUserById)
router.post('/', db.createUser)
router.put('/:id', db.updateUser)
router.delete('/:id', db.deleteUser)

module.exports = router;