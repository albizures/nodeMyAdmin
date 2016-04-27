
const mysql = require('mysql'),
  connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root'
});

connection.connect();

connection.query('SHOW DATABASES', function(err, rows, fields) {
  if (err) throw err;
  console.log('result is ', rows);
});

connection.end();
