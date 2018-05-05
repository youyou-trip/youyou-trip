var config = require('../../config')

module.exports = async function (connection) {

    let createUserTable = `
                    create table if not exists user_data(
                    user_id VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    tags JSON NOT NULL,
                    PRIMARY KEY(user_id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    console.log('初始化用户信息...')
    await new Promise((resolve, reject) => {
        connection.Connection.query(createUserTable, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            config.user.forEach((item) => {
                connection.insertData(
                    item,
                    'user_data'
                )
            })
            resolve()
        });
    })
        .then(() => {
            console.log('初始化用户信息完成')
        }).catch((error) => {
            console.error(error);
        })
}
