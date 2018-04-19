var deepCopy = require('./deepCopy')
/**
 * 判断字符串是否是json格式
 */
exports.isJSON = function (str) {
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
exports.solveSights = function (sightsString) {
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