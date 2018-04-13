/**
 * 将景点信息存入数据库
 * 执行前需要将数据库中的数据删除
 */

var fs = require('fs');
var getSights = require('./getSightData');

module.exports = function (connection) {

    var data = fs.readFileSync(__dirname + '/../baiduSights.json', 'utf8');
    if (!data) {
        getSights();
        data = fs.readFileSync(__dirname + '/../baiduSights.json', 'utf8');
    }
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
                    overall_rating VARCHAR(5),
                    comment_num INTEGER,
                    image VARCHAR(500),
                    link TEXT,
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
        let info = item['ext']['detail_info'] ? JSON.parse(JSON.stringify(item['ext']['detail_info'])) : ''
        connection.query('insert ignore into sight_data set ?',
            {
                'name': item['name'],
                'std_tag': item['std_tag'],
                'addr': item['addr'],
                'area_name': item['area_name'],
                'diPointX': item['diPointX'],
                'diPointY': item['diPointY'],
                'overall_rating': info ? info['overall_rating'] : '',
                'comment_num': info ? (info['comment_num'] ? Number(info['comment_num']) : 0) : 0,
                'image': info ? info['image'] : '',
                'link': info ? JSON.stringify(info['link']) : '',
                'short_desc': info ? JSON.stringify(info['short_desc']) : '',
                'tag': info ? info['tag'] : '',
                'brief_ticket': info ? JSON.stringify(info['brief_ticket']) : '',
                'mapsearchaladdin': info ? JSON.stringify(info['mapsearchaladdin']) : ''
            }
            , function (error, results, fields) {
                if (error) throw error;
                // console.log('The solution is: ', results);
            });
    })
}
