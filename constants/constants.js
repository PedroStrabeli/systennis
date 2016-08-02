var db_param={}

db_param.host= 'localhost';
db_param.user= 'root';
db_param.password= '1moskva1';
db_param.port= 3306; //port mysql
db_param.database= 'systennis_db';

exports.db_param = db_param;

var jwt_param = {};

jwt_param.secret='nosepass';

exports.jwt_param = jwt_param;