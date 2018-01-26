/**
 * 更新路径，计算最短路径
 */

var jwt = require('jsonwebtoken')
var fs = require('fs')
var mysql = require('../sqlTool')
var util = require('../lib')

const key = fs.readFileSync(__dirname + '/primate.key')

var save_cityRoute = async function (req, res) {
    let cities = JSON.parse(req.body.route)          // 读取用户传入中间结点
    let routeId = jwt.verify(req.cookies.token, key).route_id       // 获取路径id
    if(routeId == undefined){
        res.send('0')
        return
    }

     let passCityName = []       // 经过城市的名称，存入数据表中

    // 读取每一个中间节点，并保存，最后存入route_data数据表中
    cities.forEach(async (item, index, array) => {

        // 从数据表中读取城市名称
        let cityName = (await mysql.selectData(['name'], { city_id: item }, 'city_data'))[0]
        passCityName.push(cityName['name'])
        if(index == array.length-1) {
            mysql.updateData({ passCity: JSON.stringify(passCityName) }, {route_id: routeId}, 'route_data')
        }
    })

    res.send('1')
}

module.exports = save_cityRoute