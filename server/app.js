var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()

var indexRouter = require('./routes')
var userRouter = require('./routes/user')
var routeRouter = require('./routes/route')
var cityRouter = require('./routes/city')
var sightRouter = require('./routes/sight')
var mineRouter = require('./routes/mine')
var trainRouter = require('./routes/train')
var communityRouter = require('./routes/community')


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.use(cookieParser())

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/train', trainRouter)
app.use('/city', cityRouter)
app.use('/sight', sightRouter)
app.use('/mine', mineRouter)
app.use('/route', routeRouter)
app.use('/community', communityRouter)

app.listen(3000, function (e) {
  if (e)
    console.log(e)
  console.log('listening successful')
})