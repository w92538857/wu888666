const express=require('express');
//引入用户路由器
const userRouter=require('./router/user.js');
const ajaxRouter=require('./router/ajax.js');
const proRouter=require('./router/pro.js');

//引入body-parser中间件
const bodyParser=require('body-parser');
//创建web服务器
const app=express();
//设置端口
app.listen(8080);
//托管静态资源到public目录
app.use( express.static('public') );
app.use( express.static('ajax') );
app.use( express.static('pro') );
//引用body-parser中间件，将post请求数据解析为对象
app.use( bodyParser.urlencoded({
  extended:false
}) );

//不管路由还是路由器一定要放到最后
//挂载路由器，添加前缀 /user   ->  /user/reg
app.use('/user',userRouter);
app.use('/ajax',ajaxRouter);
app.use('/pro',proRouter);
//127.0.0.1:8080/pro
