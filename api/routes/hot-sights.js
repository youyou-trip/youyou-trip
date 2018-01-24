var mysql = require('../sqlTool')

var hotSights = async function(req, res) {
    let sightsTop = await mysql.selectTopData('景区', 10, 'sight_data')
    res.send({ sightsTop: JSON.stringify(sightsTop) })
}

module.exports = hotSights