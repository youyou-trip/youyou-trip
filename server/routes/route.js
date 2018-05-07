var express = require('express')
var jwt = require('jsonwebtoken')
var redis = require('redis')
var fs = require('fs')
var router = express.Router()

var Mysql = require('../sqlTool')
var models = require('../config')
const key = fs.readFileSync(__dirname + '/../lib/primate.key')
const type = JSON.parse(fs.readFileSync(__dirname + '/../resource/sights-type.json', 'utf8'))
// 连接数据库
var Connection = new Mysql(models.db)
var client = redis.createClient()

// 增加接口
router.post('/save-city', async function (req, res) {
    let cities = req.body.route        // 读取用户传入中间结点
    let routeId = jwt.verify(req.cookies.token, key).timestamp       // 获取路径id
    if (routeId == undefined) {
        res.send('0')
        return
    }

    let passCityName = []       // 经过城市的名称，存入数据表中

    // 读取每一个中间节点，并保存，最后存入route_data数据表中
    cities.forEach(async (item, index, array) => {

        // 从数据表中读取城市名称
        let cityName = (await Connection.selectData(['name'], { city_id: item }, 'city_data', true))[0]
        passCityName.push(cityName['name'])
        if (index == array.length - 1) {
            Connection.updateData({ passCity: JSON.stringify(passCityName) }, { route_id: routeId }, 'route_data')
        }
    })

    res.send('1')
});

router.post('/save-sight', async function (req, res) {
    let city = req.body.city        // 读取用户传入当前城市名称
    let sights = req.body.route
    let user_id = jwt.verify(req.cookies.token, key).user_id
    let routeId = jwt.verify(req.cookies.token, key).timestamp      // 获取路径id
    if (routeId == undefined) {
        res.send('0')
        return
    }

    let passSights = []       // 经过景点的名称，存入数据表中
    let user = (await Connection.selectData(['tags'], { user_id: user_id }, 'user_data', true))[0]
    let json = JSON.parse(user['tags'])

    // 读取每一个中间节点，并保存，最后存入route_data数据表中
    sights.forEach(async (item, index, array) => {

        // 从数据表中读取景点名称
        let sight = (await Connection.selectData(['name', 'std_tag'], { sight_id: item }, 'sight_data', true))[0]
        json[sight['std_tag']] = Number(json[sight['std_tag']]) + 2
        // console.log(json)
        passSights.push(sight['name'])
        if (index == array.length - 1) {
            Connection.updateData(
                {
                    sights: JSON.stringify(passSights)
                },
                {
                    route_id: routeId
                }, 'route_data')
            Connection.updateData(
                {
                    tags: JSON.stringify(json)
                },
                {
                    user_id: user_id
                }, 'user_data')
        }
    })

    res.send('1')
});

router.post('/start-end', async function (req, res) {
    // 用户提交起点和终点城市
    let start = req.body.start
    let end = req.body.end
    if (!req.cookies.token) {
        res.send(0)
    }

    let token = jwt.verify(req.cookies.token, key)
    if (token.login) {
        let user_id = token.user_id
        let timestamp = token.timestamp

        if (user_id == undefined) {
            res.send({ error: 0 })
            return
        }
        // 时间戳作为路线id
        Connection.updateData(
            {
                user_id: user_id,
                start: start,
                end: end,
                date: new Date()
            },
            {
                route_id: timestamp.toString()
            }
            , 'route_data')

        console.log('路线：' + start + '->' + end + '存储成功')
        res.send({ error: 1 })
    } else {
        // 从redis中读取信息
        client.HGETALL(req.cookies.token, function (err, result) {
            if (err) {
                console.log(err)
            }
            result['start'] = start
            result['end'] = end
            client.hmset(req.cookies.token, ["start", start, "end", end], function (err, result) {
                if (err) {
                    console.log(err)
                }
                /*设置过期时间为1天*/
                client.EXPIRE(token, 86400);
            });
        })
        res.send({ error: 1 })
    }
});

router.get('/start-end', async function (req, res) {
    if (!req.cookies.token) {
        res.send(0)
    }

    let token = jwt.verify(req.cookies.token, key)
    if (token.login) {
        let user_id = token.user_id
        let timestamp = token.timestamp

        if (user_id == undefined) {
            res.send({ error: 0 })
            return
        }
        let start = (await Connection.selectData(['start'], { route_id: token.timestamp }, 'route_data', true))[0]['start']
        let end = (await Connection.selectData(['end'], { route_id: token.timestamp }, 'route_data', true))[0]['end']

        res.send({ error: 1, start: start, end: end })
    } else {
        // 从redis中读取信息
        client.HGETALL(req.cookies.token, function (err, result) {
            if (err) {
                console.log(err)
            }
            let start = result['start']
            let end = result['end']
            res.send({ error: 1, start: start, end: end })
        })
    }
});

module.exports = router;