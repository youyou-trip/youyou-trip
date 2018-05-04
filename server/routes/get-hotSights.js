/**
 * 获取城市信息
 */

var jwt = require('jsonwebtoken')
var fs = require('fs')

const key = fs.readFileSync(__dirname + '/primate.key')

var getHotSights = async function (req, res, Connection) {
    let user_id = jwt.verify(req.cookies.token, key).user_id
    let route_id = jwt.verify(req.cookies.token, key).timestamp
    let hotSightsStart = req.query.hotSightsStart

    let tags = (await Connection.selectData(['tags'], { user_id: user_id }, 'user_data', true))[0]

    tags = JSON.parse(tags['tags'])
    let tuijian = [], count = 0
    for (let key in tags) {
        if(Number(tags[key]) > 1) {
            count += Number(tags[key])
            tuijian.push({
                name: key,
                value: Number(tags[key])
            })
        }
    }
    
    let hotSights = []
    tuijian.forEach(async (item, index) => {
        let s = await Connection.selectTopData(item.name, 0, parseInt(item.value/count*10), 'sight_data')
        if(s.length >= 1){
            hotSights = hotSights.concat(s)
        }
            
        if (index == tuijian.length - 1) {
          //  console.log(hotSights)
            res.send({ error: 1, hotSights: hotSights })
        } else if (index > tuijian.length-1) {
            res.send({error: 0})
        }
    })
}

module.exports = getHotSights