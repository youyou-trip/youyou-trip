/**
 * 服务器端路由
 */

var express = require('express')
var router = express.Router()

var login = require('./login')
var signup = require('./signup')
var sights = require('./sights')
var hot_sights = require('./hot-sights')
var start_end = require('./start-end')
var short_route = require('./short-route')
var update_path = require('./update-path')

var mysql = require('../sqlTool')

var Connection = mysql.createConnection('localhost', 'test', '650314', 'my_db')

router.post('/login', login)

router.post('/signin', signup)

router.get('/sights', sights)

router.get('/hot-sights', hot_sights)

router.post('/short-route', short_route)

router.post('/start-end', start_end)

router.post('/update-path', update_path)

module.exports = router