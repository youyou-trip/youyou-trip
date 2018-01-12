/**
 * 服务器端路由
 */

var express = require('express')
var router = express.Router()

var mysql = require('../sqlTool')

var Connection = mysql.createConnection('localhost', 'test', '650314', 'my_db')

router.post('/login', async (req, res) => {
    // 获取用户id和密码，在数据库中匹配用户信息
    let userId = req.body.id
    let psd = req.body.psd
    let result = await mysql.selectData(['name'], { id: userId, password: psd }, 'user_data')
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
    let result = await mysql.selectData(['name'], { id: id }, 'user_data')
    if (result.length >= 1) {
        res.send('注册失败，该id已被注册')
    } else {
        mysql.insertData({ id: id, name: userName, password: psd }, 'user_data')
        console.log('用户：' + id + '注册成功')
        res.send('注册成功')
    }
})

router.get('/sights', async (req, res) => {
    let tag = req.body.tag
    let sightsList = await mysql.selectData(['sight_id', 'name', 'std_tag', 'addr', 'area_name', 'image', 'brief_ticket', 'overall_rating', 'short_desc', 'mapsearchaladdin'], { std_tag: tag }, 'sight_data')
    res.send({sightsList: JSON.stringify(sightsList)})
})

router.get('/hotSights', async (req, res) => {
    let sightsTop = await mysql.selectTopData('景区', 10, 'sight_data')
    res.send({sightsTop: JSON.stringify(sightsTop)})
})

router.post('/shortRoute', async (req, res) => {
    // 读取用户选择去的城市或景点，计算最短路径
})

router.post('/start-end', async (req, res) => {
    // 用户提交起点和终点城市
    let start = req.body.start
    let end = req.body.end
    let ps = await mysql.selectData(['province'], {name: start}, 'city_data')
    let pe = await mysql.selectData(['province'], {name: end}, 'city_data')
    let cityInfo = await mysql.selectData(['*'], {province: ps, province: pe}, 'city_data')
    let hotSights = await mysql.selectTopData('景区', 10, 'sight_data')
    res.send({ cityInfo: JSON.stringify(cityInfo), hotSights: JSON.stringify(hotSights)})
})

router.post('/update-path', (req, res) => {
    let nodes = JSON.parse(req.body.nodes)
    nodes.forEach((item) => {
        // 处理节点，并计算每两个节点之间的距离
    })
    // 使用TSP算法求出最短路径
})

module.exports = router