/**
 * 将景点信息存入数据库
 * 仅可执行一次
 */

var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '650314',
    database: 'my_db'
});

connection.connect();

var data = fs.readFileSync(__dirname + '../baiduSights.json', 'utf8')
data = data.replace(/\]\[/g, function () {
    return ','
})

data = JSON.parse(data)

let createSightsTable = `create table if not exists sight_data(
                    sight_id INTEGER NOT NULL AUTO_INCREMENT,
                    name VARCHAR(100) NOT NULL,
                    catalogID INT NOT NULL,
                    std_tag VARCHAR(100),
                    addr VARCHAR(1000),
                    area_name VARCHAR(1000),
                    diPointX VARCHAR(50), 
                    diPointY VARCHAR(50),
                    PRIMARY KEY(sight_id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

let createSightsDetailTable = `create table if not exists sight_detail_data(
                    detail_id INTEGER NOT NULL AUTO_INCREMENT,
                    d_sight_id INTEGER,
                    image VARCHAR(1000),
                    link VARCHAR(1000),
                    overall_rating DOUBLE,
                    short_desc VARCHAR(100),
                    std_tag VARCHAR(100),
                    tag VARCHAR(20),
                    mapsearchaladdin VARCHAR(1000),
                    FOREIGN KEY(d_sight_id) REFERENCES sight_data(sight_id) ON DELETE SET NULL ON UPDATE CASCADE,
                    PRIMARY KEY(detail_id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
connection.query(createSightsTable, function (err, results, fields) {
    if (err) {
        console.log(err.message);
    }
});
// connection.query(createSightsDetailTable, function (err, results, fields) {
//     if (err) {
//         console.log(err.message);
//     }
// });
data.forEach(function (item) {
    connection.query('insert ignore into sight_data set ?',
        { 'name': item['name'], 'catalogID': item['catalogID'], 'std_tag': item['std_tag'], 'addr': item['addr'], 'area_name': item['area_name'], 'diPointX': item['diPointX'], 'diPointY': item['diPointY'] }
        , function (error, results, fields) {
            if (error) throw error;
            // console.log('The solution is: ', results);
        });
})



connection.end();
