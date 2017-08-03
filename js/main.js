var can1;
var can2;

var canvasWidth;
var canvasHeight;

var ctx1;
var ctx2;

var lastTime;//上一帧的执行时间
var deltaTime;//两帧间隔时间差

var backgroundPic = new Image();

var ane;
var fruit;
var hinder;

var bigFish;
var smallFish;

var data;

var fontsize1 = "25px";
var fontsize2 = "25px";
var fontsize3 = "25px";
//var smallTail = [];
//定义鼠标位置的变量
var mx;
var my;

var alivefruitNum;
var bluefruitNum;
var wudifruitNum;

var isStart ;//isStart 游戏是否开始

var modefont; // 点击规定区域后，游戏开始后显示出当前选择了 “xx模式”

var a ; //透明度

var control;
//effect.js中两个对象
var circle;
var dust;

var audiobf = document.getElementById("audiobf");
var audiobs = document.getElementById("audiobs");
var audiobh = document.getElementById("audiobh");
var audiolp = document.getElementById("audiolp");
				
var WudiTime;

document.body.onload = game; /*body加载完后,将game作为所有js脚本的入口*/

function game(){
	init();
	lastTime = Date.now();
	deltaTime=0;
	GameSwitch();
//	gameloop()
}
//初始化
	function init(){
		//获取canvas,context
		can1=document.getElementById("canvas1");//鱼，dust,ui,圈圈特效
		ctx1 = can1.getContext("2d");
		can2=document.getElementById("canvas2");//背景，海葵，果实
		ctx2= can2.getContext("2d");
		
		canvasWidth = can1.width;
		canvasHeight = can1.height;	
		//console.log("w="+canvasWidth);
		
		isStart = false;//游戏是否开始
		a = 1;
		//鼠标监听
		can1.addEventListener("mousemove",onMouseMove,false);
		can1.addEventListener("click",onClick,false);
		

		//初始化鼠标的坐标：
		mx = canvasWidth * 0.5;
		my = canvasHeight * 0.5;
		
		backgroundPic.src="img/background.jpg";//加载背景图片
		
		ane = new aneObj();
		ane.init();
		
		fruit = new fruitObj();
		fruit.init();
		
		hinder = new hinderObj();
		hinder.init();
		
		bigFish = new bigFishObj();
		bigFish.init();
		
		smallFish = new smallFishObj();
		smallFish.init();
		
		data = new dataObj();
		data.init();
		
		control = new controlObj();
		control.init();
		
		circle = new circleObj();
		circle.init();
		
		dust = new dustObj();
		dust.init();
		
		audiobf.ontimeupdate=function(){
			if(audiobf.currentTime>=1){
						audiobf.pause();
					}
			}
			audiobs.ontimeupdate=function(){
			if(audiobs.currentTime>=1){
						audiobs.pause();
					}
			}
			audiobh.ontimeupdate=function(){
			if(audiobh.currentTime>=1){
						audiobh.pause();
					}
			}
			audiolp.ontimeupdate=function(){
			if(audiolp.currentTime>=2){
						audiolp.pause();
					}
			}
	}
	function  GameSwitch(){
		window.requestAnimationFrame(GameSwitch);
		
		if(!isStart){//isStart 游戏是否开始
		ctx1.save();
		ctx1.fillStyle = "cadetblue";
		ctx1.fillRect(0,0,canvasWidth,canvasHeight);
		ctx1.fillStyle = '#fff';
		ctx1.textAlign = "center";
		
		ctx1.save();
		ctx1.font = fontsize1+" 微软雅黑";
		ctx1.fillText("简单模式",canvasWidth*0.5,210);
		ctx1.beginPath();
		ctx1.strokeStyle = "#fff";
		ctx1.strokeRect(canvasWidth*0.375,180,200,40);
		ctx1.closePath();
		ctx1.restore();
		
		ctx1.save();
		ctx1.font = fontsize2+" 微软雅黑";
		ctx1.fillText("普通模式",canvasWidth*0.5,280);
		ctx1.beginPath();
		ctx1.strokeStyle = "#fff";
		ctx1.strokeRect(canvasWidth*0.375,250,200,40);
		ctx1.closePath();
		ctx1.restore();
		
		ctx1.save();
		ctx1.font = fontsize3+" 微软雅黑";
		ctx1.fillText("困难模式",canvasWidth*0.5,350);
		ctx1.beginPath();
		ctx1.strokeStyle = "#fff";
		ctx1.strokeRect(canvasWidth*0.375,320,200,40);
		ctx1.closePath();
		ctx1.restore();
		
		ctx1.restore();
		
		
		//简单模式
		if (mx >=canvasWidth*0.375 && mx<= canvasWidth*0.375 + 200 && my >= 180 && my <= 220 ) {
			ctx1.save();
			fontsize1 = "30px";
			can1.style.cursor = "pointer";
			ctx1.restore();
//			alivefruitNum = 30;
//			bluefruitNum = 0.5;
//			onClick();
//				console.log("1"+alivefruitNum);
		}
		//普通模式
		else if (mx >=canvasWidth*0.375 && mx<= canvasWidth*0.375 + 200 && my >= 250 && my <= 290 ) {
			ctx1.save();
			fontsize2 = "30px";
			can1.style.cursor = "pointer";
			ctx1.restore();
//			alivefruitNum = 18;
//			bluefruitNum = 0.35;
//			onClick();
//				console.log("2:"+alivefruitNum);
		}
		//困难模式
		else if (mx >=canvasWidth*0.375 && mx<= canvasWidth*0.375 + 200 && my >= 320 && my <= 360 ) {
			ctx1.save();
			fontsize3 = "30px";
			can1.style.cursor = "pointer";
			ctx1.restore();
//			alivefruitNum = 12;
//			bluefruitNum = 0.2;
//			onClick();
//				console.log("3:"+alivefruitNum);
		}else{		
			fontsize1 = "25px";
			fontsize2 = "25px";
			fontsize3 = "25px";
			can1.style.cursor = "default";
		}
		
		
		}else{ //isStart = true
			//console.log('m2x:'+m2x);
			if (m2x >= 703 && m2x <= 755 && m2y >= 5 && m2y <= 46) {
				control.loadcolor = "#fff";
				can1.style.cursor = "pointer";
				//console.log(can1.style.cursor);
			}
			else if (m2x >= 765 && m2x <= 795 && m2y >=13 && m2y <= 38) {
				control.blackcolor = "#fff"
				can1.style.cursor = "pointer";
				//console.log(can1.style.cursor);
			}
			else{
				control.loadcolor = "#555";
				control.blackcolor = "#555"
				can1.style.cursor = "default";
			//	console.log(can1.style.cursor);
			}
		}
	}
	//主循环
	function gameloop(){  	
		window.requestAnimationFrame(gameloop);
		isStart=true;
		
		var now = Date.now();
		deltaTime = now - lastTime;
		if(deltaTime > 45) deltaTime = 45;
		lastTime = now;
		
		
		drawBackground();//function background.js
		ane.draw();
		
		fruitMonitor();//果实存活检测
		fruit.draw();
		
		if (modefont == "普通模式") {
				hinderMonitor();
				hinder.speednumber = 5;
				hinder.hinderNum = 10;
				hinder.draw();
		}
		else if(modefont == "困难模式"){
				hinderMonitor();
				hinder.speednumber = 8;
				hinder.hinderNum = 20;
				hinder.draw();
		}
	
		
		//由于canvas1覆盖在canvas2上，所以我们每一次绘制的时候，都需要把前面一帧的内容clear一下。把它清空掉，然后再绘制新的
		ctx1.clearRect(0, 0, canvasWidth, canvasHeight);
		
		
		//在游戏开始时显示出当前选择模式，淡出，a为透明度
		a = a - deltaTime*0.0005;
		if (a <= 0) {
			a = 0;
		}
		ctx1.save();
		ctx1.font = "30px 微软雅黑";
		ctx1.fillStyle = "rgba(255,255,255,"+a+")";
		ctx1.textAlign = "center";
		ctx1.fillText(modefont , canvasWidth*0.5,canvasHeight*0.3);
		ctx1.restore();
		//console.log(modefont);
		//大鱼与小鱼绘制
		bigFish.draw();
		smallFish.draw();
		//碰撞时发生的特效 及 漂浮物 绘制
		circle.draw();
		dust.draw();
		//重新开始 及 回到开始界面 组件绘制
		control.draw();
		if (!data.gameover) {
			BigFruitCollision();	
			BigSmallCollision();
			FishHinderCollision()
		}
		
		//gameover文字绘制
		data.draw();
		
		
		


	}

	//鼠标控制
