/**
 * 深拷贝函数
 * @param {Array} data - 待过滤的景点数组
 * @param {Array} options - 过滤属性
 */
module.exports = function (data, options) {
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
                    newObj[key] = arguments.callee(data[key], options)
            }
            return newObj
        }
    } else {
        return data.toString().replace(/<[^>]+>/gim, "")
    }
}
