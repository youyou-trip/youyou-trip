var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var login = async function(req, res, Connection) {
    // 获取用户id和密码，在数据库中匹配用户信息
    let userId = req.body.id
    let psd = req.body.password
    let result = await Connection.selectData(['*'], { user_id: userId, password: psd }, 'user_data', true)
    if (result.length >= 1) {
        console.log('用户：' + result['0']['user_id'] + '登陆成功')
        let timestamp = Date.parse(new Date()).toString()
        let token = jwt.sign({ user_id: userId, timestamp: timestamp }, key);
        res.cookie('token', token)
        res.send('1')     //登陆成功返回1
    }
    else
        res.send('0')   //登录失败返回0
}

module.exports = login