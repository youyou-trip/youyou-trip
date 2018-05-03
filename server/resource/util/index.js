/**
 * 初始化数据库
 */

const initCityData = require('./saveCityData')
const initUserData = require('./initUserData')
const initRouteData = require('./initRouteData')
const initSightData = require('./saveSightData')
const Mysql = require('../../sqlTool');

async function main() {
    var Connection = new Mysql('localhost', 'test', '650314', 'my_db')

    await initCityData(Connection)

    await initUserData(Connection)

    await initRouteData(Connection)

    await initSightData(Connection)

   // connection.end();
}
main()
