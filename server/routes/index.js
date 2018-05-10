var express = require('express')
var redis = require('redis')
var jwt = require('jsonwebtoken')
const router = express.Router()
const Mysql = require('../sqlTool')
const config = require('../config')
var util = require('../lib')
var fs = require('fs')
const key = fs.readFileSync(__dirname + '/../lib/primate.key')
const type = JSON.parse(fs.readFileSync(__dirname + '/../resource/sights-type.json', 'utf8'))
var Connection = new Mysql(config.db)
var client = redis.createClient()

router.get('/', async function (req, res) {
  if (req.cookies && req.cookies.token) {
    let token = jwt.verify(req.cookies.token, key)
    if (token.login) {
      let user_id = token.user_id
      let username = (await Connection.selectData(
        ['name'],
        { user_id: user_id },
        'user_data',
        true))[0]

      res.json({ loginState: true, username: username['name'] })
    } else {
      res.json({ loginState: false })
    }
  } else {
    let token = jwt.sign({
      login: false,
      user_id: util.createId()
    }, key)
    client.hmset(token, ["start", "", "end", "", "route", "", "sights", ""], function (err, result) {
      if (err) {
        console.log(err)
      }
      // callback({ code: 1, msg: result });
      /*设置过期时间为1天*/
      client.EXPIRE(token, 86400);
    });
    res.cookie('token', token, { httpOnly: true })
    res.json({ loginState: false })
  }
})

module.exports = router