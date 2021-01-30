const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const db = require('./db')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/',auth, db.getUsers)
router.get('/:id', db.getUserById)
router.post('/login', db.getLogin)
router.post('/', db.createUser)
router.put('/:id', db.updateUser)
router.delete('/:id', [auth, admin], db.deleteUser)

module.exports = router;