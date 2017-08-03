var controlObj = function(){
	this.blackcolor;
	this.loadcolor;
}
controlObj.prototype.init = function(){
	
	this.blackcolor = "#555";
	this.loadcolor = "#555";
}
controlObj.prototype.draw = function(){
	//回到开始界面
	ctx1.save();
	ctx1.strokeStyle = this.blackcolor;
	ctx1.lineWidth = 6;
	ctx1.beginPath();
	ctx1.moveTo(765,15);
	ctx1.lineTo(795,15);
	ctx1.stroke();
	ctx1.closePath();
	ctx1.beginPath();
	ctx1.moveTo(765,28);
	ctx1.lineTo(795,28);
	ctx1.stroke();
	ctx1.closePath();
	ctx1.beginPath();
	ctx1.moveTo(765,41);
	ctx1.lineTo(795,41);
	ctx1.stroke();
	ctx1.closePath();
	ctx1.restore();
	
	//重新当前模式游戏
	ctx1.save();
	ctx1.strokeStyle = this.loadcolor;
	ctx1.fillStyle = this.loadcolor;
	ctx1.beginPath();
	ctx1.lineWidth = 5;
	ctx1.arc(733,26,15,0.5*Math.PI,Math.PI,true);
	ctx1.stroke();
	ctx1.closePath();
	ctx1.beginPath();
	ctx1.moveTo(722,42);
	ctx1.lineTo(733,34);
	ctx1.lineTo(733,48);
	ctx1.fill();
	ctx1.closePath();
	ctx1.restore();

}
