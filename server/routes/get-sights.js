const key = 'youyoutrip'

var getSights = async function (req, res, Connection) {
    let tag = req.body.tag
    let city = req.body.city
    let sightsList = await Connection.selectData(['sight_id', 'name', 'std_tag', 'addr', 'area_name', 'image', 'brief_ticket', 'overall_rating', 'short_desc', 'mapsearchaladdin'], { std_tag: tag, area_name: city }, 'sight_data', false)
    res.send({ sightsList: JSON.stringify(sightsList) })
}

module.exports = getSights