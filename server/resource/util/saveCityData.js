/**
 * 将城市信息存储进数据库
 * 仅可执行一次
 */

var fs = require('fs');

module.exports = async function (connection) {

    var city_data = fs.readFileSync(__dirname + '/../city-info.json', 'utf8');
    city_data = JSON.parse(city_data)
    let createCitysTable = `
                    create table if not exists city_data(
                    city_id INTEGER NOT NULL AUTO_INCREMENT,
                    province VARCHAR(100) NOT NULL,
                    city VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    pointX VARCHAR(100),
                    pointY VARCHAR(100),
                    station VARCHAR(100),
                    PRIMARY KEY(city_id)
                    )ENGINE=MyISAM DEFAULT CHARSET=utf8;`;
    console.log('初始化城市信息...')
    await new Promise((resolve, reject) => {
        connection.Connection.query(createCitysTable, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            city_data.forEach(function (item, index) {
                if(item['pointX'].length < 9){
                    for(let i = item['pointX'].length; i < 9; i++){
                        item['pointX'] += '0'
                    }
                }
                if(item['pointY'].length < 8){
                    for(let i = item['pointY'].length; i < 8; i++){
                        item['pointY'] += '0'
                    }
                }
                connection.insertData(
                    { 
                        'province': item['province'], 
                        'city': item['city'],
                        'name': item['name'], 
                        'pointX': item['pointX'], 
                        'pointY': item['pointY'], 
                        'station': JSON.stringify(item['station']) 
                    },
                    'city_data',
                    function (error, results) {
                        if (error) throw error;
                        // console.log('The solution is: ', results);
                        if (index == city_data.length - 1) {
                            resolve()
                        }
                    });
            })
        });
    })
        .then(() => {
            console.log('初始化城市信息完成')
        }).catch((error) => {
            console.error(error);
        })
}
