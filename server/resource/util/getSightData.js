/**
 * 获取百度地图上景点信息
 */

var http = require('http');
var fs = require('fs');
var city = require('../destination.json').city;
var deepCopy = require('../../lib/deepCopy')
var {isJSON, solveSights} = require('../../lib/sightsTools')

/**
 * 参数信息
 */
var sightsOptions;  // 请求头信息
var req;    // http请求

//module.exports = 


function main() {
    /**
 * 发送请求，获取景点信息，并写入文件
 */
    fs.writeFile(__dirname + '/../baiduSights.json', '', function (e) {
        if (e) {
            console.log(e);
        }
    })
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
                        var resultObject = JSON.stringify(solveSights(responseString), null, 4);
                        if (resultObject != '') {
                            fs.appendFile(__dirname + '/../baiduSights.json', resultObject, function (e) {
                                if (e) {
                                    console.log(e);
                                }
                            })
                        }
                    }
                });
            });
            req.on('error', function (e) {
                // TODO: handle error.
                console.log('-----error-------', e);
            });
            req.end();
        }
    })
} 

module.exports = main;