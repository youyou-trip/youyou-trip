/**
 * 将城市信息存储进数据库
 * 仅可执行一次
 */

var fs = require('fs');

module.exports = function (connection) {

    var city_data = fs.readFileSync(__dirname + '/../city-info.json', 'utf8');
    city_data = JSON.parse(city_data)
    
    let createCitysTable = `create table if not exists city_data(
                    city_id INTEGER NOT NULL AUTO_INCREMENT,
                    province VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    pointX VARCHAR(100),
                    pointY VARCHAR(100),
                    station VARCHAR(100),
                    PRIMARY KEY(city_id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

    connection.query(createCitysTable, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
    city_data.forEach(function (item) {
        connection.query('insert ignore into city_data set ?',
            { 'province': item['province'], 'name': item['name'], 'pointX': item['pointX'], 'pointY': item['pointY'], 'station': JSON.stringify(item['station']) }
            , function (error, results, fields) {
                if (error) throw error;
                // console.log('The solution is: ', results);
            });
    })
}
