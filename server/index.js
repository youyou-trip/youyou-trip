/**
 * 初始化数据库
 */

const initCityData = require('./resource/util/saveCityData')
const initUserData = require('./resource/util/initUserData')
const initRouteData = require('./resource/util/initRouteData')
const initSightData = require('./resource/util/saveSightData')
const Mysql = require('./sqlTool');
const config = require('./config')

async function main() {
    var Connection = new Mysql(config.db)

    await initCityData(Connection)

    await initUserData(Connection)

   await initRouteData(Connection)

    await initSightData(Connection)

   // connection.end();
}
main()
