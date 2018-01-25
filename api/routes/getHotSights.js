/**
 * 获取城市信息
 */

var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var mysql = require('../sqlTool')

var getHotSights = async function(req, res) {
    let route_id = jwt.verify(req.cookies.token, key).route_id
    let hotSightsStart = req.query.hotSightsStart

    let hotSights = await mysql.selectTopData('景区', hotSightsStart, 10, 'sight_data')
    res.send({error: 1, hotSights: hotSights})
}

module.exports = getHotSights