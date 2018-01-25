/**
 * 更新路径，计算最短路径
 */

var jwt = require('jsonwebtoken')
var fs = require('fs')
var mysql = require('../sqlTool')
var util = require('../lib')

const key = fs.readFileSync(__dirname + '/primate.key')

var update_path = async function (req, res) {
   // let start = req.body.start          // 读取用户传入起始点
   // let end = req.body.end              // 读取用户传入终点
    let cities = JSON.parse(req.body.route)          // 读取用户传入中间结点
    let routeId = jwt.verify(req.cookies.token, key).route_id       // 获取路径id
    if(routeId == undefined){
        res.send('0')
        return
    }

    // let x = []              // 节点x坐标数组
    // let y = []              // 节点y坐标数组
     let passCityName = []       // 经过城市的名称，存入数据表中
    // let passCityId = []         // 经过城市的id

    // 读取每一个中间节点，并保存，最后存入route_data数据表中
    cities.forEach(async (item, index, array) => {
        // 将每个节点的x，y坐标保存
       // let i = (await mysql.selectData(['pointX, pointY'], {city_id: item}, 'city_data'))[0]
       // x.push(Number(i['pointX']))
       // y.push(Number(i['pointY']))

        // 从数据表中读取城市名称
        let cityName = (await mysql.selectData(['name'], { city_id: item }, 'city_data'))[0]
        passCityName.push(cityName['name'])
       // passCityId.push(Number(item))

        if(index == array.length-1) {
            mysql.updateData({ passCity: JSON.stringify(passCityName) }, {route_id: routeId}, 'route_data')
        }
    })

    // // 保存起点的x和y坐标
    // let S = (await mysql.selectData(['pointX, pointY'], {city_id: start}, 'city_data'))[0]
    // x.unshift(Number(S['pointX']))
    // y.unshift(Number(S['pointY']))

    // // 保存终点的x和y坐标
    // let E = (await mysql.selectData(['pointX, pointY'], {city_id: end}, 'city_data'))[0]
    // x.push(Number(E['pointX']))
    // y.push(Number(E['pointY']))

    // // 根据各个节点x，y坐标，处理得到距离矩阵，用TSP算法求得最短路径
    // let distanceArray = util.getDistance(x, y)
    // let routeArray = util.TSP(distanceArray)

    // // 将起点和终点的id保存
    // passCityId.push(Number(end))
    // passCityId.unshift(Number(start))

    // // 得到城市id组成的路径，并返回给用户
    // let result = []
    // routeArray.forEach((item) => {
    //     result.push(passCityId[item])
    // })
    // console.log('最短路径为: ' + result)
    // res.send(result)
    
   // mysql.updateData({ passCity: JSON.stringify(cities) }, {route_id: routeId}, 'route_data')
   // mysql.updateData({detailInfo: JSON.stringify(cities)},{user_id: })
    res.send('1')
}

module.exports = update_path