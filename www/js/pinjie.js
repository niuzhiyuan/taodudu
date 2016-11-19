

$.post("/goods-data",function(resData){
		if(resData.err == 0){
			
			var data = resData.data;
			var fengkuang1 = data.find(function(obj){
				return obj.identifier == "疯狂抢购1";
			})
			var fengkuang2 = data.find(function(obj){
				return obj.identifier == "疯狂抢购2";
			})
			var fengkuang3 = data.find(function(obj){
				return obj.identifier == "疯狂抢购3";
			})
			var fengkuang4 = data.find(function(obj){
				return obj.identifier == "疯狂抢购4";
			})
			var fengkuang5 = data.find(function(obj){
				return obj.identifier == "疯狂抢购5";
			})


		}
	});
