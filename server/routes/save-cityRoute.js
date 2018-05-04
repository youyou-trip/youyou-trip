/**
 * 更新路径，计算最短路径
 */

var jwt = require('jsonwebtoken')
var fs = require('fs')
var util = require('../lib')

const key = fs.readFileSync(__dirname + '/primate.key')

var save_cityRoute = async function (req, res, Connection) {
    let cities = req.body.route        // 读取用户传入中间结点
    let routeId = jwt.verify(req.cookies.token, key).timestamp       // 获取路径id
    if(routeId == undefined){
        res.send('0')
        return
    }

     let passCityName = []       // 经过城市的名称，存入数据表中

    // 读取每一个中间节点，并保存，最后存入route_data数据表中
    cities.forEach(async (item, index, array) => {

        // 从数据表中读取城市名称
        let cityName = (await Connection.selectData(['name'], { city_id: item }, 'city_data', true))[0]
        passCityName.push(cityName['name'])
        if(index == array.length-1) {
            Connection.updateData({ passCity: JSON.stringify(passCityName) }, {route_id: routeId}, 'route_data')
        }
    })

    res.send('1')
}

module.exports = save_cityRoute