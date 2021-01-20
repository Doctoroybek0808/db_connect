const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const users = require('./routes/users')
const {User, validate} = require('./models/user')
const port = 3000

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

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})