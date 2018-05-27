var express = require('express');
var router = express.Router();
var Mysql = require('../sqlTool');
var pinyin = require('node-pinyin')
var request = require('superagent')
var cheerio = require('cheerio')
require('superagent-charset')(request)

var models = require('../config');
// 连接数据库
var Connection = new Mysql(models.db);


// 增加火车信息接口
router.get('/', async (req, res) => {
    let start = req.query.start
    let end = req.query.end

    let sstation = await Connection.selectData(['station'], { name: `'${start}'` }, 'city_data', true)
    let estation = await Connection.selectData(['station'], { name: `'${end}'` }, 'city_data', true)

    let ss = JSON.parse(sstation[0].station)
    let es = JSON.parse(estation[0].station)

    sstation = typeof ss == 'string' ? ss : ss[0]
    estation = typeof es == 'string' ? es : es[0]
    let s = pinyin(sstation, { style: 'normal' }).join(""),
        e = pinyin(estation, { style: 'normal' }).join("")

    if(s == e) {
        res.send({error: 1, trains: {}})
        return;
    }
    console.log(s, e)
    let url = `http://www.jt2345.com/huoche/zhanzhan/${s}-${e}.htm`

    request.get(url)
        .charset('gbk')
        .end(function (err, sres) {
            if (sres.statusCode == 200) {
                var html = sres.text;
                var $ = cheerio.load(html, { decodeEntities: false });
                var table = $('body table').eq(0)
                var keys = $(table).find('tr').eq(0).children()
                let values = $(table).find('tr').not($(table).find('tr').first())
                let col = [], value = []
                for (let i = 0; i < keys.length; i++) {
                    col.push($(keys[i]).text())
                }
                for (let i = 0; i < values.length; i++) {
                    let tdArr = $(values[i]).find('td')
                    let res = []
                    for (let j = 0; j < tdArr.length; j++) {
                        res.push($(tdArr[j]).text())
                    }
                    value.push(res)
                }
                console.log(value)
                res.send({ error: 1, trains: { col: col, value: value } })
            } else if (sres.statusCode == 404) {
                console.log(111111111111111111111)
                res.send({error: 1, trains: {}})
            }

        });
});

module.exports = router;
