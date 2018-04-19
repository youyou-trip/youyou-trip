var fs = require('fs');
module.exports = async function (connection) {

    let createUserTable = `create table if not exists user_data(
                    id VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    PRIMARY KEY(id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
    console.log('初始化用户信息...')
    await new Promise((resolve, reject) => {
        connection.query(createUserTable, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            resolve()
        });
    })
        .then(() => {
            console.log('初始化用户信息完成')
        }).catch((error) => {
            console.error(error);
        })
}
