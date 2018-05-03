/**
 * 服务器端路由
 */

var express = require('express')
var jwt = require('jsonwebtoken')
var fs = require('fs')
var router = express.Router()

var login = require('./login')
var signup = require('./signup')
var getSights = require('./get-sights')
var getCities = require('./get-cities')
var hot_sights = require('./get-hotSights')
var start_end = require('./start-end')
var save_cityRoute = require('./save-cityRoute')
var save_sightRoute = require('./save-sightsRoute')
var getTrains = require('./get-trains')
var mine = require('./mine')

var Mysql = require('../sqlTool')
const key = fs.readFileSync(__dirname + '/primate.key')

var Connection = new Mysql('localhost', 'test', '650314', 'my_db')

router.get('/', function(req, res) {
    if(req.cookies && req.cookies.token) {
        let user_id = jwt.verify(req.cookies.token, key).user_id
        res.json({loginState: true, user_id: user_id})
    }else{
        res.json({loginState: false})
    }
})

router.post('/login', (req, res) => {
    login(req, res, Connection)
})

router.post('/signin', (req, res) => {
    signup(req, res, Connection)
})

router.get('/sights', (req, res) => {
    getSights(req, res, Connection)
})

router.get('/hot-sights', (req, res) => {
    hot_sights(req, res, Connection)
})

router.post('/start-end', (req, res) => {
    start_end(req, res, Connection)
})

router.post('/save-cityRoute', (req, res) => {
    save_cityRoute(req, res, Connection)
})

router.post('/save-sightRoute', (req, res) => {
    save_sightRoute(req, res, Connection)
})

router.get('/get-trains', (req, res) => {
    getTrains(req, res, Connection)
})

router.get('/mine', (req, res) => {
    mine(req, res, Connection)
})

router.get('/get-cities', (req, res) => {
    getCities(req, res, Connection)
})

module.exports = router