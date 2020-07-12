const express=require('express');
//创建路由器对象
const router=express.Router();
//引入mysql连接池模块
const pool=require('../pool.js');
//往路由器对象中添加路由
//1.用户注册路由 post	/reg
router.post('/reg',(req,res)=>{
	//1.1获取post传递的数据
	let obj=req.body;
	console.log(obj);
	//1.2验证数据是否为空
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if(!obj.email){
		res.send({code:403,msg:'email required'});
		return;
	}
	if(!obj.phone){
		res.send({code:404,msg:'phone required'});
		return;
	}
	//1.3执行sql语句
	pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send({code:200,msg:'reg suc'});
	});
});
module.exports=router;