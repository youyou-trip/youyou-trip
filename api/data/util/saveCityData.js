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
        pointX: '108960747',
        pointY: '34266451',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市莲湖区',
        pointX: '108944041',
        pointY: '34264995',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市陇县',
        pointX: '106864397',
        pointY: '3489305',
        station: '陇县',
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市渭滨区',
        pointX: '107149968',
        pointY: '34371184',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '安康市岚皋县',
        pointX: '108902049',
        pointY: '32307001',
        station: '安康',
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市洛南县',
        pointX: '110148509',
        pointY: '34090838',
        station: '商洛',
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市山阳县',
        pointX: '10988229',
        pointY: '33532172',
        station: '商洛',
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市未央区',
        pointX: '10894685',
        pointY: '34292873',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市碑林区',
        pointX: '108934235',
        pointY: '34230769',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市雁塔区',
        pointX: '108926593',
        pointY: '34213389',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市长安区',
        pointX: '108906917',
        pointY: '34159016',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市蓝田县',
        pointX: '109323479',
        pointY: '34151624',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市灞桥区',
        pointX: '109064671',
        pointY: '34273409',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市周至县',
        pointX: '108222154',
        pointY: '34163621',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '西安市临潼区',
        pointX: '109214238',
        pointY: '34367275',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市富县',
        pointX: '109379711',
        pointY: '3598801',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市洛川县',
        pointX: '109432369',
        pointY: '35761975',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市宝塔区',
        pointX: '109493106',
        pointY: '36591266',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市宜川县',
        pointX: '110168963',
        pointY: '36050178',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市甘泉县',
        pointX: '109351019',
        pointY: '36276526',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市黄龙县',
        pointX: '109840373',
        pointY: '35584467',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '铜川市王益区',
        pointX: '109075578',
        pointY: '35068964',
        station: '',
        train_number: []
    },
    {
        province: '陕西省',
        name: '铜川市宜君县',
        pointX: '109116932',
        pointY: '35398577',
        station: '',
        train_number: []
    },
    {
        province: '陕西省',
        name: '铜川市印台区',
        pointX: '109099975',
        pointY: '35114492',
        station: '',
        train_number: []
    },
    {
        province: '陕西省',
        name: '铜川市耀州区',
        pointX: '108980514',
        pointY: '34908916',
        station: '',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市乾县',
        pointX: '108239473',
        pointY: '34527551',
        station: '乾县',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市淳化县',
        pointX: '108580681',
        pointY: '3479925',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市彬县',
        pointX: '108077658',
        pointY: '35043911',
        station: '彬县',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市旬邑县',
        pointX: '108333986',
        pointY: '35111978',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市三原县',
        pointX: '108940509',
        pointY: '34617382',
        station: '三原',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市礼泉县',
        pointX: '108425018',
        pointY: '34481764',
        station: '礼泉',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市长武县',
        pointX: '107798757',
        pointY: '35205886',
        station: '长武',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市渭城区',
        pointX: '108737213',
        pointY: '34361988',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市兴平市',
        pointX: '108490475',
        pointY: '34299221',
        station: '兴平',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市武功县',
        pointX: '108200398',
        pointY: '34260204',
        station: '武功',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市泾阳县',
        pointX: '108842623',
        pointY: '34527114',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市安塞县',
        pointX: '109328842',
        pointY: '36863853',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市吴起县',
        pointX: '108175933',
        pointY: '36927216',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市子长县',
        pointX: '109675234',
        pointY: '37142668',
        station: '子长',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市延川县',
        pointX: '110193514',
        pointY: '36878117',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市秦都区',
        pointX: '108706272',
        pointY: '34329567',
        station: ['咸阳', '咸阳秦都'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '咸阳市杨陵区',
        pointX: '108084732',
        pointY: '34272117',
        station: '杨陵',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市黄陵县',
        pointX: '109262961',
        pointY: '35579428',
        station: '黄陵',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市志丹县',
        pointX: '108768432',
        pointY: '36822194',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '延安市延长县',
        pointX: '110012334',
        pointY: '36579313',
        station: '延安',
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市岐山县',
        pointX: '107621054',
        pointY: '34443459',
        station: '岐山',
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市凤翔县',
        pointX: '107400737',
        pointY: '34521218',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市眉县',
        pointX: '107749767',
        pointY: '34274247',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '宝鸡市金台区',
        pointX: '107146806',
        pointY: '34376069',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市商州区',
        pointX: '109941241',
        pointY: '33862703',
        station: '商洛',
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市柞水县',
        pointX: '109114207',
        pointY: '3368611',
        station: '柞水',
        train_number: []
    },
    {
        province: '陕西省',
        name: '商洛市商南县',
        pointX: '110881807',
        pointY: '33530995',
        station: '商南',
        train_number: []
    },{
        province: '陕西省',
        name: '商洛市镇安县',
        pointX: '109152893',
        pointY: '33423357',
        station: '镇安',
        train_number: []
    },{
        province: '陕西省',
        name: '商洛市丹凤县',
        pointX: '110327331',
        pointY: '33695783',
        station: '丹凤',
        train_number: []
    },{
        province: '陕西省',
        name: '咸阳市永寿县',
        pointX: '108142311',
        pointY: '34691979',
        station: '永寿',
        train_number: []
    },{
        province: '陕西省',
        name: '西安市户县',
        pointX: '10894755',
        pointY: '3418234',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },{
        province: '陕西省',
        name: '西安市阎良区',
        pointX: '109226102',
        pointY: '34662234',
        station: '阎良',
        train_number: []
    },{
        province: '陕西省',
        name: '西安市高陵县',
        pointX: '109088297',
        pointY: '3453483',
        station: ['西安', '西安北', '西安南'],
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市勉县',
        pointX: '106673221',
        pointY: '33153553',
        station: '勉县',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市南郑县',
        pointX: '10693623',
        pointY: '32999334',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市扶风县',
        pointX: '107900219',
        pointY: '34375411',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市太白县',
        pointX: '107319116',
        pointY: '34058401',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市凤县',
        pointX: '106515756',
        pointY: '33908469',
        station: '凤县',
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市陈仓区',
        pointX: '107387436',
        pointY: '34354456',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市麟游县',
        pointX: '107793525',
        pointY: '34677902',
        station: ['宝鸡', '宝鸡南'],
        train_number: []
    },{
        province: '陕西省',
        name: '宝鸡市千阳县',
        pointX: '107132442',
        pointY: '34642381',
        station: '千阳',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市韩城市',
        pointX: '110442847',
        pointY: '35476788',
        station: '韩城',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市大荔县',
        pointX: '109941658',
        pointY: '34797184',
        station: '大荔',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市华阴市',
        pointX: '110092301',
        pointY: '34566096',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市临渭区',
        pointX: '109492726',
        pointY: '34498192',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市蒲城县',
        pointX: '109586506',
        pointY: '34955855',
        station: '蒲城',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市富平县',
        pointX: '109180331',
        pointY: '34751086',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市汉台区',
        pointX: '107031856',
        pointY: '33067771',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市洋县',
        pointX: '107545837',
        pointY: '33222739',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市佛坪县',
        pointX: '107990539',
        pointY: '33524359',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市城固县',
        pointX: '10733393',
        pointY: '33157131',
        station: '城固',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市宁强县',
        pointX: '106257171',
        pointY: '32829694',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市镇巴县',
        pointX: '107895035',
        pointY: '32536704',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市澄城县',
        pointX: '10993235',
        pointY: '35190245',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市潼关县',
        pointX: '11024635',
        pointY: '34544296',
        station: '潼关',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市华县',
        pointX: '109776026',
        pointY: '34496578',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市合阳县',
        pointX: '110149466',
        pointY: '35237986',
        station: '合阳',
        train_number: []
    },{
        province: '陕西省',
        name: '渭南市白水县',
        pointX: '109590671',
        pointY: '35177452',
        station: ['渭南', '渭南北', '渭南镇'],
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市略阳县',
        pointX: '106156718',
        pointY: '33327281',
        station: '略阳',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市留坝县',
        pointX: '106920808',
        pointY: '33617571',
        station: '汉中',
        train_number: []
    },{
        province: '陕西省',
        name: '汉中市西乡县',
        pointX: '107766614',
        pointY: '32983101',
        station: '西乡',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市榆阳区',
        pointX: '109720309',
        pointY: '38277029',
        station: '榆林',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市米脂县',
        pointX: '110183754',
        pointY: '37755417',
        station: '米脂',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市绥德县',
        pointX: '110263362',
        pointY: '3750294',
        station: '绥德',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市神木县',
        pointX: '110498868',
        pointY: '38842498',
        station: '神木',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市府谷县',
        pointX: '111067366',
        pointY: '39028116',
        station: '榆林',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市靖边县',
        pointX: '108793988',
        pointY: '37599438',
        station: '靖边',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市横山县',
        pointX: '109294346',
        pointY: '37962209',
        station: '榆林',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市定边县',
        pointX: '107601267',
        pointY: '37594612',
        station: '定边',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市清涧县',
        pointX: '110121209',
        pointY: '37088878',
        station: '清涧县',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市佳县',
        pointX: '110491345',
        pointY: '38019511',
        station: '榆林',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市吴堡县',
        pointX: '110739673',
        pointY: '37452068',
        station: '吴堡',
        train_number: []
    },{
        province: '陕西省',
        name: '榆林市子洲县',
        pointX: '11003525',
        pointY: '37610683',
        station: '子洲',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市汉滨区',
        pointX: '109026836',
        pointY: '32695173',
        station: '安康',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市宁陕县',
        pointX: '108314283',
        pointY: '33310527',
        station: '安康',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市紫阳县',
        pointX: '108534229',
        pointY: '32520246',
        station: '紫阳',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市汉阴县',
        pointX: '108508745',
        pointY: '32893026',
        station: '汉阴',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市石泉县',
        pointX: '108247887',
        pointY: '33038408',
        station: '石泉县',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市旬阳县',
        pointX: '109365265',
        pointY: '32834086',
        station: ['旬阳', '旬阳北'],
        train_number: []
    },{
        province: '陕西省',
        name: '安康市镇坪县',
        pointX: '109526873',
        pointY: '31883672',
        station: '安康',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市平利县',
        pointX: '109361864',
        pointY: '32388854',
        station: '安康',
        train_number: []
    },{
        province: '陕西省',
        name: '安康市白河县',
        pointX: '110112629',
        pointY: '32809026',
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
