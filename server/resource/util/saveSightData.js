/**
 * 将景点信息存入数据库
 * 执行前需要将数据库中的数据删除
 */

var fs = require('fs');
var schedule = require('node-schedule')
var getSights = require('./getSightData')
var updateSights = require('./updateSightData')

module.exports = async function (connection) {

    var data = fs.readFileSync(__dirname + '/../baiduSights.json', 'utf8');
    // if (!data) {
    //     getSights();
    //     data = fs.readFileSync(__dirname + '/../baiduSights.json', 'utf8');
    // }
    data = data.replace(/\]\[/g, function () {
        return ','
    })

    data = JSON.parse(data)
    let createSightsTable = `
                    DROP TABLE IF EXISTS sight_data;
                    create table sight_data(
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
    console.log('初始化景点信息...');

    await new Promise((resolve, reject) => {
        connection.Connection.query(createSightsTable, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            data.forEach(function (item, index) {
                let info = item['ext']['detail_info'] ? JSON.parse(JSON.stringify(item['ext']['detail_info'])) : ''
                connection.insertData(
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
                    },
                    'sight_data',
                    function (error, result) {
                        if (error) throw error;
                        if (index == data.length - 1) {
                            resolve()
                        }
                    }
                )
            })
        });
    })
        .then(() => {
            console.log('初始化景点信息完成')
            console.log('每天8:00开始，每隔30分钟更新景点数据')
            var j = schedule.scheduleJob(
                '1 * * * *',
                // 执行定时任务
                function () {
                    updateSights(connection)
                }
            )
        })
        .catch((error) => {
            console.error(error);
        })
}
