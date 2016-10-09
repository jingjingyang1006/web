var Event = {};

Event.on = function(ele, type, fn){
	if(ele.addEventListener){
		ele.addEventListener(type, fn, false);
		return;
	}

	if(!ele["aEvent"+type]){
		ele["aEvent"+type] = [];
		ele.attachEvent("on"+type, function(){   //只绑定一次
			run.call(ele);          
		})
	}
	
	var ary = ele["aEvent"+type];
	for(var i=0; i<ary.length; i++){
		if(ary[i] == fn)
			return;
	}
	ary.push(fn);
	
}

function run(){
	var e = window.event;
	var type = e.type;
	if(!e.target){
		e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
		e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY
		e.stopPropagation = function(){
			e.cancelBubble = true;
		}
		e.preventDefault = function(){
			e.returnValue=false;
		}
		e.target = e.srcElement;
	}
	var ary = this["aEvent" + type];
	if(ary && ary.length){
		for(var i=0; i<ary.length; i++){
			if(typeof ary[i] == "function"){
				ary[i].call(this, e);  //this是ele
			}else{
				ary.splice(i, 1);
				i--;
			}
		}
	}
}

Event.off =	function(ele, type, fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type, fn, false);
		return;
	}
	var ary = ele["aEvent" + type];
	if(ary && ary.length){
		for(var i=0; i<ary.length; i++){
			if(ary[i] == fn){
				ary[i] = null;
				return;
			}
		}
	}
}

Event.processThis = function(fn, obj) {
	return function(e) {
		fn.call(obj, e);
	}
}