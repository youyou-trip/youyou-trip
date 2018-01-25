var jwt = require('jsonwebtoken')
var fs = require('fs')
var mysql = require('../sqlTool')

const key = fs.readFileSync(__dirname + '/primate.key')

var mine = async function (req, res) {
    let user_id = jwt.verify(req.cookies.token, key).id
    if(!mine){
        res.send('0')
        return
    }
    let userData = await mysql.selectData(['name', 'detailInfo'], {id: user_id}, 'user_data')
    res.send(userData)
}
module.exports = mine