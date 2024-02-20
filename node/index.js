const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.query("DROP TABLE people", function(err, result) {
    if(err) console.log("No table to be dropped");
    console.log("Table dropped");
});

connection.query("CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key (id))", function(err, result) {
    if(err) throw err;
    console.log("Table created");
});

connection.query("INSERT INTO people(name) values('Hugo')", function(err, result) {
    if(err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
});

let sqlResult;
connection.query("SELECT name FROM people", function(err, result) {
    if(err) throw err;
    sqlResult = result;
});

connection.end();

app.get('/', (req,res) => {
    res.write('<h1>Full Cycle Rocks!!</h1>\n');
    sqlResult.forEach(element => {
        res.write(element.name + "\n");
    });
    res.end();
})

app.listen(port, ()=> {
    console.log('Node server is up and running on port ' + port);
})