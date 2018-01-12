### 登陆/注册功能模块
    - 登陆：前端页面填写用户id与password
	       提交方式：post
           格式：“id=xxx&password=xxx”(string)
           url：http://localhost:3000/login
           返回数据：登陆成功 或者 用户名或密码错误
    - 注册：前端页面填写用户id，name，password
	       提交方式：post
	       格式：“id=xxx&name=xxx&password=xxx”(string)
	       url：http://localhost:3000/signin
           返回数据：注册成功 或者 该id已有人使用

### 起始/终点输入模块
    功能：输入起点，终点
    推荐陕西著名景点
    交互：前端页面填写起点和终点
          提交方式：post
          格式：“start=xxx&end=xxx”(string)
          url: http://localhost:3000/start-end
          返回数据：所有城市信息（包含坐标，前端根据坐标在地图上显示大致位置）
                   热门景点信息
                   { cityInfo: cityInfo(string), hotSights: hotSights(string)}
### 规划城市最短路线
    交互：前端页面将起点，终点以及经过的节点传给后端
          提交方式：post
          格式：“nodes={'start':xxx, 'end': xxx, 'pass': [x, xx, xxx]}”(string)，提交城市id
          url：http://localhost:3000/update-path
          返回数据：城市最短路径，城市用id表示