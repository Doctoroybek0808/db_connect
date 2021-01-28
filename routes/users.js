const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require('./db')
const auth = require('../middleware/auth');
router.get('/',auth, db.getUsers)
router.get('/:id', db.getUserById)
router.post('/', db.createUser)
router.put('/:id', db.updateUser)
router.delete('/:id', db.deleteUser)

module.exports = router;