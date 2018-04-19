/**
 * 初始化数据库
 */

const initCityData = require('./saveCityData')
const initUserData = require('./initUserData')
const initRouteData = require('./initRouteData')
const initSightData = require('./saveSightData')
const mysql = require('mysql');

async function main() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'test',
        password: '650314',
        database: 'my_db'
    });

    connection.connect();
    
    console.log('数据库连接成功！')

    await initCityData(connection)

    await initUserData(connection)

    await initRouteData(connection)

    await initSightData(connection)
    
    connection.end();
}
main()
