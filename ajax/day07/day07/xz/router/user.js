const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//console.log(pool);
//创建路由器对象
const router=express.Router();
//往路由器对象添加路由
//1.用户注册 post /reg
router.post('/reg',(req,res)=>{
  //1.1获取post请求的数据
  let obj=req.body;
  console.log(obj);
  //1.2检测数据是否为空
  if(!obj.uname){
	//send代表响应结束，不允许再次执行响应
    res.send({code:401,msg:'uname required'});
	//阻止往后执行
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
  //1.3将数据插入到数据表xz_user中
  pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
    if(err) throw err;
	console.log(result);
    //响应成功的对象
	res.send({code:200,msg:'reg suc'});
  });
});
//注册结束
//2.用户登录 post /login
router.post('/login',(req,res)=>{
  //2.1获取post请求的数据
  let obj=req.body;
  console.log(obj);
  //2.2验证数据是否为空
  if(!obj.uname){
    res.send({code:401,msg:'uname required'});
	return;
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  //2.3执行SQL语句
  pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
    if(err) throw err;
	//result 结果是数组
	console.log(result);
	//如果为空数组表示登陆失败，否则登陆成功
    if(result.length===0){
	  res.send({code:301,msg:'login err'});
	}else{
	  res.send({code:200,msg:'login suc'});
	}
  });
});
//3.修改用户 get  /update
router.get('/update',(req,res)=>{
  //3.1获取查询字符串传递的数据
  let obj=req.query;
  console.log(obj);
  //3.2批量验证数据是否为空
  //遍历对象，访问对象中每个属性
  let i=400;
  for(let key in obj){
	//每遍历一个，i的值加1
	i++;
	//key 每个属性名
	//obj[key]  每个属性名对应的属性值
    //console.log(key,obj[key]);
	//如果属性值为空，则提示对应的属性名是必须的
    if(!obj[key]){
	  res.send({code:i,msg:key+' required'});
	  return;
	}
  }
  //3.3执行SQL语句
  //可以执行使用对象修改
  pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],(err,result)=>{
    if(err)  throw err;
	//返回的是对象
    console.log(result);
	//如果对象下的属性affectedRows的值为0,表示修改失败，否则修改成功
	if(result.affectedRows===0){
	  res.send({code:301,msg:'update err'});
	}else{
	  res.send({code:200,msg:'update suc'});
	}
  });
});
//4.用户列表 get  /list
router.get('/list',(req,res)=>{
  //4.1获取查询字符串传递的数据
  let obj=req.query;
  //4.2如果当前页码为空，默认为1
  if(!obj.pno) obj.pno=1;
  //如果每页数据量为空，默认为2
  if(!obj.count) obj.count=2;
  console.log(obj);
  //4.3计算开始查询的值，隐式转为了数值型
  let start=(obj.pno-1)*obj.count;
  //4.4将每页的数据量转为整型
  let c=parseInt(obj.count);
  //4.5执行SQL语句
  pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,c],(err,result)=>{
    if(err)  throw err;
	console.log(result);
	//直接将数据响应给浏览器
	res.send(result);
  });
  //res.send('这是用户列表');
});
//5.检索用户（用户详情）  get  /detail
router.get('/detail',(req,res)=>{
  //5.1获取查询字符串传递的数据
  let obj=req.query;
  console.log(obj);
  //5.2验证数据是否为空
  if(!obj.uid){
    res.send({code:401,msg:'uid required'});
	return;
  }
  //5.3执行SQL语句
  pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err)  throw err;
	console.log(result);
	//响应到浏览器端
	res.send(result);
  });
  //res.send('这是用户的详情');
});
//6.删除用户 get  /delete
router.get('/delete',(req,res)=>{
  //6.1获取查询字符串传递的数据
  let obj=req.query;
  console.log(obj);
  //6.2验证是否为空
  if(!obj.uid){
    res.send({code:401,msg:'uid required'});
	return;
  }
  //6.3执行SQL语句
  pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err)  throw err;
	//结果是对象
	console.log(result);
	//如果对象下的属性affectedRows的值为0表示删除失败，否则表示删除成功
	if(result.affectedRows===0){
	  res.send({code:301,msg:'delete err'});
	}else{
	  res.send({code:200,msg:'delete suc'});
	}
  });
   //res.send('删除用户');
});

//导出路由器对象
module.exports=router;