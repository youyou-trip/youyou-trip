var express = require('express');
var jwt = require('jsonwebtoken')
var fs = require('fs')
var router = express.Router();

var Mysql = require('../sqlTool');
var models = require('../config');
const key = fs.readFileSync(__dirname + '/../lib/primate.key')
const type = JSON.parse(fs.readFileSync(__dirname + '/../resource/sights-type.json', 'utf8'))
// 连接数据库
var Connection = new Mysql(models.db);

router.post('/login', async function (req, res, next) {
    // 获取用户id和密码，在数据库中匹配用户信息
    let userId = req.body.id
    let psd = req.body.password
    let result = await Connection.selectData(['*'], { user_id: userId, password: psd }, 'user_data', true)
    if (result.length >= 1) {
        console.log('用户：' + result['0']['user_id'] + '登陆成功')
        let timestamp = Date.parse(new Date()).toString()
        let token = jwt.sign({ 
            login: true, 
            user_id: userId, 
            timestamp: timestamp 
        }, key);
        res.cookie('token', token, { httpOnly: true })
        res.send('1')     //登陆成功返回1
    }
    else
        res.send('0')   //登录失败返回0
});

router.post('/signin', async function (req, res, next) {
    // 读取用户名称，id，密码，存入数据库
    let id = req.body.id
    let userName = req.body.name
    let psd = req.body.password
    let result = await Connection.selectData(['name'], { user_id: id }, 'user_data', true)
    if (result.length >= 1) {
        res.send('0')
    } else {
        let json = {}
        type.forEach((item) => {
            json[item] = 1
        })
        Connection.insertData(
            {
                user_id: id,
                name: userName,
                password: psd,
                tags: JSON.stringify(json)
            }, 'user_data')
        console.log('用户：' + id + '注册成功')
        res.send('1')
    }
});
module.exports = router;
