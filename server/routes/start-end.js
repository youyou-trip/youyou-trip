var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var mysql = require('../sqlTool')

var start_end = async function (req, res) {
    // 用户提交起点和终点城市
    let start = req.body.start
    let end = req.body.end

    let user_id = jwt.verify(req.cookies.token, key).id
    if (user_id == undefined) {
        res.send({ error: 0 })
        return
    }
    let routeId = await mysql.insertData({ user_id: user_id, start: start, end: end, date: new Date() }, 'route_data')
    console.log('路线：' + start + '->' + end + '存储成功')
    // 更新token
    let token = jwt.sign({ id: user_id, route_id: routeId.insertId }, key)

    res.cookie('token', token)
    res.send({ error: 1 })
}

module.exports = start_end