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
router.get('/mine', async function (req, res, next) {
    let user_id = jwt.verify(req.cookies.token, key).user_id
    if (!mine) {
        res.send('0')
        return
    }
    let userData = await Connection.selectData(['name', 'detailInfo'], { id: user_id }, 'user_data', true)
    res.send(userData)
});


module.exports = router;
