var mysql = require('../sqlTool')

var signup = async function(req, res){
    // 读取用户名称，id，密码，存入数据库
    let id = req.body.id
    let userName = req.body.name
    let psd = req.body.password
    console.log(req)
    let result = await mysql.selectData(['name'], { id: id }, 'user_data')
    if (result.length >= 1) {
        res.send('0')
    } else {
        await mysql.insertData({ id: id, name: userName, password: psd }, 'user_data')
        console.log('用户：' + id + '注册成功')
        res.send('1')
    }
}

module.exports = signup