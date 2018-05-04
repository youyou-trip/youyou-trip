const fs = require('fs')
const type = JSON.parse(fs.readFileSync(__dirname + '/../resource/sights-type.json', 'utf8'))

var signup = async function(req, res, Connection){
    // 读取用户名称，id，密码，存入数据库
    let id = req.body.id
    let userName = req.body.name
    let psd = req.body.password
    let result = await Connection.selectData(['name'], { id: id }, 'user_data', true)
    if (result.length >= 1) {
        res.send('0')
    } else {
        let json = {}
        type.forEach((item) => {
            json[item] = 1
        })
        Connection.insertData(
            { 
                id: id, 
                name: userName, 
                password: psd, 
                tag: JSON.stringify(json)
            }, 'user_data')
        console.log('用户：' + id + '注册成功')
        res.send('1')
    }
}

module.exports = signup