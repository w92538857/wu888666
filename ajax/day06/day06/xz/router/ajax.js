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
//作业，http原生带参get方法
router.get("/login_http",(req,res)=>{
	var _uname=req.query.uname;
	var _upwd=req.query.upwd;
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[_uname,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			//响应数据能短就短
			//响应数据，必须是string类型
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//restful的get登录
router.get("/login_restful/:uname&:upwd",(req,res)=>{
	// 获取参数变量,看见冒号
	var _uname=req.params.uname;
	var _upwd=req.params.upwd;
	console.log(_uname+"~~~~~"+_upwd);
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[_uname,_upwd],(err,result)=>{
		if(err) throw err;
		if(result.lengh>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//restful的delete方法，操作和restful的get一样
router.delete("/restful_del/:uname&:upwd",(req,res)=>{
	var _uname=req.params.uname;
	var _upwd=req.params.upwd;
	res.send(_uname+"....."+_upwd);
});
//restful根据uid删除用户信息
router.delete("/user_del/:uid",(req,res)=>{
	var _uid=req.params.uid;
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[_uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("删除成功");
		}else{
			res.send("删除失败");
		}
	});
});
//restful和原生post操作一样
router.post("/post_login",(req,res)=>{
	var _uname=req.body.uname;
	var _upwd=req.body.upwd;
	//数据操作
	res.send(_uname+"--------"+_upwd);
});
//获取所有用户信息
router.get("/getlist",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(typeof(result));
		res.send(result);
	});
});
//路由器对象导出
module.exports=router;