var express = require('express');
var http = require('http');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
// var Passport = passport.Passport;
// var userPass = new Passport();
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Address = require('../models/address');
var queries = require('../constants/queries.js');
var constants = require('../constants/constants.js');
var bcrypt = require('bcryptjs')
const saltRounds = 10;

var errors;

/* Register page. */
router.get('/register', function(req, res) {
    console.log('Register page');
    res.status(200).json({response: "success"});
});

/* Register user. */
router.post('/register', function(req, res) {

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
	var cellphone = req.body.cellphone;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Primary validation
	var name_val  = req.checkBody('name', "O campo 'Nome' é obrigatório.").notEmpty();
	var name2_val = req.checkBody('name2', "O campo 'Sobrenome' é obrigatório.").notEmpty();
	var cpf_val   = req.checkBody('cpf', "O campo 'CPF' é obrigatório.").notEmpty();
	var email_val = req.checkBody('email', "O campo 'E-Mail' é obrigatório.").notEmpty();
	var pass_val  = req.checkBody('password', "O campo 'Senha' é obrigatório.").notEmpty();
	var birth_val = req.checkBody('birthdate', "O campo 'Data de Nascimento' é obrigatório.").notEmpty();
	var phone_val = req.checkBody('phone', "O campo 'Telefone' é obrigatório.").notEmpty();

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

	if (birth_val.validationErrors.length == 0)
	{
		var birth_val2 = req.checkBody('birthdate', "Data de nascimento inválida.").isDate();

		if (birth_val2.validationErrors.length == 0)
		{
			overEighteen = (new Date(today - new Date(birthdate)).getFullYear() - 1970 >= 18);
		}
	}

	if (phone_val.validationErrors.length == 0)
	{
		req.checkBody('phone', "Telefone inválido").isNumeric();
	}

	// Push errors into variable
	errors = req.validationErrors();

	// Age verification
	if(!overEighteen)
	{
		errors.push(
		{
			param: 'birthdate',
			msg: 'Você deve ter mais de 18 anos para se cadastrar.',
			value: "underage"
		});
	}

	// If there were errors, they will be thrown into registration page
	if(errors){

		errors[errors.length - 1]["hasErrors"] = true;

		console.log(errors);
		res.json(errors);

	// Otherwise...
	} else {

		// Checks for database errors
		req.check('email', 'Já existe um usuário cadastrado com este E-Mail').isEmailORCpfAvailable();
		req.check('cpf', 'Já existe um usuário cadastrado com este CPF').isEmailORCpfAvailable();

		// This is necessary to validate asynchronous errors
		req.asyncValidationErrors()
		.then(function() {

		// Parses birthdate to MySQL format.
		var parsedDate = new Date(birthdate);
		birthdate = parsedDate.getFullYear() + "-"
				  + parsedDate.getMonth() + "-"
				  + parsedDate.getDate();

		// Populating User Model
		var newUser = new User({
			name: name,
			name2: name2,
			email: email,
			cpf: cpf,
			birthdate: birthdate,
			phone: phone,
			cellphone: cellphone,
			password: password
		});

		// If everything went OK, respond with user data
		res.status(200).json(newUser);

		// Else, throw database errors
		})
		.catch(function(errors) {
		  res.json(errors);
		});

	};
});

router.post('/register_2', function(req, res) {

	var input = JSON.parse(JSON.stringify(req.body));

	// Getting address inputs
	var state = req.body.state;
	var street = req.body.street;
	var zipcode = req.body.zipcode;
	var number = req.body.number;
	var complemento = req.body.complement;
	var city = req.body.city;
	var bairro = req.body.bairro;

	// Primary validation
	var state_val     = req.checkBody('state', "O campo 'Estado' é obrigatório.").notEmpty();
	var street_val    = req.checkBody('street', "O campo 'Rua' é obrigatório.").notEmpty();
	var zipcode_val   = req.checkBody('zipcode', "O campo 'CEP' é obrigatório.").notEmpty();
	var city_val 	  = req.checkBody('city', "O campo 'Cidade' é obrigatório.").notEmpty();
	var bairro_val 	  = req.checkBody('bairro', "O campo 'Bairro' é obrigatório.").notEmpty();

	// Secondary validation
	if (state_val.validationErrors.length == 0)
	{
		req.checkBody('state', "O Estado inserido não é válido.").isAlpha();
	};

	if (zipcode_val.validationErrors.length == 0)
	{
		req.checkBody('zipcode', "O campo 'CEP' contém caracteres inválidos.").isNumeric();
	}

	// if (street_val.validationErrors.length == 0)
	// {
	// 	req.checkBody('street', "O campo 'Rua' contém caracteres inválidos.").isAscii();
	// }

	// if (city_val.validationErrors.length == 0)
	// {
	// 	req.checkBody('city', "O campo 'Cidade' contém caracteres inválidos.").isAscii();
	// }

	// if (bairro_val.validationErrors.length == 0)
	// {
	// 	req.checkBody('bairro', "O campo 'Bairro' contém caracteres inválidos.").isAlpha();
	// }

	// console.log("Passei daqui BAIRRO!");

	// Push errors into variable
	errors = req.validationErrors();

	// If there were errors, they will be thrown into address page
	if(errors){

		res.json(errors);

	// Otherwise...
	} else {

		// Create address model and send to confirmation page
		var newAddress = new Address(req.body);
		res.status(200).json(newAddress);

	};
});

