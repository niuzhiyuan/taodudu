


//注册
$("#form-regist").submit(function(e){
	e.preventDefault();
	if(!$("#account").val().match(/^\w{1,13}$/)){
		alert("账号格式不合符要求");
		return;
	}
	if($("#password").val()!=$("#confirm").val()){
		alert("两次密码输入不一致");
		return;
	}
	
	if($("#agreement").prop("checked")!= true){
		alert("您必须同意才能注册");
		return;
	}
	var data = $("#form-regist").serialize();
	
	$.post("/user/regist",data,function(resData){
		alert(resData.msg);
		
		if(resData.err == 0){
			//注册成功之后，跳转登录页面
			//location.href = "login.html";
			$(".pop-con").css("transform","translateX(0px)");
		}
	});
});

//登录

$("#login").submit(function(e){
	e.preventDefault();
	if(!$("#user-name").val().match(/^\w{1,13}$/)){
		alert("账号格式不合符要求");
		return;
	}

	var data = $("#login").serialize();
	console.log(data)
	$.post("/user/login",data,function(resData){
		alert(resData.msg);
		if(resData.err == 0){
			//location.href = "/";
			$(".pop-mask").hide();
			$("#login-account").children()
			.attr("id","account-name")
			.html($("#user-name").val())
			
			$("#regist-logout").children()
			.attr("id","logout")
			.html("退出")
			.click(function(){
				confirm("确认退出吗");
			})
		}
	});
	
});