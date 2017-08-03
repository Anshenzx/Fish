var dataObj = function(){
	this.fruitNum ;
	this.double;
	this.aphla;
	this.score;
	this.gameover;
}
dataObj.prototype.init = function(){
	this.fruitNum = 0 ;
	this.double = 1;
	this.score = 0;
	this.aphla = 0;
	this.gameover = false;

	ctx1.font = "30px Arial";
	ctx1.textAlign = "center";
}
dataObj.prototype.draw = function(){
	var w = canvasWidth*0.5;
	var h = canvasHeight * 0.5; 
	
	ctx1.save();
	ctx1.fillStyle = "#fff"
	ctx1.shadowBlur = 10 ;
	ctx1.shadowColor = "#fff";
	var liveTime = 19-smallFish.smallBodyCount;
	ctx1.fillText("小鱼存活时间: "+liveTime,w,h+290);
	ctx1.fillText("分数加倍倍率: "+this.double,w,h+260);	
	if(fruit.isWudi){
		ctx1.fillText("无敌时间",w,h);
	}
//	console.log();
	
	ctx1.fillText("SCORE: "+this.score,w,30);	
	
	if (this.gameover == true) {
	
		this.aphla += deltaTime * 0.0005;
		if (this.aphla > 1) {
			this.aphla = 1 ;
		}
		ctx1.font = "45px Arial";
		ctx1.fillStyle = "rgba(255,255,255,"+this.aphla+")";
		ctx1.fillText("GAME OVER",w,h);	
		

		if(window.localStorage){
		
			localStorage.setItem(modefont+"_"+this.score,this.score);
		
		}
	}
	ctx1.restore();
}
dataObj.prototype.addScore = function(){
	this.score +=this.fruitNum * this.double * 10;
	this.fruitNum = 0 ;
	this.double = 1;
	//console.log(this.score);
}

