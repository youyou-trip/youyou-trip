var models = require('../config');
var express = require('express');
var router = express.Router();
var Mysql = require('../sqlTool');

// 连接数据库
var Connection = new Mysql(models.db);

// 增加用户接口
router.get('/all', async (req, res) => {
  let province = req.query.province
  // 获取起点城市和终点城市的省份
  // 获取起点终点城市所在省份的所有城市信息
  let countryArr = [], cityArr = []
  let cities = await Connection.selectData(['distinct city'], { province: province, }, 'city_data', false)
  cities.forEach(async (item, index) => {
    let country = await Connection.selectData(
      ['*'],
      { province: `'${province}'`, city: `'${item["city"]}'` },
      'city_data',
      true)
    cityArr.push(item['city'])
    countryArr.push(country)
    if (index == cities.length - 1) {
      res.send({ error: 1, city: cityArr, country: countryArr })
    }
  })
});

module.exports = router;
