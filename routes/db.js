const { generateAuthToken, validate } = require('..//models/user')
const _ = require('lodash');

const Pool = require('pg').Pool;
const conn = {
  host: '192.168.2.65',
  user: 'postgres',
  database: 'node_test',
  port: 5432,
  password: 'postgres',
}
const pool = new Pool(conn);

const getUsers = async (req, res) => {
    await pool.query('SELECT * FROM users_table ORDER BY id ASC', (error, results) => {
      console.log('error', error)
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).json(results.rows)
    })  
}

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    await pool.query('SELECT * FROM users_table WHERE id = $1', [id], (error, results) => {
      if (error) {
        return res.status(404).json(error)
      }if(results){
        console.log(results)
      if (results.rows.length === 0) return res.status(404).json({ status: 404, message: "User not found" })

      res.status(200).json(results.rows)
      }
    })
  }
  catch (ex) {
    res.status(500).json(ex.message)
  }
}

const getLogin = async (req, res) => {

    user = _.pick(req.body, ['email', 'password']);
    
    await pool.query('SELECT id FROM users_table WHERE email = $1 and password=$2', [user.email, user.password], (error, results) => {

      if (error) {
        return res.status(500).send(error)
      }
      if (results.rows.length === 0) return response.status(404).json({ status: 404, message: "User not found" })
      user.id = results.rows[0].id;
      const token = generateAuthToken(user);
      res.header('x-auth-token', token);


      res.status(200).send("User signed in")
    }) 
}
async function getUserByEmail(email, callback) {
  let response;
  try {
    response = await pool.query('SELECT * FROM users_table WHERE email = $1 limit 1', [email]);
    callback(response);
  }
  catch (error) {
    res.status(500).json(error.message)
  }
}

const createUser = async (req, res) => {
  try {
    var { error } = validate(req.body);
    if (error) return res.status(400).send(`Error ${JSON.stringify(error.details[0].message)}`)
    const { username, email, password } = req.body
    await getUserByEmail(req.body.email, (response) => {

      user = response.rows[0];
      if (user) return res.status(400).send('User already registered.');

      user = _.pick(req.body, ['username', 'email', 'passwod']);
      pool.query('INSERT INTO users_table (username, email, password) VALUES ($1, $2, $3)  Returning id;', [username, email, password], (error, result) => {
        if (error) {
          response.status(500).send(error)
        }
        console.log(result.rows[0].id)
        const token = generateAuthToken(user);
        res.header('x-auth-token', token).send(`User added with ID: ${result.rows[0].id}`)

      })
    });
  }
  catch (ex) {
    res.status(500).json(ex.message)
  }
}

const updateUser = (request, response) => {
  try {

    const id = parseInt(request.params.id)
    const { username, email } = request.body

    pool.query(
      'UPDATE users_table SET username = $1, email = $2 WHERE id = $3',
      [username, email, id],
      (error, results) => {
        if (error) {
          response.status(500).send(error)
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  catch (ex) {
    res.status(500).json(ex.message)
  }
}
const deleteUser = (request, response) => {
  try {

    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users_table WHERE id = $1', [id], (error, results) => {
      if (error) {
        response.status(500).send(error)
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  catch (ex) {
    res.status(500).json(ex.message)
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getLogin
}