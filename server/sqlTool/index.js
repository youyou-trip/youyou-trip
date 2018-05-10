/**
 * 数据库操作工具集
 */

var mysql = require('mysql');

/**
 * 与数据库服务器建立连接
 */

class Tools {
    constructor(obj) {
        this.Connection = mysql.createConnection({
            host: obj.host,
            user: obj.user,
            password: obj.password,
            database: obj.database
        })
        this.Connection.connect()
    }

    /**
     * 插入数据
     * @param {object} obj - 插入的字段值
     * @param {string} table - 待插入的数据表
     */
    async insertData(obj, table, callback) {
        let result, error
        await new Promise((resolve, reject) => {
            this.Connection.query('insert ignore into ' + table + ' set ? ',
                obj,
                function (error, results, fields) {
                    if (error) throw error;
                    resolve(results)
                })
        }).then((data) => {
            result = data
            if (callback)
                callback(error, data)
        }).catch((e) => {
            error = e
        })
        return result
    }

    /**
     * 删除数据
     * @param {json} conditions - 删除的条件
     * @param {string} table - 待删除的数据表
     */
    deleteData(conditions, table) {
        this.Connection.query('delete from ' + table + ' where ' + conditions, function (error, results, fields) {
            if (error) throw error;
            console.log('deleted ' + results.affectedRows + ' rows');
        })
    }

    /**
     * 提取数据
     * @param {Array} field - 需要提取的字段
     * @param {json} condtions - 提取的条件
     * @param {string} table - 待提取的数据表
     * @param {bool} bool - 是否精确查询
     */
    async selectData(field, conditions, table, bool) {
        let result
        let string = ''
        if (!bool) {
            for (let key in conditions) {
                if (string !== '')
                    string += ' and '
                string += key + ' like ' + "'%" + conditions[key] + "%'"
            }
        } else {
            for (let key in conditions) {
                if (string !== '')
                    string += ' and '
                string += key + '=' + conditions[key]
            }
        }
        await new Promise((resolve, reject) => {
            this.Connection.query('select ' + field.join(",") + ' from ' + table + ' where ' + string, function (error, results, fields) {
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
    async selectTopData(type, start, city, num, table) {
        let result
        await new Promise((resolve, reject) => {
            let sql = `select name,diPointX,diPointY,image,overall_rating from ${table} where std_tag like '%${type}%' and area_name like '%${city}%' order by ifnull(comment_num,0)+ifnull(overall_rating, 0) desc limit ${num} offset ${start}`
            this.Connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            })
        }).then((data) => {
            result = data
        }).catch((e) => {
            console.log(e)
        })
        return result
    }

    async hasData(conditions, table) {
        let data = await this.selectData(
            ['*'],
            conditions,
            table,
            true
        )
        if (data.length >= 1) {
            return true
        } else {
            return false
        }
    }
    /**
     * 数据表更新数据
     * @param {string} 
     */
    async updateData(field, conditions, table) {
        let isHas = await this.hasData(conditions, table)
        if (isHas) {
            let array = []
            let f = ''
            for (let key in field) {
                f += key + ' = ? '
                array.push(field[key])
            }
            f = f.replace(/(\?)\s+(\w+)/g, '$1, $2')
            let c = ''
            for (let key in conditions) {
                c += key + ' = ? '
                array.push(conditions[key])
            }
            c = c.replace(/(\?)\s+(\w+)/g, '$1, $2')
            this.Connection.query("update " + table + " set " + f + ' where ' + c, array, function (error, results, fields) {
                if (error) throw error;
            })
        } else {
            field = Object.assign(conditions, field)
            this.insertData(
                field,
                table
            )
        }
    }
}

module.exports = Tools