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

var data = fs.readFileSync(__dirname + '/../baiduSights.json', 'utf8')
data = data.replace(/\]\[/g, function () {
    return ','
})

data = JSON.parse(data)

let createSightsTable = `create table if not exists sight_data(
                    sight_id INTEGER NOT NULL AUTO_INCREMENT,
                    name VARCHAR(100) NOT NULL,
                    std_tag VARCHAR(100),
                    addr VARCHAR(1000),
                    area_name VARCHAR(1000),
                    diPointX VARCHAR(50), 
                    diPointY VARCHAR(50),
                    image VARCHAR(500),
                    link TEXT,
                    overall_rating VARCHAR(5),
                    short_desc TEXT,
                    tag VARCHAR(50),
                    brief_ticket TEXT,
                    mapsearchaladdin TEXT,
                    PRIMARY KEY(sight_id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

connection.query(createSightsTable, function (err, results, fields) {
    if (err) {
        console.log(err.message);
    }
});
data.forEach(function (item) {
    connection.query('insert ignore into sight_data set ?',
        {
            'name': item['name'],
            'std_tag': item['std_tag'],
            'addr': item['addr'],
            'area_name': item['area_name'],
            'diPointX': item['diPointX'],
            'diPointY': item['diPointY'],
            'image': item['ext']['detail_info']['image'],
            'link': JSON.stringify(item['ext']['detail_info']['link']),
            'overall_rating': item['ext']['detail_info']['overall_rating'],
            'short_desc': JSON.stringify(item['ext']['detail_info']['short_desc']),
            'tag': item['ext']['detail_info']['tag'],
            'brief_ticket': JSON.stringify(item['ext']['detail_info']['brief_ticket']),
            'mapsearchaladdin': JSON.stringify(item['ext']['detail_info']['mapsearchaladdin'])
        }
        , function (error, results, fields) {
            if (error) throw error;
            // console.log('The solution is: ', results);
        });
})

connection.end();
