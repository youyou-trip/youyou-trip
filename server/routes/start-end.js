var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var start_end = async function (req, res, Connection) {
    // 用户提交起点和终点城市
    let start = req.body.start
    let end = req.body.end
    if (!req.cookies.token) {
        res.send(0)
    }

    let user_id = jwt.verify(req.cookies.token, key).user_id
    let timestamp = jwt.verify(req.cookies.token, key).timestamp

    if (user_id == undefined) {
        res.send({ error: 0 })
        return
    }
    // 时间戳作为路线id
    Connection.updateData(
        {
            user_id: user_id,
            start: start,
            end: end,
            date: new Date()
        },
        {
            route_id: timestamp.toString()
        }
        , 'route_data')

    console.log('路线：' + start + '->' + end + '存储成功')
    res.send({ error: 1 })
}

module.exports = start_end