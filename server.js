var express = require("express");

var app = express();

app.use(express.static("www"));

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));

var cookieParser = require("cookie-parser");

app.use(cookieParser());

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/taodudu");

var db = mongoose.connection;

db.on("open",function(){
	console.log("数据库连接成功");
});

db.on("error",function(){
	console.log("数据库连接失败");
});


var userSchema = mongoose.Schema({
	account:String,
	psw:String,
	token:String
});

var User = mongoose.model("user",userSchema);

//注册接口
app.post("/user/regist",function(req,res){
	console.log(req.body);
	if(req.body.agree!="1"){
		res.json({err:2,msg:"注册失败"});
		return;
	}
	User.find({account:req.body.account})
	.count()
	.exec(function(err,data){
		if(data>0){
			res.json({err:1,msg:"用户名已存在"});
		}else{
			var u = new User({				
				account:req.body.account,
				psw:req.body.password
			});
			
			u.save(function(err){
				if(err){
					res.json({err:2,msg:"注册失败"});
				}else{
					res.json({err:0,msg:"注册成功"});
				}
			})
		}
	})		
	
})


var sourceStr = '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
function makeToken(){
	//登录成功后随即生成一个字符串,当做登录凭证,通过cookie传给客户端
	var token = '';
	for(var i=0;i<10;i++){
		var index = Math.floor(Math.random()*sourceStr.length)
		token += sourceStr[index]
	}
	return token;
}

//登录接口
app.post("/user/login",function(req,res){
	console.log(req.body)
	User.find({account:req.body.account,psw:req.body.psw})
	.exec(function(err,data){
		if(!err){
			if(data.length>0){
				var token = makeToken();
				data[0].token = token;
				data[0].save(function(){
					res.cookie("token",token);
					//res.cookie("account",user.account);
					res.json({err:0,msg:"登录成功"});
				})
				
			}else{
				res.json({err:3,msg:"账号或密码错误"});
				
			}
		}
			
	})
})

function isLogin(req,res,next){
	var token = req.cookies.token;
	User.find({token})
	.count()
	.exec(function(err,data){
		if(data>0){
			next();
		}else{
			res.json({err:1,msg:"没有登录"});
		}
	});
}


//app.post("/user/all",isLogin,function(req,res){
//	
//	User.find({token:{$ne:req.cookies.token}},{"account":1})
//	.exec(function(err,data){
//		res.json({err:0,data:data})
//	});
//	
//});





var goodsData = mongoose.Schema({
	identifier:String,
	img:String,
	desc:String,
	price:String
});

var Goods = mongoose.model("sale",goodsData);


app.post("/guanli",function(req,res){
	
	console.log(req.body);
	
	if(typeof req.body.identifier == "number"){
		Goods.find({identifier:req.body.identifier})
		.count()
		.exec(function(err,data){
			if(data>0){
				Goods.update({identifier:req.body.identifier},{
					img:req.body.imgsrc,
					
				})
				.exec(function(err){
					if(!err){
						res.json({err:0,msg:"修改成功"});
					}
					
				})
			}else{
				var p = new Goods({
					identifier:req.body.identifier,
					img:req.body.imgsrc,					
				});
				
				p.save(function(err){
					if(err){
						res.json({err:2,msg:"服务器存储失败"});
					}else{
						res.json({err:0,msg:"添加成功"});
					}
				})
			}
		})
		
	}else{
		Goods.find({identifier:req.body.identifier})
		.count()
		.exec(function(err,data){
			if(data>0){
				Goods.update({identifier:req.body.identifier},{
					img:req.body.imgsrc,
					desc:req.body.desc,
					price:req.body.price
				})
				.exec(function(err){
					if(!err){
						res.json({err:0,msg:"修改成功"});
					}
					
				})
				
			}else{
				var g = new Goods({
					identifier:req.body.identifier,
					img:req.body.imgsrc,
					desc:req.body.desc,
					price:req.body.price
				});
				
				g.save(function(err){
					if(err){
						res.json({err:2,msg:"服务器存储失败"});
					}else{
						res.json({err:0,msg:"添加成功"});
					}
				})
			}
		})
	}
			
	
})

//var data = ["疯狂抢购1","疯狂抢购2","疯狂抢购3","疯狂抢购4","疯狂抢购5",
//			"热销排行1","热销排行2","热销排行3","热销排行4","热销排行5",
//			"商城热卖1","商城热卖2","商城热卖3","商城热卖4","商城热卖5",
//			"商城推荐1","商城推荐2","商城推荐3","商城推荐4","商城推荐5",
//			"新品上市1","新品上市2","新品上市3","新品上市4","新品上市5"]

app.post("/goods-data",function(req,res){
	
	//var result = []
		Goods.find()
		.exec(function(err,data){
			//console.log(data);
//			data.map(function(obj){
//				
//				//result.push(obj);				
//			})
			res.json({err:0,data:data});
		})
		
		
	
	
})







app.listen(8080,function(){
	console.log("服务器开启")
})
