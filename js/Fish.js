var bigFishObj = function(){
	this.x;
	this.y;
	this.angle;
	
	//this.bigFishBodyTimer;
	this.bigFishBodyCount;
	this.bigFishBodyOra = [];
	this.bigFishBodyBlue = [];
	
	this.bigFishTailTimer;
	this.bigFishTailCount;
	this.bigFishTail = [];
	
	this.bigFishEyeTimer;
	this.bigFishEyeInterval;
	this.bigFishEyeCount;
	this.bigFishEye = [];
}
bigFishObj.prototype.init = function(){
	this.x = canvasWidth * 0.5;
	this.y = canvasHeight * 0.5;
	this.angle = 0;
	
	this.bigFishBodyTimer = 0;
	this.bigFishBodyCount = 0;
	
	this.bigFishTailTimer = 0;
	this.bigFishTailCount = 0; 
	
	this.bigFishEyeTimer = 0;
	this.bigFishEyeInterval = 1000;
	this.bigFishEyeCount = 0;
	
	//this.bigFishBodyTimer = 0;
	this.bigFishBodyCount = 0;
		
	//大鱼尾巴图片加载
	for(var i = 0 ; i < 8 ; i++){
		this.bigFishTail[i] = new Image();
		this.bigFishTail[i].src ="img/bigTail"+i+".png";
	}
	
	//大鱼眼睛图片加载
	for(var i = 0 ; i < 2 ; i++){
		this.bigFishEye[i] = new Image();
		this.bigFishEye[i].src = "img/babyEye"+i+".png";
	}
	
	//大鱼橘色身体图片加载
	for(var i = 0 ; i < 8 ; i++){
		this.bigFishBodyOra[i] = new Image();
		this.bigFishBodyOra[i].src = "img/bigSwim"+i+".png";
	}	
	//大鱼蓝色身体图片加载
	for(var i = 0 ; i < 8 ; i++){
		this.bigFishBodyBlue[i] = new Image();
		this.bigFishBodyBlue[i].src = "img/bigSwimBlue"+i+".png";
	}
}
bigFishObj.prototype.draw = function(){
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);
	
	var deltaY= my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;
	//beta这个角度就是鼠标与大鱼之间的角度差,+math.pi才不会尾巴朝着鼠标方向移动
	this.angle = lerpAngle(beta,this.angle,0.9); //让大鱼的角度一直趋向于鼠标的角度
	
	//大鱼尾巴摆动
	this.bigFishTailTimer += deltaTime;
	if(this.bigFishEyeTimer > 50){
		this.bigFishTailCount = (this.bigFishTailCount + 1 ) % 8;
		this.bigFishTailTimer %= 50;
	}
	
	//大鱼眼睛眨动
	this.bigFishEyeTimer += deltaTime;
	if(this.bigFishEyeTimer > this.bigFishEyeInterval){
		this.bigFishEyeCount = (this.bigFishEyeCount + 1) % 2;
		this.bigFishEyeTimer %= this.bigFishEyeInterval;
		if (this.bigFishEyeCount == 0) {
			this.bigFishEyeInterval = Math.random() * 1500 +2000;
		} else{
			this.bigFishEyeInterval = 200;
		}
	}
	
