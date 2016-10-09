//以下是动画的算法
var animateEffect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}


function animate(ele, obj, effect, duraction, callBack){
	var fnEffect = animateEffect.Expo.easeOut;
	animate.animated = "true"; //判断元素是否
	if(typeof effect == "number"){
		switch (effect){
			case 0 : 
				break;
			case 1:
				fnEffect=animateEffect.zfLinear;
				break;
			case 2:
				fnEffect=animateEffect.Back.easeOut;
				break;
			case 3:
				fnEffect=animateEffect.Elastic.easeOut;
				break;
			case 4:
				fnEffect=animateEffect.zfBounce.easeOut;
			case 5:
				fnEffect=animateEffect.Back.easeIn;
			break;
			case 6:
				fnEffect=animateEffect.Elastic.easeIn;
			break;
		}
	}
	if(typeof effect == "function"){
		callBack = effect;
	}

	var times = 0;
	var interval = 15;
	var oBegin = {};
	var oChange = {};
	var oTarget = {};
	var flag = 0;
	for(var str in obj){
		var begin = animate.getCss(ele, str);
		var target = obj[str];
		if( target != begin ){
			oBegin[str] = begin;
			oChange[str] = target-begin;
			flag++;
		}
	}
	if(flag == 0)
		return;
	
	window.clearInterval(ele.timer);
	function step(){
		times += interval;
		if(times < duraction){
			for(var str in oChange){
				var begin = oBegin[str];
				var change = oChange[str];
				var val = fnEffect(times, begin, change, duraction);
				animate.setCss(ele, str, val);
			}
		}
		else{
			for(var str in oChange){
				animate.setCss(ele, str, obj[str]);
			}
			if(typeof callBack == "function"){
				callBack.call(ele);
			}
			animate.animated = "false";
			window.clearInterval(ele.timer);
		}
	}
	ele.timer = window.setInterval(step, interval);
}

animate.animated = "false";

animate.getCss = function(ele, str){
	if(window.getComputedStyle){
		// console.log(ele);
		return parseFloat(getComputedStyle(ele)[str]);
	}
	else{
		if(str = "opacity"){
			var value = ele.currentStyle["filter"];
			var reg = /alpha\(opacity *= *(\d+(\.d+)?)\)/;
			if(reg.test(value)){
				return RegExp.$1/100;
			}
			else{
				return 1;
			}
		}
		return parseFloat(ele.currentStyle[str]);
	}
}

animate.setCss = function(ele, str, value){
	if( str == "opacity"){
		ele.style[str] = value;
		ele.style.filter = "alpha(opacity = " + value*100 + ")";
	}
	else{
		ele.style[str] = value + "px";
	}
}


function Drag(ele) {
    this.ele = ele;
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;

    this.DOWN = Event.processThis(this.down, this); //将down里面的this强制转换为实例
    this.MOVE = Event.processThis(this.move, this);
    this.UP = Event.processThis(this.up, this);
    Event.on(this.ele, "mousedown", this.DOWN);

   // Event.on(this.ele, "mousedown", down); //down里面的this是指向ele，所以应该先将down里面的this先赋值为实例后再进行绑定
}


Drag.prototype = new selfEventEmitter();

Drag.prototype.down = function(e) {
    this.x = this.ele.offsetLeft;
    this.y = this.ele.offsetTop;
    this.mx = e.pageX;
    this.my = e.pageY;

    if (this.ele.setCapture) {
        this.ele.setCapture();
        Event.on(this.ele, "mousemove", this.MOVE);
        Event.on(this.ele, "mouseup", this.UP);
    } else {
        Event.on(document, "mousemove", this.MOVE);
        Event.on(document, "mouseup", this.UP);
    }
    e.preventDefault();
}

Drag.prototype.move = function(e) {
    this.ele.style.left = this.x + (e.pageX - this.mx) + "px";
    this.ele.style.top = this.y + (e.pageY - this.my) + "px";
}

Drag.prototype.up = function(e) {
    if (this.ele.releaseCapture) {
        this.ele.releaseCapture();
        Event.off(this.ele, "mousemove", this.MOVE);
        Event.off(this.ele, "mouseup", this.UP);
    } else {
        Event.off(document, "mousemove", this.MOVE);
        Event.off(document, "mouseup", this.UP);
    }
}

var zIndex = 1;

function increaseIndex() {
    this.ele.style.zIndex = ++zIndex;
}

function clearEffect() {
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);
}

function getSpeed(speed) {
    this.flySpeed = speed;
}

function fly() {
    this.flySpeed *= .98;
    var l = 0;
    var r = (document.documentElement.clientWidth || document.body.clientWidth) - this.ele.offsetWidth;

    var current = this.ele.offsetLeft + this.flySpeed;
    if (current <= l) {
        this.ele.style.left = 0;
        this.flySpeed *= -1;
    } else if (current >= r) {
        this.ele.style.left = r + "px";
        this.flySpeed *= -1;
    } else {
        this.ele.style.left = current + "px";
    }
    if (Math.abs(this.flySpeed) > 0.5) { //速度很小时，几乎不产生位移，所以停止运行
        this.flyTimer = window.setTimeout(Event.processThis(fly, this), 20);
    }
}

function drop() {
    if (this.dropSpeed) {
        this.dropSpeed += 9.8;
    } else {
        this.dropSpeed = 9.8;
    }
    this.dropSpeed *= 0.98;
    var b = (document.documentElement.clientHeight || document.body.clientHeight) - this.ele.offsetHeight; //下边界
    var current = this.ele.offsetTop + this.dropSpeed;
    if (current >= b) {
        this.ele.style.top = b + "px";
        this.dropSpeed *= -1;
        this.flag++;
    } else {
        this.ele.style.top = current + "px";
        this.flag = 0;
    }
    if (this.flag < 2) {
        this.dropTimer = window.setTimeout(Event.processThis(drop, this), 20);
    }
}