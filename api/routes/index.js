/**
 * 服务器端路由
 */

var express = require('express')
var router = express.Router()

var mysql = require('../sqlTool')

var Connection = mysql.createConnection('localhost', 'test', '650314', 'my_db')

router.post('/login', async (req, res) => {
    // 获取用户id和密码，记录用户id
    let userId = req.body.id
    let psd = req.body.psd
    let result = await mysql.selectData({ id: userId, password: psd }, 'user_data')
    if (result.length >= 1) {
        console.log('用户：' + result['0']['id'] + '登陆成功')
        res.send('登陆成功')
    }
    else
        res.send('用户名或密码错误')
})

router.post('/signin', async (req, res) => {
    // 读取用户名称，id，密码，存入数据库
    let id = req.body.id
    let userName = req.body.name
    let psd = req.body.password
    let result = await mysql.selectData({ id: id }, 'user_data')
    if (result.length >= 1) {
        res.send('注册失败，该id已被注册')
    } else {
        mysql.insertData({ id: id, name: userName, password: psd }, 'user_data')
        console.log('用户：' + id + '注册成功')
        res.send('注册成功')
    }
})

module.exports = router