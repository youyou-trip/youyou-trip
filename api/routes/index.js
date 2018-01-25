/**
 * 服务器端路由
 */

var express = require('express')
var router = express.Router()

var login = require('./login')
var signup = require('./signup')
var sights = require('./sights')
var getCities = require('./getCities')
var hot_sights = require('./getHotSights')
var start_end = require('./start-end')
var update_path = require('./update-path')
var mine = require('./mine')

var mysql = require('../sqlTool')

var Connection = mysql.createConnection('localhost', 'test', '650314', 'my_db')

router.post('/login', login)

router.post('/signin', signup)

router.get('/sights', sights)

router.get('/hot-sights', hot_sights)


router.post('/start-end', start_end)

router.post('/update-path', update_path)

router.get('/mine', mine)

router.get('/get-cities', getCities)

module.exports = router