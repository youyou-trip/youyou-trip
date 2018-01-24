var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var mysql = require('../sqlTool')

var start_end = async function(req, res) {
    // 用户提交起点和终点城市
    let start = req.body.start
    let end = req.body.end
    
    // 获取起点城市和终点城市的省份
    let ps = (await mysql.selectData(['distinct province'], { name: start }, 'city_data'))[0].province
    let pe = (await mysql.selectData(['distinct province'], { name: end }, 'city_data'))[0].province

    // 获取起点终点城市所在省份的所有城市信息
    let cityInfo1 = await mysql.selectData(['*'], { province: ps, }, 'city_data')
    let cityInfo2 = await mysql.selectData(['*'], { province: pe, }, 'city_data')

    let cityInfo = ps !== pe ? cityInfo1.concat(cityInfo2) : cityInfo1

    let hotSights = await mysql.selectTopData('景区', 10, 'sight_data')
    // 获取用户id，存入数据库
    if (cityInfo.length > 0) {
        let user_id = jwt.verify(req.cookies.token, key).id
        let routeId = await mysql.insertData({ user_id: user_id, start: start, end: end, date: new Date() }, 'route_data')
        console.log('路线：' + start + '->' + end + '存储成功')
        let token = jwt.sign({ id: user_id, route_id: routeId.insertId }, key)
        res.cookie('token', token)
    }
    res.send({ cityInfo: JSON.stringify(cityInfo), hotSights: JSON.stringify(hotSights) })
}

module.exports = start_end