/**
 * 根据x，y坐标数组计算得到距离矩阵
 * @param {Array} x x坐标数组
 * @param {Array} y y坐标数组
 */

var getDistance = function (x, y) {
  var result = []
  x.forEach(function (item1, index1) {
    result[index1] = []
    x.forEach(function (item2, index2) {
      if (item1 !== item2) {
        let dis = Math.round(Math.sqrt((item2 - item1) * (item2 - item1) + (y[index2] - y[index1]) * (y[index2] - y[index1])))
        result[index1][index2] = dis
      } else {
        result[index1][index2] = 0
      }
    })
  })
  return result
}

module.exports = getDistance
