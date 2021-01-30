require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const users = require('./routes/users')
const auth = require('./routes/auth')
const {User, validate} = require('./models/user')
const port = 3001

console.log('NODE_CONFIG_DIR: ',process.env.jwtPrivateKey);
if(!process.env.jwtPrivateKey){
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.use('/api/users', users)
app.use('/api/auth', auth)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})