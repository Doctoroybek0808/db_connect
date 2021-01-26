const {User, validate} = require('..//models/user')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.2.65',
  database: 'node_test',
  password: 'postgres',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users_table ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users_table WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body

  pool.query('INSERT INTO users_table (username, email, password) VALUES ($1, $2, $3)  Returning id;', [username, email, password], (error, result) => {
    if (error) {
      throw error
    }
    console.log(result.rows[0].id)
    res.status(201).send(`User added with ID: ${result.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email } = request.body

  pool.query(
    'UPDATE users_table SET username = $1, email = $2 WHERE id = $3',
    [username, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}