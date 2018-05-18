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
    await new Promise((resolve, reject) => {
        Connection.Connection.query("select user_id,start,end,passCity,comment,date from route_data where comment is not null", function (error, results, fields) {
            if (error) throw error;
            resolve(results)
        })
    }).then((data) => {
        res.send({ error: 1, comments: data })
    })
});

module.exports = router;
