const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
const router=express.Router();
//往路由器对象添加路由
//1.用户登录
router.get("/v1/login/:uname&:upwd",(req,res)=>{
	var $uname=req.params.uname;
	var $upwd=req.params.upwd;
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//2.用户列表
router.get("/v1/list",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//3.根据uid删除用户
router.delete("/v1/del/:uid",(req,res)=>{
	var $uid=req.params.uid;
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows==0){
			res.send("0");
		}else{
			res.send("1");
		}
	});
});
//4.根据uid查询用户信息
router.get("/v1/search/:uid",(req,res)=>{
	var $uid=req.params.uid;
	var sql="select * from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send("0");
		}
	});
});
//5.根据uid修改
router.put("/v1/update",(req,res)=>{
	var obj=req.body;
	var sql="UPDATE xz_user SET ? WHERE uid=?";
	pool.query(sql,[obj,obj.uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});

router.post("/v1/reg",(req,res)=>{
	var obj=req.body;
	var sql="INSERT INTO xz_user SET ?";
	pool.query(sql,[obj],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});

//导出路由器对象
module.exports=router;

//404  favicon.icon