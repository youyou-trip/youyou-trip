### 登陆/注册功能模块
    - 登陆：前端页面填写用户id与password
	       提交方式：post
           格式：“id=xxx&password=xxx”(string)
           url：http://localhost:3000/login
           返回数据：1(string,登陆成功) 或者 0(string,用户名或密码错误)
    - 注册：前端页面填写用户id，name，password
	       提交方式：post
	       格式：“id=xxx&name=xxx&password=xxx”(string)
	       url：http://localhost:3000/signin
           返回数据：1(string,注册成功) 或者 0(string,该id已有人使用)

### 起始/终点输入模块
    功能：输入起点，终点
    推荐陕西著名景点
    交互：前端页面填写起点和终点
          提交方式：post
          格式：“start=xxx&end=xxx”(string)
          url: http://localhost:3000/start-end
          返回数据：{ error: 0|1 }(1代表存储成功)
                    成功后跳转到规划城市路径路由
### 规划城市最短路线模块（放在前端页面实现）
    点击城市名称，切换该城市加入或剔除该节点，并用TSP算法实时计算出最短路径，并更新显示
    点击确定，将路径提交后台，并存入数据表中
    交互：前端页面将规划好后的路线提交服务器
          提交方式：post
          格式：“route=[x, xx, xxx]”(string)，提交城市id
          url：http://localhost:3000/update-path
          返回数据：{error: 1|0}(1代表存储成功)