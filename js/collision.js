//判断大鱼与果实之间的碰撞
function BigFruitCollision() {
	if (data.gameover == false) {
		for(var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]) {
			var lenght = calLength2(fruit.x[i], fruit.y[i], bigFish.x, bigFish.y);
			if(lenght < 900) {
				if(fruit.l[i] > 14) { //设置果实在生长状态时大鱼无法吃
					fruit.eatUp(i);
					
					data.fruitNum++ ;
					
					//大鱼身体颜色变化					
					bigFish.bigFishBodyCount++;
					if (bigFish.bigFishBodyCount > 7) {
						bigFish.bigFishBodyCount = 7
					}
					
					if(fruit.fruitType[i] == "blue"){
						data.double = 2;
						audiobf.currentTime=0;
						audiobf.play();
					}
					else if(fruit.fruitType[i] == "orange"){
//						data.double = 1 ;
						audiobf.currentTime=0;
						audiobf.play();
					}
					else{
						fruit.isWudi = true;
						setTimeout(function(){
							fruit.isWudi = false;
						},10000);
						WudiTime = 10;
						setInterval(function(){
							WudiTime = WudiTime-1;
							if(WudiTime <= 0){
								WudiTime = 0;
							}
						},1000);
						data.double = 10;
						audiolp.currentTime=0;
						audiolp.play();
					}
					circle.born(fruit.x[i],fruit.y[i],fruit);//圈圈特效
					
				}

			}
		}
	}
	}
	
}

//bigfish  and smallfish collision
function BigSmallCollision() {
		if (data.fruitNum > 0 && data.gameover == false) {
			var l = calLength2(bigFish.x, bigFish.y, smallFish.x, smallFish.y);
			if(l < 900) {
				//大鱼吃到果实喂给小鱼才有分数，大鱼小鱼的身体颜色才会切换
			
					smallFish.smallBodyCount = 0;
					bigFish.bigFishBodyCount = 0;
					data.addScore();
					circle.born(smallFish.x,smallFish.y,smallFish);//圈圈特效
					data.double = 1 ;
					audiobs.currentTime=0;
					audiobs.play();
				}
			
	}
}

function FishHinderCollision(){
	
		if (!data.gameover && modefont !=="简单模式") {
			if(!fruit.isWudi){
				for (var i = 0 ; i < hinder.num; i++) {
				var lenght= calLength2(bigFish.x, bigFish.y, hinder.x[i]+ hinder.pic[hinder.picNo[i]].width*0.5, hinder.y[i]+ hinder.pic[hinder.picNo[i]].height*0.5);
	
				
				if (lenght< 1400 ) {
				//	console.log("++++");
					data.gameover = true;
					circle.born(hinder.x[i]+ hinder.pic[hinder.picNo[i]].width*0.5, hinder.y[i]+ hinder.pic[hinder.picNo[i]].height*0.5,smallFish);
					
					audiobh.currentTime=0;
					audiobh.play();
				}
				}
			}else{
				for (var i = 0 ; i < hinder.num; i++) {
				var lenght= calLength2(bigFish.x, bigFish.y, hinder.x[i]+ hinder.pic[hinder.picNo[i]].width*0.5, hinder.y[i]+ hinder.pic[hinder.picNo[i]].height*0.5);
	
				
				if (lenght< 1400 ) {
					hinder.eatUp(i)
//					data.double=10;
					circle.born(hinder.x[i]+ hinder.pic[hinder.picNo[i]].width*0.5, hinder.y[i]+ hinder.pic[hinder.picNo[i]].height*0.5,smallFish);					
					audiobf.currentTime=0;
					audiobf.play();
				}
				}
			}

			
		
		}
}
