

$.post("/goods-data",function(resData){
	//console.dir(resData.data)

		if(resData.err == 0){
			var data = resData.data;
			var dd = {
				title:["疯狂抢购","热销排行","商城热卖","商城推荐","新品上市"],
				street:[],
				goods:[ [],[],[],[],[] ]
			}
			
			data.map(function(obj,index){
				for(var i = 0;i<5;i++){
					var o1 = data.find(function(obj){
						return obj.identifier == dd.title[i]+(index+1);
					})
					if(o1){
						dd.goods[i].push(o1)
					}
				}
								
				if(!isNaN(obj.identifier*1)){
					dd.street.push(obj)
				}
				
			})
		
			var htmlStr = template("tt",dd);
			var indexSale = document.getElementById("index-sale")
			indexSale.innerHTML = htmlStr;
			
			var htmlStr2 = template("tab",dd);
			var storeCon = document.getElementById("store-wall-content")
			storeCon.innerHTML = htmlStr2;
			
		}
	});


