var circleObj = function(){

	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
	this.obj;
	this.dustPic=[];
}
circleObj.prototype.num = 20;

circleObj.prototype.init = function(){
	for (var i = 0 ; i < this.num ; i++) {
		this.alive[i] = false;
		this.r[i] = 0 ; 
	}
	this.angle = 0 ; 
	for (var n = 0 ; n < 7 ; n++) {
		this.dustPic[n] = new Image();
		this.dustPic[n].src = "img/dust"+n+".png";
	}
	this.obj = "";
}
circleObj.prototype.draw = function(){
		ctx1.save();

		for (var i = 0 ; i < this.num ; i++) {

			if(this.alive[i]){
			//draw
			this.r[i] += deltaTime * 0.05;
			ctx1.lineWidth = 4;
			
			if(this.obj == fruit){
				if (this.r[i] > 50) {
						this.alive[i] = false;
						break;
					}
				var a = 1 - this.r[i]/50 ; 
				ctx1.beginPath();
				ctx1.strokeStyle = "rgba(255,255,255,"+a+")"; 
				ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI,true);
				ctx1.closePath();
				ctx1.stroke();	
			
			}else{
				//ctx1.save();		
				if (this.r[i] > 80) {
						this.alive[i] = false;
						break;
					}
				var a = 1 - this.r[i]/80 ; 
				ctx1.beginPath();
				ctx1.strokeStyle = "rgba(255, 165, 0,"+a+")";
				ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI,true);
				ctx1.closePath();
				ctx1.stroke();
					//ctx1.restore();
			}
			}
	}
		ctx1.restore();
}

circleObj.prototype.born = function(x,y,obj){
	for (var i = 0 ; i < this.num ; i++) {
		if(!this.alive[i]){
			this.obj = obj;
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y; 
	//		console.log("born");
			return; //一次一个
			}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//漂浮物
var dustObj = function(){
	this.dustx = [];
	this.dusty = [];
	this.amp = [] ;
	this.dustNO = [];
	this.angle;
	this.dustPic = [];
}
dustObj.prototype.num = 35;

dustObj.prototype.init = function(){
	for (var i = 0 ; i < this.num ; i++) {
		this.dustx[i] = Math.random() * canvasWidth;
		this.dusty[i] = Math.random() * canvasHeight;
		this.amp[i] = Math.random() * 15 + 15 ;
		this.dustNO[i] = Math.floor(Math.random() * 7);//[0,7) // dust图片序号	
	}
	this.angle = 0 ; 
	for (var i = 0 ; i < 7 ; i++) {
		this.dustPic[i] = new Image();
		this.dustPic[i].src = "img/dust"+i+".png";
	}
}
dustObj.prototype.draw = function(){
		ctx1.save();

			this.angle += deltaTime * 0.0008;
			var l  = Math.sin(this.angle);
		for (var i = 0 ; i < this.num ; i++) {
			ctx1.drawImage(this.dustPic[this.dustNO[i]],this.dustx[i] + l * this.amp[i] ,this.dusty[i]);
			
			}
		ctx1.restore();
	}
		