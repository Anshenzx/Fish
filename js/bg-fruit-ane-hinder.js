function drawBackground(){
	ctx2.drawImage(backgroundPic, 0, 0, canvasWidth, canvasHeight);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////海葵对象/////////////////////////////////////////////////////

var aneObj = function(){
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.angle = 0;
	this.amp = [];//函数振幅
}
//prototype 属性使您有能力向对象添加属性和方法
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for (var i = 0;i<this.num;i++) {
		this.rootx[i] = i * 16 + Math.random() *  18;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canvasHeight - 200 + Math.random()*50;
		this.amp[i] = Math.random() * 50 + 50 ;
	}
	//console.log("aaa");
}
aneObj.prototype.draw= function(){
	this.angle += deltaTime * 0.0008;
	var l = Math.sin(this.angle);//[-1,1]
	//save() 方法保存当前图像状态的一份拷贝。
	ctx2.save();
	//指定在画布上绘制的内容的不透明度。这个值的范围在 0.0（完全透明）和 1.0（完全不透明）之间。默认值为 1.0。
	ctx2.globalAlpha = 0.6;
	ctx2.lineCap="round";
	ctx2.lineWidth = 20;
	ctx2.strokeStyle = "green"
	for (var i = 0; i < this.num;  i++) {
		ctx2.beginPath();//从画布底端画起
		ctx2.moveTo(this.rootx[i],canvasHeight);
		//ctx2.lineTo(this.x[i],canvasHeight-this.lenght[i]);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],canvasHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	//restore() 方法从栈中弹出存储的图形状态并恢复 CanvasRenderingContext2D 对象的属性、剪切路径和变换矩阵的值。
	ctx2.restore();
		
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//创建果实对象fruit
var fruitObj = function(){
	this.alive = [];//boolean
	this.x = [];
	this.y = [];
	this.l  = [];
	this.aneNO = [];
	this.speed = [];
	this.fruitType = [] ;
	this.isWudi ;
	//果实,能量的图片资源
	this.orange = new Image();
	this.blue = new Image();
	this.wudi = new Image();
}
/*
	首先给它定义一个数量，池子，数量是30
*/
fruitObj.prototype.num = 30;
/*
	初始化的时候还要给池子里面的每一个果实，要告诉它，它是什么状态。
	首先初始化的时候，给它是否活着的属性一种任务状态，即初始化为真。
*/
fruitObj.prototype.init = function(){
	for (var i = 0 ; i < this.num ; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;
		this.speed[i] = Math.random() * 0.017 + 0.003;
		this.fruitType[i] = ""; // 橘色或者蓝色果实
	}
	this.isWudi = false;
	this.orange.src="img/fruit.png" ;
	this.blue.src="img/blue.png";
	this.wudi.src="img/wudi.png";
	
}
fruitObj.prototype.draw = function(){
	for(var i = 0 ; i < this.num ; i++){
		
		if(this.alive[i]){
			if(this.fruitType[i] == "blue"){
				var pic = this.blue;
			}else if(this.fruitType[i] == "orange"){
				var pic = this.orange;
			}else{
				var pic = this.wudi;
			}
			
			if (this.l[i] <= 14) {
				//果实生长时果实长度的变化情况
					this.x[i]=ane.headx[this.aneNO[i]] ;
					this.y[i]=ane.heady[this.aneNO[i]] ;
					this.l[i] += this.speed[i] * deltaTime;
					ctx2.drawImage(pic, this.x[i] - this.l[i]*0.5, this.y[i]- this.l[i]*0.5,this.l[i],this.l[i]);
			}else{
				//果实往上漂的速度的变化情况
					this.y[i] -= this.speed[i] * deltaTime * 7;
					ctx2.drawImage(pic, this.x[i] - this.l[i]*0.5, this.y[i]- this.l[i]*0.5,this.l[i],this.l[i]);
			}			
		
		//	console.log(this.x[i]);
		if (this.y[i]<12) {
			this.alive[i] = false;
		}
		}
	}
	//console.log("ddd");
}
fruitObj.prototype.update = function(){
	var num = 0 ; 
	for (var i = 0 ; i < this.num ; i++) {
		if(this.alive[i]) num++;
	}
}
//果实的出生 born
fruitObj.prototype.born = function(i){
	this.aneNO[i] = Math.floor(Math.random()*ane.num);//Math.floor取整数值0-50
	this.l[i] = 0;
	this.alive[i] = true;
	var r = Math.random();
	
	if(r< bluefruitNum){
		this.fruitType[i] = "blue";
	}
	else if( r < wudifruitNum){
			this.fruitType[i] = "wudi";
	}
	else{
		this.fruitType[i] = "orange"
	}
}

//果实存活检测
function fruitMonitor(){
	var num=0; //存活的果实数
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num<alivefruitNum){
		//send fruit
		sendFruit();
		return;
	}
}
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;// 一次出生一个。
		}
	}
}

//设置果实被吃掉
fruitObj.prototype.eatUp = function(i){
	this.alive[i] = false;
	//console.log("555");
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var hinderObj = function(){
	this.x = [];
	this.y = [];
	this.speed = [];
	this.alive = [];
	this.pic = [];
	this.picNo = [];
	
	//选择模式的参数
	this.speednumber = 1;
	this.hinderNum=0;
}
hinderObj.prototype.num = 20 ; 
hinderObj.prototype.init = function(){
	for (var i = 0 ; i < this.num ; i++ ) {
		this.x[i] = Math.floor(canvasWidth * Math.random());
		this.y[i] = 0;
		this.speed[i] = Math.random() * 0.017 + 0.003;
		this.alive[i] = false;
		this.picNo[i] = Math.floor(Math.random() * 6);
	}

	for (var n = 0 ;n < 6 ; n++) {
			this.pic[n]= new Image();
			this.pic[n].src  = "img/b"+ n +".png";
	}
}
hinderObj.prototype.draw = function(){
	for (var i = 0 ; i < this.num ; i++) {
		if (this.alive[i]) {
		var x = canvasWidth - 64;
	//	console.log(x);
		if(this.x[i] > x) this.x[i] = x;
			this.y[i] += this.speed[i] * deltaTime * this.speednumber;
			ctx2.drawImage(this.pic[this.picNo[i]],this.x[i],this.y[i]);
			//console.log(i +":"+this.picNo[i]);
			if(this.y[i] > canvasHeight){
				this.alive[i] = false;
			}
	}
		
	}
	
}
hinderObj.prototype.eatUp = function(i){
	this.alive[i] = false;
}
//障碍物数量检测，不达到设置数量则画出达到数量的障碍物
function hinderMonitor(){

	var num = 0 ;
	for (var i = 0 ; i < hinder.num ; i++) {
		if (hinder.alive[i]) {
			num++;
		}
	}
	//console.log(num);
	if (num < hinder.hinderNum) {
			sendhinder();
		}
		return;
}

function sendhinder(){
	for(var i= 0 ; i < hinder.num ; i++){
			if (!hinder.alive[i]) {
				hinder.bron(i);
			//	console.log(hinder.alive[i] );
				return;
			}
		}
}

hinderObj.prototype.bron = function(i){
	this.alive[i] = true ; 
	this.x[i] = Math.floor(canvasWidth * Math.random());
	this.y[i] = 0;
	this.picNo[i] = Math.floor(Math.random() * 6);
}
