var mysql = require("mysql")
connectionString = "mysql://root:cdfvagps@localhost:3306/teste"
// connectionString = mysql.createConnection({
	// host     : 'localhost',
	// port     : 3306,
	// user     : 'root',
	// password : 'cdfvagps',
	// database : 'teste'
// }

db = {}
db.cnn = {}
db.cnn.exec = function(query, callback){
	var connection = mysql.createConnection(connectionString);
	connection.query(query, function(err, rows){
		callback(rows, err)
		connection.end()
	})
}

var App = {
	db
}


module.exports = App;