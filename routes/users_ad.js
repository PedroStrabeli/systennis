var express = require('express');
var http = require('http');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var Passport = passport.Passport;
var adminPassport = new Passport();
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Func = require('../models/func');
var Address = require('../models/address');
var queries = require('../constants/queries.js');
var constants = require('../constants/constants.js');
var bcrypt = require('bcryptjs')
const saltRounds = 10;

var errors;

/* Register user_ad. */
router.post('/register_admin', function(req, res) {

	var today = new Date();
	var overEighteen;
	var input = JSON.parse(JSON.stringify(req.body));

	// Getting user inputs
	var name = req.body.name;
	var name2 = req.body.name2;
	var email = req.body.email;
	var cpf = req.body.cpf;
	var birthdate = req.body.birthdate;
	var phone = req.body.phone;
	var password = req.body.password;
	var password2 = req.body.password2;

	var cargo = req.body.cargo;
	var depto = req.body.depto;
	var supervisor = req.body.supervisor;

	if (supervisor)
	{
		nome_supervisor = req.body.supervisor.nome_func;
		id_supervisor = req.body.supervisor.id_func;
	}

	// Primary validation
	var name_val  = req.checkBody('name', "O campo 'Nome' é obrigatório.").notEmpty();
	var name2_val = req.checkBody('name2', "O campo 'Sobrenome' é obrigatório.").notEmpty();
	var cpf_val   = req.checkBody('cpf', "O campo 'CPF' é obrigatório.").notEmpty();
	var email_val = req.checkBody('email', "O campo 'E-Mail' é obrigatório.").notEmpty();
	var pass_val  = req.checkBody('password', "O campo 'Senha' é obrigatório.").notEmpty();
	// var birth_val = req.checkBody('birthdate', "O campo 'Data de Nascimento' é obrigatório.").notEmpty();
	var phone_val = req.checkBody('phone', "O campo 'Telefone' é obrigatório.").notEmpty();

	req.checkBody('cargo', "O campo 'Cargo' é obrigatório").notEmpty();
	req.checkBody('depto', "O campo 'Departamento' é obrigatório").notEmpty();
	req.checkBody('supervisor', "O campo 'Supervisor' é obrigatório").notEmpty();

	// Secondary validation
	if (email_val.validationErrors.length == 0)
	{
		req.checkBody('email', "O E-Mail inserido não é válido.").isEmail();
	};

	if (pass_val.validationErrors.length == 0)
	{
		var pass2_val = req.checkBody('password2', "As senhas não conferem.").equals(req.body.password);

		if (pass2_val.validationErrors.length == 0)
		{
			req.checkBody({'password': { isLength: { options: [{ min: 6, max: 20 }],
				errorMessage: 'A senha deve possuir entre 6 e 20 caracteres'}}});
		}
	}

	// if (birth_val.validationErrors.length == 0)
	// {
	// 	var birth_val2 = req.checkBody('birthdate', "Data de nascimento inválida.").isDate();

	// 	if (birth_val2.validationErrors.length == 0)
	// 	{
	// 		overEighteen = (new Date(today - new Date(birthdate)).getFullYear() - 1970 >= 18);
	// 	}
	// }

	if (phone_val.validationErrors.length == 0)
	{
		req.checkBody('phone', "Telefone inválido").isNumeric();
	}

	// Push errors into variable
	errors = req.validationErrors();

	// Age verification
	// if(!overEighteen)
	// {
	// 	errors.push(
	// 	{
	// 		param: 'birthdate',
	// 		msg: 'Você deve ter mais de 18 anos para se cadastrar.',
	// 		value: "underage"
	// 	});
	// }

	// If there were errors, they will be thrown into registration page
	if(errors){

		errors[errors.length - 1]["hasErrors"] = true;

		// console.log(errors);
		res.json(errors);

	// Otherwise...
	} else {

		// Checks for database errors
		req.check('email', 'Já existe um funcionário cadastrado com este E-Mail').isEmailORCpfAvailableFunc();
		req.check('cpf', 'Já existe um funcionário cadastrado com este CPF').isEmailORCpfAvailableFunc();

		// This is necessary to validate asynchronous errors
		req.asyncValidationErrors()
		.then(function() {

		// Parses birthdate to MySQL format.
		// var parsedDate = new Date(birthdate);
		// birthdate = parsedDate.getFullYear() + "-"
		// 		  + parsedDate.getMonth() + "-"
		// 		  + parsedDate.getDate();

		// Sending func data
		var newFunc = {
			nome_func: name,
			sobrenome_func: name2,
			cargo_func: cargo,
			departamento_func: depto,
			email_func: email,
			cpf_func: cpf,
			tel_func: phone,
			password_tbh: password,
			id_supervisor: id_supervisor,
			supervisor_func: nome_supervisor
		};

		// If everything went OK, respond with user data
		res.status(200).json(newFunc);

		// Else, throw database errors
		})
		.catch(function(errors) {
		  res.json(errors);
		});

	};
});

