var bcrypt = require('bcryptjs');
var queries = require('../constants/queries.js');
var constants = require('../constants/constants.js');
const saltRounds = 10;

var mysql = require('mysql');
var connection  = require('express-myconnection');

var Func = function(func_info){
}

module.exports = Func;

module.exports.createUser = function(newUser){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.hash_senha, salt, function(err, hash) {
	        newUser.hash_senha = hash;

	        return newUser;
	    });
	});
}

module.exports.getFuncByEmail = function(email, callback){
	var con = mysql.createConnection(
      {
        host: constants.db_param.host,
        user: constants.db_param.user,
        password : constants.db_param.password,
        port : constants.db_param.port, //port mysql
        database: constants.db_param.database
      });

	con.query(queries.queries.fetch_func_by_email(email),[],
        function(err, result){
          if(err) throw err;

          console.log("Estou retornando a query getFuncByEmail");

          if (result)
          {
          	callback(null, result[0])
          }
          else
          {
          	callback(true, null);
          }
        });
};

module.exports.getFuncById = function(id, callback){
	var con = mysql.createConnection(
      {
        host: constants.db_param.host,
        user: constants.db_param.user,
        password : constants.db_param.password,
        port : constants.db_param.port, //port mysql
        database: constants.db_param.database
      });

	con.query(queries.queries.fetch_func_by_id(id),[],
        function(err, result){
          if(err) throw err;

          console.log(result[0]);

          console.log("Estou retornando a query getFuncById");

          if (result)
          {
          	callback(null, result[0])
          }
          else
          {
          	callback(true, null);
          }
        });
};

module.exports.checkPassword = function (plainPassCandidate, hash, callback){

	bcrypt.compare(plainPassCandidate, hash, function(err, isMatch)
	{
	  console.log("A senha bate: " + isMatch);
	  if (err) throw(err);
	  callback(null, isMatch);
	});
};