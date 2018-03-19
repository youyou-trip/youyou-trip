/**
 * 初始化数据库
 */

 import initCityData from './saveCityData'
 import initUserData from './initUserData'
 import initRouteData from './initRouteData'
 import initSightData from './saveSightData'

function main () {
     initCityData()
     
     initRouteData()

     initSightData()

     initUserData()
    }
module.exports = main
