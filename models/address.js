var queries = require('../constants/queries.js')

var Address = function(address_info){
	this.pais_end = "Brasil";
	this.estado_end = address_info.state;
	this.cidade_end = address_info.city;
	this.bairro_end = address_info.bairro;
	this.cep_end = address_info.zipcode;
	this.rua_end = address_info.street;
	this.numero_end = address_info.number;
	this.complemento_end = address_info.complement;
}

module.exports = Address;
