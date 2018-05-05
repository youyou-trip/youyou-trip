/**
 * Created by qianqing on 2017/2/13.
 */
const express = require('express');
var jwt = require('jsonwebtoken')
const router = express.Router();
const Mysql = require('../sqlTool')
const config = require('../config')
var fs = require('fs')
const key = fs.readFileSync(__dirname + '/../lib/primate.key')
const type = JSON.parse(fs.readFileSync(__dirname + '/../resource/sights-type.json', 'utf8'))
var Connection = new Mysql(config.db)


router.get('/', async function (req, res) {
  if (req.cookies && req.cookies.token) {
    let user_id = jwt.verify(req.cookies.token, key).user_id
    let username = (await Connection.selectData(
      ['name'],
      { user_id: user_id },
      'user_data',
      true))[0]

    res.json({ loginState: true, username: username['name'] })
  } else {
    res.json({ loginState: false })
  }
})

module.exports = router