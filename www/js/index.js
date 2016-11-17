
//顶部nav
var snFold = document.getElementsByClassName("sn-fold");
for(var i=0;i<snFold.length;i++){
	snFold[i].onmouseenter = function(e){
		
		e.target.querySelector("a").style.color = "#E31939";
		e.target.querySelector("a").style.textDecoration = "underline";
		e.target.querySelector(".fa-angle-down").style.transform = "rotateZ(180deg)";
		//e.target.querySelector(".fa-angle-down").classList.add("fa-rotate-180")
		e.target.querySelector("div").style.display = "block";
	}
	snFold[i].onmouseleave = function(e){
		e.target.querySelector("a").style.color = "#666666";
		e.target.querySelector("a").style.textDecoration = "none";
		e.target.querySelector(".fa-angle-down").style.transform = "rotateZ(0deg)";
		//e.target.querySelector(".fa-angle-down").classList.remove("fa-rotate-180");
		e.target.querySelector("div").style.display = "none";
	}
	
}
//---------------------
//-----------限时抢购------
//倒计时
function ShowCountDown(year,month,day,selector) {
	var now,endDate,leftTime,leftsecond,day1,hour,minute,second
	setInterval(function(){
		now = new Date(); 
		endDate = new Date(year, month-1, day); 
		leftTime=endDate.getTime()-now.getTime(); 
		leftsecond = parseInt(leftTime/1000); 
		//day1=parseInt(leftsecond/(24*60*60*6)); 
		day1=Math.floor(leftsecond/(60*60*24)); 
		hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
		minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
		second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
		//console.log($(selector+" span"));
		$(selector+" span").eq(0).text(day1)
		$(selector+" span").eq(1).text(hour)
		$(selector+" span").eq(2).text(minute)
		$(selector+" span").eq(3).text(second)
		//console.log("距离"+year+"年"+month+"月"+day+"日还有："+day1+"天"+hour+"小时"+minute+"分"+second+"秒")		
	},1000)
} 
ShowCountDown(2016,12,10,"#countDownBox1")
ShowCountDown(2016,12,17,"#countDownBox2")
ShowCountDown(2016,12,1,"#countDownBox3")
ShowCountDown(2016,12,27,"#countDownBox4")
ShowCountDown(2017,1,10,"#countDownBox5")


$(".next").click(function(){
	var translateX = $(".discount").css("transform").split(",")[4]*1
	translateX = translateX<-630?-630:translateX;
	$(".discount").css("transform","translateX("+(translateX-210)+"px)");

})
$(".pre").click(function(){
	var translateX = $(".discount").css("transform").split(",")[4]*1
	translateX = translateX>-210?-210:translateX;
	$(".discount").css("transform","translateX("+(translateX+210)+"px)")

})


//商城公告,招商入驻
$(".tabs").children().mouseenter(function(e){
	if($(e.target).index()){
		$(".tabs").children().eq(0).removeClass("tabs-selected")
		$(".tabs").children().eq(1).addClass("tabs-selected");
		$(".mall-news").css("display","none")
		$(".tabs-panel").css("display","block")
	}else{
		$(".tabs").children().eq(1).removeClass("tabs-selected")
		$(".tabs").children().eq(0).addClass("tabs-selected");
		$(".mall-news").css("display","block")
		$(".tabs-panel").css("display","none")
	}
})



//图片晃动动画
$(".store-con img").mouseenter(function(e){
	$(e.target).addClass("animated flipInX")
	setTimeout(function(){
		$(e.target).removeClass("animated flipInX")
	},1000)
})


// index-sale
$(".tabs-option li").mouseenter(function(e){
	$(".tabs-option li").removeClass("tabs-current");
	$(".tabs-option li i").removeClass("fa fa-caret-up");
	$(this).addClass("tabs-current");
	$(this).children("i").addClass("fa fa-caret-up");

	$(".tabs-sale-goods").removeClass("current-list")
	$(".tabs-sale-goods").eq($(this).index()).addClass("current-list")
})


