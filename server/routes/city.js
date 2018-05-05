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
  let cityInfo = await Connection.selectData(['*'], { province: province, }, 'city_data', false)

  // let cityInfo = ps !== pe ? cityInfo1.concat(cityInfo2) : cityInfo1

  res.send({ error: 1, cityInfo: cityInfo })
});

module.exports = router;
