/**
 * 初始化数据库
 */

const logger = require('tracer').console()
const initCityData = require('./saveCityData')
const initUserData = require('./initUserData')
const initRouteData = require('./initRouteData')
const initSightData = require('./saveSightData')

function main() {

    logger.log('初始化城市信息...')

    initCityData()

    logger.log('初始化城市信息完成')
    logger.log('初始化路径信息...')

    initRouteData()

    logger.log('初始化路径信息完成')
    logger.log('初始化景点信息...')

    initSightData()

    logger.log('初始化景点信息完成')
    logger.log('初始化用户信息...')

    initUserData()

    logger.log('初始化用户信息完成')
}
main()
