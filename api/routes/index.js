/**
 * 服务器端路由
 */

var express = require('express')
var router = express.Router()

var login = require('./login')
var signup = require('./signup')
var getSights = require('./get-sights')
var getCities = require('./get-cities')
var hot_sights = require('./get-hotSights')
var start_end = require('./start-end')
var save_cityRoute = require('./save-cityRoute')
var mine = require('./mine')

var mysql = require('../sqlTool')

var Connection = mysql.createConnection('localhost', 'test', '650314', 'my_db')

router.post('/login', login)

router.post('/signin', signup)

router.get('/sights', getSights)

router.get('/hot-sights', hot_sights)


router.post('/start-end', start_end)

router.post('/update-path', save_cityRoute)

router.get('/mine', mine)

router.get('/get-cities', getCities)

module.exports = router