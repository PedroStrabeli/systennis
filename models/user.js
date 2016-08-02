var bcrypt = require('bcryptjs');
var queries = require('../constants/queries.js');
var constants = require('../constants/constants.js');
const saltRounds = 10;

var mysql = require('mysql');
var connection  = require('express-myconnection');

var User = function(user_info){
	this.nome_cliente = user_info.name;
	this.sobrenome_cliente = user_info.name2;
	this.email_cliente = user_info.email;
	this.hash_senha = user_info.password;
	this.cpf_cliente = user_info.cpf;
	this.rg_cliente = user_info.rg;
	this.tel_fixo = user_info.phone;
	this.tel_cel = user_info.cellphone;
	this.data_nasc = user_info.birthdate;
	this.sexo_cliente = user_info.gender;
	this.member_since = new Date().toJSON().slice(0,10);
}

module.exports = User;

module.exports.createUser = function(newUser){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.hash_senha, salt, function(err, hash) {
	        newUser.hash_senha = hash;

	        return newUser;
	    });
	});
}

module.exports.getUserByEmail = function(email, callback){
	var con = mysql.createConnection(
      {
        host: constants.db_param.host,
        user: constants.db_param.user,
        password : constants.db_param.password,
        port : constants.db_param.port, //port mysql
        database: constants.db_param.database
      });

	con.query(queries.queries.fetch_user_by_email(email),[],
        function(err, result){
          if(err) throw err;

          console.log("Estou retornando a query getUserByEmail");

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

module.exports.getUserById = function(id, callback){
	var con = mysql.createConnection(
      {
        host: constants.db_param.host,
        user: constants.db_param.user,
        password : constants.db_param.password,
        port : constants.db_param.port, //port mysql
        database: constants.db_param.database
      });

	con.query(queries.queries.fetch_user_by_id(id),[],
        function(err, result){
          if(err) throw err;

          console.log(result[0]);

          console.log("Estou retornando a query getUserById");

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