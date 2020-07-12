const express=require('express');
//创建路由器对象
const router=express.Router();
//引入mysql连接池模块
const pool=require('../pool.js');
//往路由器对象中添加路由
//登录  get  /pro/v1/login/:uname&:upwd  
router.get("/v1/login/:uname&:upwd",(req,res)=>{
	var $uname=req.params.uname;
	var $upwd=req.params.upwd;
	console.log($uname,$upwd);
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
	});
});

//用户列表  get  /pro/v1/list
router.get("/v1/list",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send(result);
	});
});

//根据id删除用户  delete  /pro/v1/del/:uid
router.delete("/v1/del:uid",(req,res)=>{
	var $uid=req.params.uid;
	console.log($uid);
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	})
});
//根据uid查询用户信息  get     /pro/v1/search/:uid  
router.get("/v1/search/:uid",(req,res)=>{
	var $uid=req.params.uid;
	var sql="select * from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send(result);
	})
});

//根据uid修改用户信息  put  /pro/v1/update
router.put("/pro/v1/update",(req,res)=>{
	var $uid=req.param.uid;
})
module.exports=router;
