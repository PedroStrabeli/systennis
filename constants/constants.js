var db_param={}

// db_param.host= 'localhost';
// db_param.user= 'root';
// db_param.password= '1moskva1';
// db_param.port= 3306; //port mysql
// db_param.database= 'systennis_db';

db_param.host= 'us-cdbr-iron-east-04.cleardb.net'; //'localhost'; //
db_param.user= 'b5bdd6fcd64dc5';//'root';//
db_param.password= 'd0147f7b';//'1moskva1';//
db_param.port= 3306; //port mysql
db_param.database= 'heroku_910fae008f857a5';//'systennis_db';//


var jwt_param = {};

jwt_param.secret='nosepass';

exports.jwt_param = jwt_param;

exports.db_param = db_param