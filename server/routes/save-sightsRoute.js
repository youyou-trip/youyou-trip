/**
 * 更新路径，计算最短路径
 */

var jwt = require('jsonwebtoken')
var fs = require('fs')
var util = require('../lib')

const key = fs.readFileSync(__dirname + '/primate.key')

var save_sightsRoute = async function (req, res, Connection) {
    let city = req.body.city        // 读取用户传入当前城市名称
    let sights = req.body.route
    let user_id = jwt.verify(req.cookies.token, key).user_id
    let routeId = jwt.verify(req.cookies.token, key).timestamp      // 获取路径id
    if (routeId == undefined) {
        res.send('0')
        return
    }

    let passSights = []       // 经过景点的名称，存入数据表中
    let user = (await Connection.selectData(['tags'], { user_id: user_id }, 'user_data', true))[0]
    let json = JSON.parse(user['tags'])

    // 读取每一个中间节点，并保存，最后存入route_data数据表中
    sights.forEach(async (item, index, array) => {

        // 从数据表中读取景点名称
        let sight = (await Connection.selectData(['name', 'std_tag'], { sight_id: item }, 'sight_data', true))[0]
        json[sight['std_tag']] = Number(json[sight['std_tag']]) + 2
        // console.log(json)
        passSights.push(sight['name'])
        if (index == array.length - 1) {
            Connection.updateData(
                {
                    sights: JSON.stringify(passSights)
                },
                {
                    route_id: routeId
                }, 'route_data')
            Connection.updateData(
                {
                    tags: JSON.stringify(json)
                },
                {
                    user_id: user_id
                }, 'user_data')
        }
    })

    res.send('1')
}

module.exports = save_sightsRoute