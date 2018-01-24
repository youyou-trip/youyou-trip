const key = 'youyoutrip'

var mysql = require('../sqlTool')

var sights = async function (req, res) {
    let tag = req.body.tag
    let sightsList = await mysql.selectData(['sight_id', 'name', 'std_tag', 'addr', 'area_name', 'image', 'brief_ticket', 'overall_rating', 'short_desc', 'mapsearchaladdin'], { std_tag: tag }, 'sight_data')
    res.send({ sightsList: JSON.stringify(sightsList) })
}

module.exports = sights