//	//大鱼身体颜色切换
//	this.bigFishBodyTimer += deltaTime;
//	if (this.bigFishBodyTimer > 300) {
//		this.bigFishBodyCount = this.bigFishBodyCount - 1;
//		this.smallBodyTimer %= 300;
//		if (this.bigFishBodyCount < 0) {
//			this.bigFishBodyCount = 0 ;
//		}
//	}
	var Bigbody;
	if (data.double == 1) {
		Bigbody = this.bigFishBodyOra[this.bigFishBodyCount];
	}else{
		Bigbody = this.bigFishBodyBlue[this.bigFishBodyCount];
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);//context.translate(x,y)函数可以使画布的原点坐标变为(x,y)
	ctx1.rotate(this.angle);//rotate旋转，旋转画布
	
	ctx1.drawImage(Bigbody, -Bigbody.width*0.5 ,-Bigbody.height * 0.5);
	var bigeye =  this.bigFishEye[this.bigFishEyeCount];
	ctx1.drawImage(bigeye, -bigeye.width*0.5 ,-bigeye.height * 0.5);
	var bigtail = this.bigFishTail[this.bigFishTailCount]
	ctx1.drawImage(bigtail, -bigtail.width*0.5+30 ,-bigtail.height * 0.5);
	ctx1.restore();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var smallFishObj = function(){
	this.x;
	this.y;
	this.angle;
	
	this.smallTailTimer;
	this.smallTailCount;
	this.smallTail = [];
	
	this.smallEyeTimer;
	this.smallEyeInterval;
	this.smallEyeCount;
	this.smallEye = [];
	
	this.smallBodyTimer;
	this.smallBodyCount;
	this.smallBody = [];
	
}
smallFishObj.prototype.init = function(){
	this.x = canvasWidth*0.5 +30;
	this.y = canvasHeight*0.5;
	this.angle = 0 ; 
	this.smallTailTimer = 0;
	this.smallTailCount = 0;
	this.smallEyeTimer = 0;
	this.smallEyeInterval = 1000;
	this.smallEyeCount = 0;
	this.smallBodyTimer = 0;
	this.smallBodyCount = 0;
	
	//尾巴图片加载
		for (var i = 0; i < 8; i++) {
//			var img = new Image();
//			img.src = "img/babyTail"+i+".png";
//			this.smallTail.push(img);
			this.smallTail[i] = new Image();
			this.smallTail[i].src = "img/babyTail"+i+".png";
		}
		
		//眼睛眨动图片加载
		for (var i = 0 ; i < 2 ; i++) {
			this.smallEye[i] = new Image();
			this.smallEye[i].src = "img/babyEye"+i+".png";
		}
		
		//身体颜色变化图片加载
		for(var i = 0 ; i < 20 ; i++){
			this.smallBody[i] = new Image();
			this.smallBody[i].src = "img/babyFade"+i+".png";
		}
		

}
smallFishObj.prototype.draw = function(){
	this.x = lerpDistance(bigFish.x, this.x, 0.98);
	this.y = lerpDistance(bigFish.y, this.y, 0.98);
	
	var deltaY= bigFish.y - this.y;
	var deltaX = bigFish.x - this.x;
	var beta = Math.atan2(deltaY,deltaX)+Math.PI;
	//beta这个角度就是大鱼与小鱼之间的角度差,+math.pi才不会尾巴朝着大鱼方向移动
	this.angle = lerpAngle(beta,this.angle,0.9); //让小鱼的角度一直趋向于大鱼的角度
	
	//尾巴在0-7张图之间切换
	this.smallTailTimer += deltaTime;
	if (this.smallTailTimer > 50) {
		this.smallTailCount = (this.smallTailCount+1)%8;
		this.smallTailTimer %= 50;
	}
	
	//眼睛切换
	this.smallEyeTimer += deltaTime;
	//console.log(this.smallEyeTimer);
	if (this.smallEyeTimer > this.smallEyeInterval) {
		this.smallEyeCount = (this.smallEyeCount+1)%2;
		this.smallEyeTimer %= this.smallEyeInterval;
		if (this.smallEyeCount == 0) {
			this.smallEyeInterval =Math.random()*1500 + 2000; // (2000,3500]
		}else{
			this.smallEyeInterval = 200;
				
		}
	}
	
	//身体颜色切换
	this.smallBodyTimer += deltaTime;
	if (this.smallBodyTimer > 300) {
		this.smallBodyCount = this.smallBodyCount + 1;
		this.smallBodyTimer %= 300;
		if (this.smallBodyCount > 19) {
			this.smallBodyCount = 19 ;
			//game over
			data.gameover = true;
		}
	}
	
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var smallbody = this.smallBody[this.smallBodyCount];
	ctx1.drawImage(smallbody,-smallbody.width*0.5,-smallbody.height*0.5);
	var smalleye = this.smallEye[this.smallEyeCount];
	ctx1.drawImage(smalleye,-smalleye.width*0.5,-smalleye.height*0.5);
	var smalltail = this.smallTail[this.smallTailCount];
	ctx1.drawImage(smalltail,-smalltail.width*0.5+25,-smalltail.height*0.5);
	ctx1.restore();
}


