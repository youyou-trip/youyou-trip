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

// 增加用户接口
router.get('/', async function (req, res, next) {
    let token = jwt.verify(req.cookies.token, key)
    if (token.login) {
        let user_id = token.user_id
        let userData = await Connection.selectData(['date, start, end, passCity, sights, comment'], { user_id: user_id }, 'route_data', true)
        res.send({error: 1, userData: userData})
    } else {
        res.send({error: 0})
    }

});
module.exports = router;
