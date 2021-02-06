const Pool = require('pg').Pool;

  const conn = {
                host: '192.168.2.65',
                user: 'postgres',
                database: 'node_test',
                port: 5432,
                password: 'postgresss',
               }
const pool = new Pool(conn)
module.exports = pool