// Store user and address data into DB
router.post('/register_3', function(req, res) {

	var newUser = req.body.userData;
	var newAddress = req.body.addressData;

	// Asynchronous method to hashify password
	bcrypt.genSalt(10, function(err, salt) {

		var userId;
		var addressId;

		// DB Inserts
	    bcrypt.hash(newUser.hash_senha, salt, function(err, hash) {
	        newUser.hash_senha = hash;

	        var userQuery = "("  +"'"+ newUser.nome_cliente 	 + "'"  +", "
		        		 +"'"+ newUser.sobrenome_cliente + "'"  +", "
		        		 +"'"+ newUser.email_cliente 	 + "'"  +", "
		        		 +"'"+ newUser.hash_senha  		 + "'"  +", "
		        		 +"'"+ newUser.cpf_cliente 		 + "'"  +", "
		        			 + 'NULL' 					        +", "
		        		 +"'"+ newUser.member_since 	 + "'"  +", "
		        		 +"'"+ newUser.tel_fixo 		 + "'"  +", "
		        		 +"'"+ newUser.tel_cel 			 + "'"  +", "
		        		 +"'"+ newUser.data_nasc 		 + "'"  +", "
		        		     + "'M'" + ")"

			req.getConnection(function(err,connection){
		        if(err) return res.status(400).json(err);

		        connection.query(queries.queries.register + userQuery
		        	 ,[],function(err,result){
			        	 if(err) throw err;

			        	 console.log("USER INSERT FULLFILED!");
		        });

		        connection.query(queries.queries.insert_new_address(newAddress.pais_end,
		        	newAddress.estado_end, newAddress.cidade_end, newAddress.bairro_end,
		        	newAddress.cep_end, newAddress.rua_end, newAddress.numero_end,
		        	newAddress.complemento_end)
		        	,[],function(err, result){
		        		if(err) throw err;

		        		console.log("ADDRESS INSERT FULLFILED!")
		        	});

		        connection.query(queries.queries.fetch_user_id(newUser.cpf_cliente)
		        	 ,[],function(err,result){
			        	 if(err) throw err;

			        	 userId = result[0].id_cliente;

			        	 console.log("USER_ID SUCCESSFULLY FETCHED: " + userId);
		        });

		        connection.query(queries.queries.fetch_address_id(newAddress.pais_end,
		        	newAddress.estado_end, newAddress.cidade_end, newAddress.bairro_end,
		        	newAddress.cep_end, newAddress.rua_end, newAddress.numero_end,
		        	newAddress.complemento_end)
		        	,[],function(err, result){
		        		if(err) throw err;

		        		addressId = result[0].id_endereco;

		        		console.log("ADDRESS_ID SUCCESSFULLY FETCHED: " + addressId);

		        		connection.query(queries.queries.insert_user_address(userId, addressId),
			        	[],function(err, result){
			        		if(err) throw err;

			        		console.log("USER AND ADDRESS SUCCESSFULLY LINKED!");
			        	});
		        	});
			});
	    });
	});

	res.status(200).json({status: "success"});

});

passport.serializeUser(function(user, done) {
  done(null, user.id_cliente);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
  },
  function(email, password, done) {

  	console.log("Estou no GETUSERBYEMAIL");
  	User.getUserByEmail(email, function(err, user){
  		if(err) throw(err);

  		if(!user)
		{
			return done(null, false, {message: "Usuário não cadastrado"})
		};

  		console.log("Segundo printe");

  		User.checkPassword(password, user.hash_senha, function(err2, isMatch){

  			console.log("Entrei no check password");
  			if(err2) throw(err2);

  			if(isMatch)
  			{
  				console.log(user);
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

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user)
    {
    	// return res.redirect('/login');
    	return res.status(200).json(user);
    }

    req.logIn(user, function(err) {
      console.log(err);
      if (err) { return next(err); }

      console.log("DENTRO DO LOGIN");
      var token = jwt.sign({id_cliente: user.id_cliente, email_cliente:user.email_cliente, classe: "cliente"}, constants.jwt_param.secret);

      user.token = token;

      req.session.user = user;
      req.session.token = token;

      console.log(req.session);

      console.log(user);
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {

	console.log('Eu estou fazendo logout');

	req.logOut();
	req.session.destroy(function(err){
		if (err) { return next(err); }

		res.redirect('/#/');
	})
});

router.get('/get_session', function(req,res) {
	return res.status(200).json(req.session);
});

module.exports = router;