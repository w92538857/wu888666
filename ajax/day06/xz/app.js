const express=require('express');
//引入用户路由器
const userRouter=require('./router/user.js');
const ajaxRouter=require('./router/ajax.js');
const proRouter=require('./router/pro.js');
//console.log(userRouter);
//引用body-parser中间件
const bodyParser=require('body-Parser');
//创建web服务器
const app=express();
//设置端口
app.listen(8080);
//托管静态资源到public目录
app.use(express.static('public'));
app.use(express.static('ajax'));
app.use(express.static('pro'));
//应用body-Parser中间件，将post请求数据解析为对象
app.use(bodyParser.urlencoded({
	extended:false
}));
//挂载路由器 并添加前缀
app.use('/user',userRouter);
app.use('/ajax',ajaxRouter);
app.use('/pro',proRouter);