function onMouseMove(e){
	if(data.gameover == false){
		if(e.offsetX || e.layerX){
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
//			console.log(mx);
	}		
	}
	
	if (isStart) {
		if(e.offsetX || e.layerX){
			m2x = e.offSetX == undefined ? e.layerX : e.offSetX;
			m2y = e.offSetY == undefined ? e.layerY : e.offSetY;
//			console.log(mx);
	}	
	}
		
	}

function onClick(){

	//console.log(alivefruitNum);
		if(!isStart){
			//简单模式
			if (mx >=canvasWidth*0.375 && mx<= canvasWidth*0.375 + 200 && my >= 180 && my <= 220 ) {	
			alivefruitNum = 30;
			bluefruitNum = 0.5;
			modefont = "简单模式";
			gameloop();
			//	console.log("1:"+alivefruitNum);
		}
		//普通模式
		 if (mx >=canvasWidth*0.375 && mx<= canvasWidth*0.375 + 200 && my >= 250 && my <= 290 ) {
		
			alivefruitNum = 18;
			bluefruitNum = 0.35;
			wudifruitNum = 0.4;
			modefont = "普通模式";
			gameloop();
			//	console.log("2:"+alivefruitNum);
		}
		//困难模式
		if (mx >=canvasWidth*0.375 && mx<= canvasWidth*0.375 + 200 && my >= 320 && my <= 360 ) {
		
			alivefruitNum = 12;
			bluefruitNum = 0.2;
			wudifruitNum = 0.25;
			modefont = "困难模式";
			//	console.log("3:"+alivefruitNum);		
				gameloop();
		}
		}else{//isStart = true
			if (m2x >= 703 && m2x <= 755 && m2y >= 5 && m2y <= 46) {
				lastTime = Date.now();
				deltaTime=0;
				ane.init();
				fruit.init();
				bigFish.init();
				smallFish.init();
				data.init();
				a = 1 ;  // 将透明的初始化为完全不透明，gameover后再次点击屏幕才会出现“xx模式”的字体。不然a = 0 ；
				gameloop();
			}
			else if (m2x >= 765 && m2x <= 795 && m2y >=13 && m2y <= 38) {
				//重新载入
				  window.location.reload();
			}
		}
	
			
		
	if (data.gameover) {
	
		deltaTime=0;
		ane.init();
		fruit.init();
		bigFish.init();
		smallFish.init();
		data.init();
		a = 1 ;  // 将透明的初始化为完全不透明，gameover后再次点击屏幕才会出现“xx模式”的字体。不然a = 0 ；
		gameloop();

	}
		
}
