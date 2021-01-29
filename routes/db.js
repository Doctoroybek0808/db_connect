const {generateAuthToken, validate} = require('..//models/user')
const _ = require('lodash');

const Pool = require('pg').Pool;
const conn   = {
  host: '192.168.2.65',
  user: 'postgres',  
  database: 'node_test',
  port: 5432,
  password: 'postgres123',  
}
const pool = new Pool(conn);

const getUsers = async (request, response) => {  
  await pool.query('SELECT * FROM users_table ORDER BY id ASC', (error, results) => {
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
    if(results.rows.length ===0 ) return response.status(404).json({status: 404, message:"User not found"})
    response.status(200).json(results.rows)
  })
}
async function getUserByEmail(email, callback) {
  let response;
  try
  {
    response = await pool.query('SELECT * FROM users_table WHERE email = $1 limit 1', [email]);
    callback(response);
  }
  catch(error)
  {
    throw error;
  }
}

const createUser = async (req, res) => {
  var {error} = validate(req.body);
  if(error)   return  res.status(400).send(`Error ${JSON.stringify(error.details[0].message)}` )
  const { username, email, password } = req.body
  await getUserByEmail(req.body.email,(response)=>{

    user = response.rows[0];
    if (user) return res.status(400).send('User already registered.');

    user = _.pick(req.body, ['username', 'email', 'passwod']);
    pool.query('INSERT INTO users_table (username, email, password) VALUES ($1, $2, $3)  Returning id;', [username, email, password], (error, result) => {
      if (error) {
        throw error
      }
      console.log(result.rows[0].id)
      const token = generateAuthToken(user);
      res.header('x-auth-token', token).send(`User added with ID: ${result.rows[0].id}`)

    })
  });
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

  pool.query('DELETE FROM users_table WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
}