/**
 * 获取百度地图上景点信息
 */

var http = require('http');
var fs = require('fs');
var city = require('../destination.json').city;

/**
 * 参数信息
 */
var sightsOptions;  // 请求头信息
var req;    // http请求

/**
 * 深拷贝函数
 * @param {Array} data - 待过滤的景点数组
 * @param {Array} options - 过滤属性
 */
function deepCopy(data, options) {
    if (typeof data === 'object') {
        if (data instanceof Array) {
            var newArr = []
            for (let i = 0; i < data.length; i++) {
                newArr.push(data[i])
            }
            return newArr
        } else {
            var newObj = {}
            for (let key in data) {
                if (options.indexOf(key) >= 0)
                    newObj[key] = deepCopy(data[key], options)
            }
            return newObj
        }
    } else {
        return data.toString().replace(/<[^>]+>/gim, "")
    }
}

/**
 * 判断字符串是否是json格式
 */
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (str.indexOf('{') > -1 && str.indexOf('}') > -1) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            return false;
        }
    }
    return false;
}

/**
 * 处理请求返回景点函数
 * @param {string} sightsString - 请求返回的景点字符串
 */
function solveSights(sightsString) {
    let sights = JSON.parse(sightsString)['content'];
    // 需要的参数
    let findKeys = ['addr', 'name', 'area_name', 'diPointX', 'diPointY', 'std_tag', 'ext', 'detail_info', 'image', 'link', 'overall_rating', 'impression', 'shop_hours', 'short_desc', 'std_tag', 'comment_num', 'tag', 'brief_ticket', 'mapsearchaladdin']
    let thisSight = {};
    let sightsArray = [];
    // 过滤需要的属性
    sights.forEach(function (item) {
        thisSight = deepCopy(item, findKeys);
        sightsArray.push(thisSight);
        thisSight = {};
    })
    return sightsArray;
}

module.exports = function () {
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
