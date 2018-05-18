var express = require('express');
var jwt = require('jsonwebtoken')
var fs = require('fs')
var router = express.Router();

var Mysql = require('../sqlTool');
var models = require('../config');
const key = fs.readFileSync(__dirname + '/../lib/primate.key')
// 连接数据库
var Connection = new Mysql(models.db);

// 增加用户接口
router.get('/', async function (req, res, next) {
    if(req.cookies && req.cookies.token) {
        let token = jwt.verify(req.cookies.token, key)
        if (token.login) {
            let user_id = token.user_id
            let userData = await Connection.selectData(['route_id', 'date', 'start', 'end', 'passCity', 'sights', 'comment'], { user_id: user_id }, 'route_data', true)
            console.log(userData)
            res.send({error: 1, userData: userData})
        } else {
            res.send({error: 0})
        }
    } else {
        res.send({error: 0})
    }
});
router.post('/comments', async function (req, res, next) {
    if(req.cookies && req.cookies.token) {
        let token = jwt.verify(req.cookies.token)
        if(token.login) {
            let routeId = req.body.route_id
            let comment = req.body.comment
            await Connection.updateData(
                {
                    comment: comment.toString()
                },
                {
                    route_id: routeId
                }
                , 'route_data')
        } else {
            res.send({error: 0})
        }
    } else {
        res.send({error: 0})
    }
})
module.exports = router;
