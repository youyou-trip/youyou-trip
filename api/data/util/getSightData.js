var http = require('http');
var fs = require('fs');
var city = require('./destination.json').city;

/**
 * 参数信息
 */
var sightsOptions;  // 请求头信息
var req;    // http请求

// 景点信息
function Sight() {
    this.name = '';
    this.catalogID = 0;
    this.std_tag = '';
    this.addr = '';
    this.area_name = ''
    this.diPointX = 0;
    this.diPointY = 0;
    this.ext = {
        'detail_info': {
            'image': '',
            'link': [],
            'overall_rating': '',
            'impression': [],
            'shop_hours': '',
            'short_desc': '',
            'std_tag': '',
            'tag': '',
            'brief_ticket': {},
            'mapsearchaladdin': {
                'detail_guide': {},
                'travel_guide': {}
            }
        }
    }
}

/**
 * 深拷贝函数
 * @param {Array} data1 - 过滤后的景点数组
 * @param {Array} data2 - 待过滤的景点数组
 * @param {Array} options - 过滤属性
 */
function deepCopy(data1, data2, options) {
    if (typeof options !== 'object') {
        data1[options] = data2[options];
    }
    else
        options.forEach(function (key) {
            if (typeof key !== 'object') {
                data1[key] = data2[key];
            }
            else {
                for (var keyItem in key) {
                    if (!data2[keyItem]) return
                    deepCopy(data1[keyItem], data2[keyItem], key[keyItem])
                }
            }
        })
    console.log(data1)
    return data1;
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
    let findKeys = [
        'addr',
        'name',
        'area_name',
        'diPointX',
        'diPointY',
        'std_tag',
        'catalogID',
        {
            'ext': [
                {
                    'detail_info': [
                        'image',
                        'link',
                        'overall_rating',
                        'impression',
                        'shop_hours',
                        'short_desc',
                        'std_tag',
                        'tag',
                        'brief_ticket',
                        {
                            'mapsearchaladdin': [
                                'detail_guide',
                                'travel_guide'
                            ]
                        }
                    ]
                }
            ]
        }
    ]
    let thisSight = new Sight();
    let sightsArray = [];
    // 过滤需要的属性
    sights.forEach(function (item) {
        deepCopy(thisSight, item, findKeys);
        sightsArray.push(thisSight);
        thisSight = new Sight();
    })
    return sightsArray;
}

/**
 * 发送请求，获取景点信息，并写入文件
 */
fs.writeFile(__dirname + '../baiduSights.json', '', function (e) {
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
                        fs.appendFile(__dirname + '../baiduSights.json', resultObject, function (e) {
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
