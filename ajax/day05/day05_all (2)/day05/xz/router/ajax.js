const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//console.log(pool);
//创建路由器对象
const router=express.Router();
//往路由器对象添加路由
//1.验证接口，只有get方法，可以在浏览器地址栏验证
//127.0.0.1:8080/ajax/test
router.get("/test",(req,res)=>{
	console.log("ajax请求接收成功");
	res.send("测试成功！");
});
//http原生的带参数的get方法
router.get("/login",(req,res)=>{
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	//数据库登录操作
	res.send($uname+"崇拜"+$upwd);
});



//路由器对象导出
module.exports=router;