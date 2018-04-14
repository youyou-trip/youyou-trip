/**
 * 初始化数据库
 */

const initCityData = require('./saveCityData')
const initUserData = require('./initUserData')
const initRouteData = require('./initRouteData')
const initSightData = require('./saveSightData')
const mysql = require('mysql');

function main() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'test',
        password: '650314',
        database: 'my_db'
    });

    connection.connect();
    
    console.log('数据库连接成功！')
    console.log('初始化城市信息...')

    initCityData(connection)

    console.log('初始化城市信息完成')
    console.log('初始化用户信息...')

    initUserData(connection)

    console.log('初始化用户信息完成')
    console.log('初始化路径信息...')

    initRouteData(connection)

    console.log('初始化路径信息完成')
    console.log('初始化景点信息...')

    initSightData(connection)

    console.log('初始化景点信息完成')
    
    connection.end();
}
main()
