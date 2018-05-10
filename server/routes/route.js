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

    if (!req.cookies || !req.cookies.token) {
        res.send('0')
    }
    let token = jwt.verify(req.cookies.token, key)
    if (token.login) {
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
    } else {
        // client.hmset(req.cookies.token, ["route", cities], function (err, result) {
        //     if (err) {
        //         console.log(err)
        //     }
        //     /*设置过期时间为1天*/
        //     console.log('路线：' + start + '->' + end + '存储成功')
        //     client.EXPIRE(req.cookies.token, 86400);
        // });
        res.send('0')
    }
});

router.post('/save-sight', async function (req, res, next) {
    let sights = req.body
    let token = jwt.verify(req.cookies.token, key)
    if (!req.cookies || !req.cookies.token) {
        return res.send('0')
    }
    let user_id = token.user_id
    let routeId = token.timestamp      // 获取路径id
    let passSights = [], count = 0       // 经过景点的名称，存入数据表中
    let user = (await Connection.selectData(['tags'], { user_id: user_id }, 'user_data', true))[0]
    let json = JSON.parse(user['tags'])

    if (token.login) {
        // 读取每一个中间节点，并保存，最后存入route_data数据表中
        for (let key in sights) {
            count++
            let obj = {
                city: key,
                sight: []
            }
            sights[key].forEach(async (item, index, array) => {

                // 从数据表中读取景点名称
                let sight = (await Connection.selectData(['std_tag'], { name: `'${item}'` }, 'sight_data', true))[0]
                json[sight['std_tag']] = Number(json[sight['std_tag']]) + 2

                obj['sight'].push(item)
                if (index == sights[key].length - 1) {
                    passSights.push(obj)
                    if (count == Object.keys(sights).length) {
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
                        console.log(1111111111)
                        return res.send({error: 1})
                    }
                }
            })
        }
    } else {
        console.log(222222222222222)
        return res.send({error: 0})
    }
})

router.post('/start-end', async function (req, res) {
    // 用户提交起点和终点城市
    var start = req.body.start
    var end = req.body.end
    if (!req.cookies.token) {
        res.send(0)
    }
    var token = jwt.verify(req.cookies.token, key)
    if (token.login) {
        let user_id = token.user_id
        let chars = Date.parse(new Date()).toString() + user_id, pwd = ''
        for (i = 0; i < 20; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        let timestamp = pwd
        token = jwt.sign({
            login: true,
            user_id: user_id,
            timestamp: timestamp
        }, key);
        if (user_id == undefined) {
            res.send({ error: 0 })
            return
        }
        // 时间戳作为路线id
        await Connection.updateData(
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
        res.cookie('token', token, { httpOnly: true })
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
                console.log('路线：' + start + '->' + end + '存储成功')
                client.EXPIRE(req.cookies.token, 86400);
            });
        })
        res.send({ error: 1 })
    }
});

router.get('/start-end', async function (req, res) {
    if (!req.cookies.token) {
        res.send('0')
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

        let startPos = {}, startId
        let startInfo = (await Connection.selectData(['pointX, pointY, city_id'], { name: `'${start}'` }, 'city_data', true))[0]
        startPos['x'] = startInfo['pointX']
        startPos['y'] = startInfo['pointY']
        startId = startInfo['city_id']

        let endPos = {}, endId
        let endInfo = (await Connection.selectData(['pointX, pointY, city_id'], { name: `'${end}'` }, 'city_data', true))[0]
        endPos['x'] = endInfo['pointX']
        endPos['y'] = endInfo['pointY']
        endId = endInfo['city_id']

        res.send({ error: 1, start: start, startId: startId, startPos: startPos, end: end, endId: endId, endPos: endPos })
    } else {
        // 从redis中读取信息
        client.HGETALL(req.cookies.token, async function (err, result) {
            if (err) {
                console.log(err)
            }
            let start = result['start']
            let end = result['end']

            let startPos = {}, startId
            let startInfo = (await Connection.selectData(['pointX, pointY, city_id'], { name: `'${start}'` }, 'city_data', true))[0]
            startPos['x'] = startInfo['pointX']
            startPos['y'] = startInfo['pointY']
            startId = startInfo['city_id']

            let endPos = {}, endId
            let endInfo = (await Connection.selectData(['pointX, pointY, city_id'], { name: `'${end}'` }, 'city_data', true))[0]
            endPos['x'] = endInfo['pointX']
            endPos['y'] = endInfo['pointY']
            endId = endInfo['city_id']

            res.send({ error: 1, start: start, startId: startId, startPos: startPos, end: end, endId: endId, endPos: endPos })
        })
    }
});

router.get('/city', async function (req, res) {
    if (!req.cookies.token) {
        res.send({ error: 0 })
    }
    let token = jwt.verify(req.cookies.token, key)
    if (token.login) {
        let user_id = token.user_id
        let timestamp = token.timestamp

        if (user_id == undefined) {
            res.send({ error: 0 })
            return
        }
        let route = (await Connection.selectData(['passCity'], { route_id: timestamp }, 'route_data', true))[0]
        if(!route){
            res.send({error: 0})
        }
        let cities = JSON.parse(route['passCity'])
        let hotels = []
        cities.forEach(async (item, index) => {
            let hotel = await Connection.selectData(['name', 'diPointX', 'diPointY'], { area_name: item }, 'hotel_data', false)
            hotels.push(hotel)
            if (index == cities.length - 1) {
                res.send({ error: 1, passCity: route['passCity'], hotel: hotels })
            }
        })
    } else {
        res.send({ error: 0 })
    }
})

module.exports = router;
