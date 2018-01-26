/**
 * 获取城市信息
 */

var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var mysql = require('../sqlTool')

var getCities = async function(req, res) {
    let province = req.query.province
    // 获取起点城市和终点城市的省份
    // 获取起点终点城市所在省份的所有城市信息
    let cityInfo = await mysql.selectData(['*'], { province: province, }, 'city_data')

   // let cityInfo = ps !== pe ? cityInfo1.concat(cityInfo2) : cityInfo1

    res.send({error: 1, cityInfo: cityInfo})
}

module.exports = getCities