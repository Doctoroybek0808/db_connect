const express = require('express')
const app = express()
require('./startup/routes')(app)
require('./startup/logging')

const port = 3001

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})