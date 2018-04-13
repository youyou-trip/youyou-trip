var fs = require('fs');

module.exports = function (connection) {

    let createUserTable = `create table if not exists user_data(
                    id VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    PRIMARY KEY(id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    connection.query(createUserTable, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
}
