const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
const router=express.Router();
//往路由器对象添加路由
//127.0.0.1:8080/ajax/test
//浏览器地址栏只能访问get方法的接口
//1.学习测试接口
router.get("/test",(req,res)=>{
	console.log("后台接收到请求");
	res.send("first ajax demo!!!");
});
//2.练习接口
router.get("/ex",(req,res)=>{
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	res.send($uname+"~~"+$upwd);
});
//3.原生http的get登录
router.get("/http_login",(req,res)=>{
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	console.log($uname);
	console.log($upwd);
	//数据库操作
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		console.log(typeof(result));
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
	//同一个接口中,不能同时执行两次send
	//接口的send中参数只能是字符串，不能是其他值
	// res.send($uname+"..."+$upwd);
});
//4.restful的get
router.get("/restful_login/:uname-:upwd",(req,res)=>{
	var _uname=req.params.uname;
	var _upwd=req.params.upwd;
	//数据库操作
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[_uname,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//5.restful的delete方法，根据uid删除用户
router.delete("/del/:uid",(req,res)=>{
	var _uid=req.params.uid;
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[_uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows==0){
			res.send("0");
		}else{
			res.send("1");
		}
	});
});
//6.根据uid查询用户
router.get("/search/:uid",(req,res)=>{
	var $uid=req.params.uid;
	var sql="select * from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		console.log(result);
		if(err) throw err;
		if(result.length>0){
			console.log(typeof(result));
			res.send(result);
		}else{
			res.send("0");
		}
	});
});
//7.post请求----登录
router.post("/post_login",(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	res.send($uname+"...."+$upwd);
	//操作数据库
});
//8.查询所有用户信息，并显示成表格
router.get("/list",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//导出路由器对象
module.exports=router;

//404  favicon.icon