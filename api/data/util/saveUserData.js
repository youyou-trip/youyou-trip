var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '650314',
    database: 'my_db'
});

connection.connect();

let createUserTable = `create table if not exists user_data(
                    id VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    password VARCHAR(100) NOT NULL
                    PRIMARY KEY(id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
connection.query(createUserTable, function (err, results, fields) {
    if (err) {
        console.log(err.message);
    }
});
connection.end();