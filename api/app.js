var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()

var router = require('./routes')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method == 'OPTIONS') {
    res.send(200); //options快速响应
  }
  else {
    next();
  }
});
app.use(cookieParser())
app.use('/', router)
app.listen(3000, function (e) {
  if (e)
    console.log(e)
  console.log('listening successful')
})