const express=require('express');
//引入mysql连接池模块
const pool=require('../pool.js');
//创建路由器对象
const router=express.Router();
//往路由器对象中添加路由
//1.验证接口，只有get方法，可以在浏览器地址栏验证
//127.0.0.1:8080/ajax
router.get("/test",(req,res)=>{
	console.log("请求成功");
	res.send("测试成功！");
});

router.get("/ex1",(req,res)=>{
	res.send("终于得到了正确响应数据");
})
/*
//http原生的带参数的get方法
router.get("/login",(req,res)=>{
	//获取请求的参数
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	if(!$uname){res.send("-1");return;}
	if(!$upwd){res.send("-1");return;}
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	})
})
*/
router.get("/login",(req,res)=>{
	//获取请求的参数
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	if(!$uname){res.send("-1");return;}
	if(!$upwd){res.send("-1");return;};
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	})
})


router.get("/getList",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send(result);
	})
})
//路由器对象导出
module.exports=router;