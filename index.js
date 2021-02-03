
require("dotenv").config();
require("express-async-errors");
const express = require('express')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const auth = require('./routes/auth')
const {User, validate} = require('./models/user')
const error = require('./middleware/error')

const app = express()
const port = 3001

// console.log('NODE_CONFIG_DIR: ',process.env.jwtPrivateKey);
// if(!process.env.jwtPrivateKey){
//   console.error('FATAL ERROR: jwtPrivateKey is not defined');
//   process.exit(1);
// }
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (req, res) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.use('/api/users', users)
app.use('/api/auth', auth)

app.use(error)
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})