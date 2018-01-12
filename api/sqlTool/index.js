/**
 * 数据库操作工具集
 */

var mysql = require('mysql');
var Connection
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

exports.insertData = function (obj, database) {
    Connection.query('insert ignore into ' + database + ' set ? ',
        obj,
        function (error, results, fields) {
            if (error) throw error;
        })
}

exports.deleteData = function (conditions, database) {
    Connection.query('delete from ' + database + ' where ' + conditions, function (error, results, fields) {
        if (error) throw error;
        console.log('deleted ' + results.affectedRows + ' rows');
    })
}

exports.selectData = async function (field, conditions, database) {
    let result
    let string = ''
    for (let key in conditions) {
        if (string !== '')
            string += ' and '
        string += key + '=' + "'" + conditions[key] + "'"
    }
    await new Promise((resolve, reject) => {
        Connection.query('select ' + field.join(",") + ' from ' + database + ' where ' + string, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
        })
    }).then((data) => {
        result = data
    })
    return result
}

exports.selectTopData = async function (type, num, database) {
    let result
    await new Promise((resolve, reject) => {
        let sql = "select name,std_tag,addr,area_name,overall_rating,image, link, short_desc, brief_ticket, mapsearchaladdin from " + database + " where std_tag like '%" + type + "%' order by comment_num desc limit 5 offset " + num
        Connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
        })
    }).then((data) => {
        result = data
    })
    return result
}