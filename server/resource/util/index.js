/**
 * 初始化数据库
 */

const initCityData = require('./saveCityData')
const initUserData = require('./initUserData')
const initRouteData = require('./initRouteData')
const initSightData = require('./saveSightData')
const mysql = require('../../sqlTool');

async function main() {
    var connection = mysql.createConnection('localhost', 'test', '650314', 'my_db')

    console.log('数据库连接成功！')

 //   await initCityData(connection)

//    await initUserData(connection)

//    await initRouteData(connection)

    await initSightData(connection)
    
 //   connection.end();
}
main()
