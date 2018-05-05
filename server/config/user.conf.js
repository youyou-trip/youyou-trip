/**
 * Created by qianqing on 2016/12/24.
 */
'use strict';
const fs = require('fs')
var type = JSON.parse(fs.readFileSync(__dirname + '/../resource/sights-type.json', 'utf8'))

let json = {}
type.forEach((item) => {
    json[item] = 1
})

const user = [
    {
        user_id: '04141105',
        name: 'lijunyi',
        password: '650314',
        tags: JSON.stringify(json)
    },
    {
        user_id: '04141103',
        name: 'zhaodanyang',
        password: '123456',
        tags: JSON.stringify(json)
    }
]

module.exports = user