// Gets supervisor for autofilling
router.post('/get_supervisor', function(req, res) {

	var filtro_depto = req.body.filtro_depto;
	var filtro_cargo = req.body.filtro_cargo;

	console.log("Meu filtro_depto eh: " + filtro_depto + " e meu filtro_cargo eh: " + filtro_cargo);

	req.getConnection(function(err,connection){
        if(err) return res.status(400).json(err);

        connection.query(queries.queries.fetch_supervisors(filtro_depto, filtro_cargo)
        	 ,[],function(err,result){
	        	 if(err) throw err;

	        	 return res.status(200).json(result);
        });
    });
});

// Store user and address data into DB
router.post('/register_admin_3', function(req, res) {

	var newUser = req.body.userData;

	// Asynchronous method to hashify password
	bcrypt.genSalt(10, function(err, salt) {

		var userId;
		// DB Insert
	    bcrypt.hash(newUser.password_tbh, salt, function(err, hash) {
	        newUser.hash_senha = hash;
	        delete newUser.password_tbh;

	        console.log(newUser);

	        var funcQuery = queries.queries.insert_new_func(newUser.nome_func,
	        	newUser.sobrenome_func, newUser.cpf_func, newUser.cargo_func,
	        	newUser.departamento_func, newUser.hash_senha,
	        	newUser.id_supervisor, newUser.tel_func, newUser.email_func);

	        console.log(funcQuery);

			req.getConnection(function(err,connection){
		        if(err) return res.status(400).json(err);

		        connection.query(funcQuery
		        	 ,[],function(err,result){
			        	 if(err) throw err;

			        	 console.log("FUNC INSERT FULLFILED!");
		        });
			});
	    });
	});

	res.status(200).json({status: "success"});

});

adminPassport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
  },
  function(email, password, done) {

  	console.log("Hum");
  	Func.getFuncByEmail(email, function(err, user){
  		if(err) throw(err);

  		if(!user)
		{
			return done(null, false, {message: "Funcionário não cadastrado"})
		};

  		console.log("Segundo printe");

  		Func.checkPassword(password, user.hash_senha, function(err, isMatch){

  			console.log("Entrei no check password");
  			if(err) throw(err);

  			if(isMatch)
  			{
  				return done(null, user);
  			}
  			else
  			{
  				return done(null, false, {message: "Senha incorreta"})
  			}
  		});
  	});
  }
));

adminPassport.serializeUser(function(user, done) {
  done(null, user.id_func);
});

adminPassport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login_admin', function(req, res, next) {
  adminPassport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user)
    {
    	// return res.redirect('/login');
    	return res.status(200).json(user);
    }

    console.log(user.id_func);

    var token = jwt.sign({id_func: user.id_func, email_func:user.email_func, classe: "funcionario"}, constants.jwt_param.secret);

	req.session.func = user;
	req.session.token = token;

	console.log(req.session);

	return res.status(200).json(user);

    // req.logIn(user, function(err) {

    //   if (err) { return next(err); }

    //   console.log(user.id_func);
    //   var token = jwt.sign({id_func: user.id_func, email_func:user.email_func, classe: "funcionario"}, constants.jwt_param.secret);

    //   // user.token = token;

    //   req.session.func = user;
    //   req.session.token = token;

    //   console.log(user);
    //   return res.status(200).json(user);
    // });
  })(req, res, next);
});

router.get('/get_session_ad', function(req,res) {
	return res.status(200).json(req.session);
});

router.get('/logout_ad', function(req, res) {

	console.log('Eu estou fazendo logout');

	req.session.destroy(function(err){
		if (err) { return next(err); }

		res.redirect('/#/');
	})
});

module.exports = router;