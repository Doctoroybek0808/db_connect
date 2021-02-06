require("express-async-errors");
const winston = require('winston')

module.exports = function(){
    process.on('unhandled Rejection', (ex)=>{  
        throw ex; 
      })
      winston.handleExceptions(
          new winston.transports.Console({colorize:true, pretty:true}),
          new winston.transports.File({filename:'uncaughtException.log'})
      )
      winston.add(winston.transports.File, {filename:'error.log'})
}