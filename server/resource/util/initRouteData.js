/**
 * 存储路线信息
 */
var fs = require('fs');

module.exports = function (connection) {

    let createRouteTable = `create table if not exists route_data(
                    route_id INTEGER NOT NULL AUTO_INCREMENT,
                    user_id VARCHAR(100) NOT NULL,
                    date DATE NOT NULL,
                    start VARCHAR(50) NOT NULL,
                    end VARCHAR(50) NOT NULL,
                    passCity TEXT,
                    sights TEXT,
                    comment TEXT,
                    FOREIGN KEY (user_id) REFERENCES user_data(id),
                    PRIMARY KEY(route_id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    connection.query(createRouteTable, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
}