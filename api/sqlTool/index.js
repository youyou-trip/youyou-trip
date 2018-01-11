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
    obj['detailInfo'] = ''
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

exports.selectData = async function (conditions, database) {
    let result
    let string = ''
    for (let key in conditions) {
        if (string !== '')
            string += ' and '
        string += key + '=' + "'" + conditions[key] + "'"
    }
    await new Promise((resolve, reject) => {
        Connection.query('select * from ' + database + ' where ' + string, function (error, results, fields) {
            if (error) throw error;
            resolve(results)
        })
    }).then((data) => {
        result = data
    })
    return result
}