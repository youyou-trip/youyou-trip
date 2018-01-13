/**
 * 数据库操作工具集
 */

var mysql = require('mysql');
var Connection

/**
 * 与数据库服务器建立连接
 */
exports.createConnection = function (host, user, password, dataBase) {
    Connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: dataBase
    })
    Connection.connect()
    return Connection;
}

/**
 * 插入数据
 * @param {object} obj - 插入的字段值
 * @param {string} table - 待插入的数据表
 */
exports.insertData = async function (obj, table) {
    let result
    await new Promise((resolve, reject) => {
        Connection.query('insert ignore into ' + table + ' set ? ',
            obj,
            function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
    }).then((data) => {
        result = data
    })
    return result
}

/**
 * 删除数据
 * @param {json} conditions - 删除的条件
 * @param {string} table - 待删除的数据表
 */
exports.deleteData = function (conditions, table) {
    Connection.query('delete from ' + table + ' where ' + conditions, function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ' + results.affectedRows + ' rows');
    })
}

/**
 * 提取数据
 * @param {Array} field - 需要提取的字段
 * @param {json} condtions - 提取的条件
 * @param {string} table - 待提取的数据表
 */
exports.selectData = async function (field, conditions, table) {
    let result
    let string = ''
    for (let key in conditions) {
        if (string !== '')
            string += ' and '
        string += key + ' like ' + "'%" + conditions[key] + "%'"
    }
    await new Promise((resolve, reject) => {
        Connection.query('select ' + field.join(",") + ' from ' + table + ' where ' + string, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
        })
    }).then((data) => {
        result = data
    })
    return result
}

/**
 * 从数据表中提取热门景点
 * @param {string} type - 筛选热门景点的条件（根据评论数或者评分）
 * @param {string} num - 需要的热门景点数目
 * @param {string} table - 选择的数据表
 */
exports.selectTopData = async function (type, num, table) {
    let result
    await new Promise((resolve, reject) => {
        let sql = "select name,std_tag,addr,area_name,overall_rating,image, link, short_desc, brief_ticket, mapsearchaladdin from " + table + " where std_tag like '%" + type + "%' order by comment_num desc limit 5 offset " + num
        Connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
        })
    }).then((data) => {
        result = data
    })
    return result
}