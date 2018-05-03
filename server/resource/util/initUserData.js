var fs = require('fs');
var type = JSON.parse(fs.readFileSync(__dirname + '/../sights-type.json', 'utf8'))
module.exports = async function (connection) {

    let createUserTable = `create table if not exists user_data(
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
            let json = {}
            type.forEach((item) => {
                json[item] = 1
            })
            connection.insertData(
                {
                    user_id: '04141105',
                    name: 'lijunyi',
                    password: '650314',
                    tags: JSON.stringify(json)
                },
                'user_data'
            )
            resolve()
        });
    })
        .then(() => {
            console.log('初始化用户信息完成')
        }).catch((error) => {
            console.error(error);
        })
}
