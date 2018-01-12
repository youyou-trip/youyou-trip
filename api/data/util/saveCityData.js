/**
 * 将城市信息存储进数据库
 * 仅可执行一次
 */

var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'test',
    password: '650314',
    database: 'my_db'
});

connection.connect();

var city_data = 
[
    {
        province: '陕西省',
        name: '西安市新城区',
        pointX: '108.960747',
        pointY: '34.266451',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市莲湖区',
        pointX: '108.944041',
        pointY: '34.264995',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市陇县',
        pointX: '106.864397',
        pointY: '34.89305',
        station: '陇县',
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市渭滨区',
        pointX: '107.149968',
        pointY: '34.371184',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '安康市岚皋县',
        pointX: '108.902049',
        pointY: '32.307001',
        station: '安康',
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市洛南县',
        pointX: '110.148509',
        pointY: '34.090838',
        station: '商洛',
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市山阳县',
        pointX: '109.88229',
        pointY: '33.532172',
        station: '商洛',
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市未央区',
        pointX: '108.94685',
        pointY: '34.292873',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市碑林区',
        pointX: '108.934235',
        pointY: '34.230769',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市雁塔区',
        pointX: '108.926593',
        pointY: '34.213389',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市长安区',
        pointX: '108.906917',
        pointY: '34.159016',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市蓝田县',
        pointX: '109.323479',
        pointY: '34.151624',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市灞桥区',
        pointX: '109.064671',
        pointY: '34.273409',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市周至县',
        pointX: '108.222154',
        pointY: '34.163621',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市临潼区',
        pointX: '109.214238',
        pointY: '34.367275',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市富县',
        pointX: '109.379711',
        pointY: '35.98801',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市洛川县',
        pointX: '109.432369',
        pointY: '35.761975',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市宝塔区',
        pointX: '109.493106',
        pointY: '36.591266',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市宜川县',
        pointX: '110.168963',
        pointY: '36.050178',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市甘泉县',
        pointX: '109.351019',
        pointY: '36.276526',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市黄龙县',
        pointX: '109.840373',
        pointY: '35.584467',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '铜川市王益区',
        pointX: '109.075578',
        pointY: '35.068964',
        station: '',
        train_number: []
    },
    {
        province: '陕西省',
        name: '铜川市宜君县',
        pointX: '109.116932',
        pointY: '35.398577',
        station: '',
        train_number: []
    },
    {
        province: '陕西省',
        name: '铜川市印台区',
        pointX: '109.099975',
        pointY: '35.114492',
        station: '',
        train_number: []
    },
    {
        province: '陕西省',
        name: '铜川市耀州区',
        pointX: '108.980514',
        pointY: '34.908916',
        station: '',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市乾县',
        pointX: '108.239473',
        pointY: '34.527551',
        station: '乾县',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市淳化县',
        pointX: '108.580681',
        pointY: '34.79925',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市彬县',
        pointX: '108.077658',
        pointY: '35.043911',
        station: '彬县',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市旬邑县',
        pointX: '108.333986',
        pointY: '35.111978',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市三原县',
        pointX: '108.940509',
        pointY: '34.617382',
        station: '三原',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市礼泉县',
        pointX: '108.425018',
        pointY: '34.481764',
        station: '礼泉',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市长武县',
        pointX: '107.798757',
        pointY: '35.205886',
        station: '长武',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市渭城区',
        pointX: '108.737213',
        pointY: '34.361988',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市兴平市',
        pointX: '108.490475',
        pointY: '34.299221',
        station: '兴平',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市武功县',
        pointX: '108.200398',
        pointY: '34.260204',
        station: '武功',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市泾阳县',
        pointX: '108.842623',
        pointY: '34.527114',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市安塞县',
        pointX: '109.328842',
        pointY: '36.863853',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市吴起县',
        pointX: '108.175933',
        pointY: '36.927216',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市子长县',
        pointX: '109.675234',
        pointY: '37.142668',
        station: '子长',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市延川县',
        pointX: '110.193514',
        pointY: '36.878117',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市秦都区',
        pointX: '108.706272',
        pointY: '34.329567',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市杨陵区',
        pointX: '108.084732',
        pointY: '34.272117',
        station: '杨陵',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市黄陵县',
        pointX: '109.262961',
        pointY: '35.579428',
        station: '黄陵',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市志丹县',
        pointX: '108.768432',
        pointY: '36.822194',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市延长县',
        pointX: '110.012334',
        pointY: '36.579313',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市岐山县',
        pointX: '107.621054',
        pointY: '34.443459',
        station: '岐山',
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市凤翔县',
        pointX: '107.400737',
        pointY: '34.521218',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市眉县',
        pointX: '107.749767',
        pointY: '34.274247',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市金台区',
        pointX: '107.146806',
        pointY: '34.376069',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市商州区',
        pointX: '109.941241',
        pointY: '33.862703',
        station: '商洛',
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市柞水县',
        pointX: '109.114207',
        pointY: '33.68611',
        station: '柞水',
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市商南县',
        pointX: '110.881807',
        pointY: '33.530995',
        station: '商南',
        train_number: []
    },{
        province: '陕西省',
        name: '商洛市镇安县',
        pointX: '109.152893',
        pointY: '33.423357',
        station: '镇安',
        train_number: []
    },{
        province: '陕西省',
        name: '商洛市丹凤县',
        pointX: '110.327331',
        pointY: '33.695783',
        station: '丹凤',
        train_number: []
    },{
        province: '陕西省',
        name: '咸阳市永寿县',
        pointX: '108.142311',
        pointY: '34.691979',
        station: '永寿',
        train_number: []
    },{
        province: '陕西省',
        name: '西安市户县',
        pointX: '108.94755',
        pointY: '34.18234',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },{
        province: '陕西省',
        name: '西安市阎良区',
        pointX: '109.226102',
        pointY: '34.662234',
        station: '阎良',
        train_number: []
    },{
        province: '陕西省',
        name: '西安市高陵县',
        pointX: '109.088297',
        pointY: '34.53483',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市勉县',
        pointX: '106.673221',
        pointY: '33.153553',
        station: '勉县',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市南郑县',
        pointX: '106.93623',
        pointY: '32.999334',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市扶风县',
        pointX: '107.900219',
        pointY: '34.375411',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市太白县',
        pointX: '107.319116',
        pointY: '34.058401',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市凤县',
        pointX: '106.515756',
        pointY: '33.908469',
        station: '凤县',
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市陈仓区',
        pointX: '107.387436',
        pointY: '34.354456',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市麟游县',
        pointX: '107.793525',
        pointY: '34.677902',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市千阳县',
        pointX: '107.132442',
        pointY: '34.642381',
        station: '千阳',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市韩城市',
        pointX: '110.442847',
        pointY: '35.476788',
        station: '韩城',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市大荔县',
        pointX: '109.941658',
        pointY: '34.797184',
        station: '大荔',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市华阴市',
        pointX: '110.092301',
        pointY: '34.566096',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市临渭区',
        pointX: '109.492726',
        pointY: '34.498192',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市蒲城县',
        pointX: '109.586506',
        pointY: '34.955855',
        station: '蒲城',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市富平县',
        pointX: '109.180331',
        pointY: '34.751086',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市汉台区',
        pointX: '107.031856',
        pointY: '33.067771',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市洋县',
        pointX: '107.545837',
        pointY: '33.222739',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市佛坪县',
        pointX: '107.990539',
        pointY: '33.524359',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市城固县',
        pointX: '107.33393',
        pointY: '33.157131',
        station: '城固',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市宁强县',
        pointX: '106.257171',
        pointY: '32.829694',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市镇巴县',
        pointX: '107.895035',
        pointY: '32.536704',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市澄城县',
        pointX: '109.93235',
        pointY: '35.190245',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市潼关县',
        pointX: '110.24635',
        pointY: '34.544296',
        station: '潼关',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市华县',
        pointX: '109.776026',
        pointY: '34.496578',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市合阳县',
        pointX: '110.149466',
        pointY: '35.237986',
        station: '合阳',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市白水县',
        pointX: '109.590671',
        pointY: '35.177452',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市略阳县',
        pointX: '106.156718',
        pointY: '33.327281',
        station: '略阳',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市留坝县',
        pointX: '106.920808',
        pointY: '33.617571',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市西乡县',
        pointX: '107.766614',
        pointY: '32.983101',
        station: '西乡',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市榆阳区',
        pointX: '109.720309',
        pointY: '38.277029',
        station: '榆林',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市米脂县',
        pointX: '110.183754',
        pointY: '37.755417',
        station: '米脂',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市绥德县',
        pointX: '110.263362',
        pointY: '37.50294',
        station: '绥德',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市神木县',
        pointX: '110.498868',
        pointY: '38.842498',
        station: '神木',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市府谷县',
        pointX: '111.067366',
        pointY: '39.028116',
        station: '榆林',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市靖边县',
        pointX: '108.793988',
        pointY: '37.599438',
        station: '靖边',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市横山县',
        pointX: '109.294346',
        pointY: '37.962209',
        station: '榆林',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市定边县',
        pointX: '107.601267',
        pointY: '37.594612',
        station: '定边',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市清涧县',
        pointX: '110.121209',
        pointY: '37.088878',
        station: '清涧县',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市佳县',
        pointX: '110.491345',
        pointY: '38.019511',
        station: '榆林',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市吴堡县',
        pointX: '110.739673',
        pointY: '37.452068',
        station: '吴堡',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市子洲县',
        pointX: '110.03525',
        pointY: '37.610683',
        station: '子洲',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市汉滨区',
        pointX: '109.026836',
        pointY: '32.695173',
        station: '安康',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市宁陕县',
        pointX: '108.314283',
        pointY: '33.310527',
        station: '安康',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市紫阳县',
        pointX: '108.534229',
        pointY: '32.520246',
        station: '紫阳',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市汉阴县',
        pointX: '108.508745',
        pointY: '32.893026',
        station: '汉阴',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市石泉县',
        pointX: '108.247887',
        pointY: '33.038408',
        station: '石泉县',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市旬阳县',
        pointX: '109.365265',
        pointY: '32.834086',
        station: ['旬阳', '旬阳北'],
        train_number: []
    },{
        province: '陕西省',
        name: '安康市镇坪县',
        pointX: '109.526873',
        pointY: '31.883672',
        station: '安康',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市平利县',
        pointX: '109.361864',
        pointY: '32.388854',
        station: '安康',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市白河县',
        pointX: '110.112629',
        pointY: '32.809026',
        station: ['白河', '白河县', '白河东'],
        train_number: []
    }
]
let createCitysTable = `create table if not exists city_data(
                    city_id INTEGER NOT NULL AUTO_INCREMENT,
                    province VARCHAR(100) NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    pointX VARCHAR(100),
                    pointY VARCHAR(100),
                    station VARCHAR(100),
                    PRIMARY KEY(city_id)
                    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

connection.query(createCitysTable, function (err, results, fields) {
    if (err) {
        console.log(err.message);
    }
});
city_data.forEach(function (item) {
    connection.query('insert ignore into city_data set ?',
        { 'province': item['province'], 'name': item['name'], 'pointX': item['pointX'], 'pointY': item['pointY'], 'station': JSON.stringify(item['station'])}
        , function (error, results, fields) {
            if (error) throw error;
            // console.log('The solution is: ', results);
        });
})

connection.end();
