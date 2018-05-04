/**
 * 获取百度地图上景点信息
 */

var http = require('http');
var fs = require('fs');
var city = require('../destination.json').city;
var deepCopy = require('../../lib/deepCopy')
var { isJSON, solveSights } = require('../../lib/sightsTools')

/**
 * 参数信息
 */
var sightsOptions;  // 请求头信息
var req;    // http请求

function main(Connection) {
    city.forEach(function (item) {
        let pageNumber
        for (let pageNumber = 0; pageNumber < 100; pageNumber++) {
            sightsOptions = {
                host: 'map.baidu.com',
                path: 'http://map.baidu.com/?qt=con&c=' + item['Id'] + '&wd=%E6%99%AF%E7%82%B9&wd2=&pn=' + pageNumber + '&nn=' + pageNumber * 10,
                method: 'GET'
            };
            req = http.request(sightsOptions, function (res) {
                res.setEncoding('utf-8');

                var responseString = '';

                res.on('data', function (data) {
                    responseString += data;
                });

                res.on('end', function () {
                    if (isJSON(responseString) && JSON.parse(responseString).hasOwnProperty('content')) {
                        var resultObject = solveSights(responseString);
                        resultObject.forEach(async (item) => {
                            // console.log(item.name)
                            let info = item['ext']['detail_info'] ? JSON.parse(JSON.stringify(item['ext']['detail_info'])) : ''
                            Connection.updateData(
                                {
                                    'std_tag': item['std_tag'],
                                    'addr': item['addr'],
                                    'area_name': item['area_name'],
                                    'diPointX': item['diPointX'],
                                    'diPointY': item['diPointY'],
                                    'overall_rating': info ? info['overall_rating'] : '',
                                    'comment_num': info ? (info['comment_num'] ? Number(info['comment_num']) : 0) : 0,
                                    'image': info ? info['image'] : '',
                                    'link': info ? JSON.stringify(info['link']) : '',
                                    'short_desc': info ? JSON.stringify(info['short_desc']) : '',
                                    'tag': info ? info['tag'] : '',
                                    'brief_ticket': info ? JSON.stringify(info['brief_ticket']) : '',
                                    'mapsearchaladdin': info ? JSON.stringify(info['mapsearchaladdin']) : ''
                                },
                                {
                                    'name': `'${item['name']}'`
                                },
                                'sight_data'
                            )
                        })
                    }
                });
            });
            req.on('error', function (e) {
                // TODO: handle error.
                console.log(e.errno)
              //  if (e.errno != 'ECONNRESET')
                   // console.log('-----error-------', e);
            });
            req.end();
        }
    })
}
module.exports = main;