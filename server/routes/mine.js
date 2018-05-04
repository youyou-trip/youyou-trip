var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var mine = async function (req, res, Connection) {
    let user_id = jwt.verify(req.cookies.token, key).user_id
    if(!mine){
        res.send('0')
        return
    }
    let userData = await Connection.selectData(['name', 'detailInfo'], {id: user_id}, 'user_data', true)
    res.send(userData)
}
module.exports = mine