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

// 增加接口
router.get('/all', async (req, res) => {
    let tag = req.body.tag
    let city = req.body.city
    let sightsList = await Connection.selectData(
        ['sight_id', 'name', 'std_tag', 'addr', 'area_name', 'image', 'brief_ticket', 'overall_rating', 'short_desc', 'mapsearchaladdin'], 
        { std_tag: tag, area_name: city }, 
        'sight_data', 
        false)
    res.send({ sightsList: JSON.stringify(sightsList) })
});

router.get('/hot', async (req, res) => {
    let user_id = jwt.verify(req.cookies.token, key).user_id
    let route_id = jwt.verify(req.cookies.token, key).timestamp
    let hotSightsStart = req.query.hotSightsStart || 10
    let tags = (await Connection.selectData(['tags'], { user_id: user_id }, 'user_data', true))[0]

    tags = JSON.parse(tags['tags'])
    let tuijian = [], count = 0
    for (let key in tags) {
        if (Number(tags[key]) > 1) {
            count += Number(tags[key])
            tuijian.push({
                name: key,
                value: Number(tags[key])
            })
        }
    }

    let hotSights = []
    if (tuijian.length >= 1) {
        tuijian.forEach(async (item, index) => {
            let s = await Connection.selectTopData(item.name, hotSightsStart, parseInt(item.value / count * 10), 'sight_data')
            if (s.length >= 1) {
                hotSights = hotSights.concat(s)
            }

            if (index == tuijian.length - 1) {
                //  console.log(hotSights)
                res.send({ error: 1, hotSights: hotSights })
            } else if (index > tuijian.length - 1) {
                res.send({ error: 0 })
            }
        })
    } else {
        let hotSights = await Connection.selectTopData('景区', hotSightsStart, 10, 'sight_data')
        res.send({ error: 1, hotSights: hotSights })
    }

});

module.exports = router;
