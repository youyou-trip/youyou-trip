/**
 * 获取城市信息
 */

var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var getCities = async function(req, res, Connection) {
    let province = req.query.province
    // 获取起点城市和终点城市的省份
    // 获取起点终点城市所在省份的所有城市信息
    let cityInfo = await Connection.selectData(['*'], { province: province, }, 'city_data', false)

   // let cityInfo = ps !== pe ? cityInfo1.concat(cityInfo2) : cityInfo1

    res.send({error: 1, cityInfo: cityInfo})
}

module.exports = getCities