var jwt = require('jsonwebtoken')
var fs = require('fs')

var mysql = require('../sqlTool')
const key = fs.readFileSync(__dirname + '/primate.key')

var login = async function(req, res) {
    // 获取用户id和密码，在数据库中匹配用户信息
    let userId = req.body.id
    let psd = req.body.psd
    let result = await mysql.selectData(['*'], { id: userId, password: psd }, 'user_data')
    if (result.length >= 1) {
        console.log('用户：' + result['0']['id'] + '登陆成功')
        var token = jwt.sign({ id: userId }, key);
        res.cookie('token', token)
        res.send('1')     //登陆成功返回1
    }
    else
        res.send('0')   //登录失败返回0
}

module.exports = login