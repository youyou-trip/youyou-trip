var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

var router = require('./routes')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())
app.use('/', router)
app.listen(3000, function(e) {
  if(e)
    console.log(e)
  console.log('listening successful')
})