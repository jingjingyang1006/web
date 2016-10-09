
/*section0*/
;(function(){
	/*head_portrait*/
	var oPs = utils.getElementsByClass("head_portrait_text");
	var line = utils.getElementsByClass("line")[0];
	var about = utils.getElementsByClass("about_me")[0];
	var load = document.getElementById("load");

	function fnLoad() {
		var me = utils.getElementsByClass("meImg")[0];
		var realSrc = me.getAttribute('realSrc');
		console.log(realSrc);
		me.src = realSrc + "?" + Math.random();
		me.onload = function() {
			animate(load, {"opacity": 0}, 1, 1000);
			window.setTimeout(function(){
				load.style.display = "none";
				portraitTextAni();
			},1000);
		}
	}
	fnLoad();


	function portraitTextAni() {
		var i = 0;
		function step() {
			animate(oPs[i], {"top": 0}, 1, 800);
			i++;
			if(i>=oPs.length)
				return;
			window.setTimeout(step, 1000);
		}
		step();
		animate(about, {'opacity': 1}, 1, 8000);
		window.setTimeout(function(){
			animate(line, {width: 500}, 1, 1000);
		}, 1500);
	}

	function resetportraitText() {
		for(var i=0; i<oPs.length; i++){
			oPs[i].style.top = "18px";
		}
		line.style.width = 0;
		animate.setCss(about, 'opacity', 0);
	}

	Event.on(window, "hashchange", function(){
		if(location.hash == "#firstPage"){
			portraitTextAni();
		}else {
			resetportraitText();
		}
	});

	

	/*about me*/
	var aboutDivs = about.getElementsByTagName("div");
	var closeFlag = utils.getElementsByClass("closeAbout")[0];
	var openState = 1;
	var closeState = 1;

	function openAbout(){
		openState = 0;
		var ary = utils.children(aboutDivs[3], "p");
		for(var i=0; i<ary.length; i++){
 			ary[i].style.fontSize = "";
 		}
 		animate(aboutDivs[3], {"height": 120,
 		"width": 200, "bottom": 0, "right": 0,"opacity": 1,"fontSize": 10}, 2, 500);
		
		window.setTimeout(function(){
			var ary = utils.children(aboutDivs[2], "p");
			for(var i=0; i<ary.length; i++){
	 			ary[i].style.fontSize = "";
	 		}
			animate(aboutDivs[2], {"height": 120,
	 		"width": 200, "bottom": 0, "left": 0,"opacity": 1,"fontSize": 10}, 2, 500);
			
		}, 500);
		window.setTimeout(function(){
			var ary = utils.children(aboutDivs[0], "p");
	 		for(var i=0; i<ary.length; i++){
	 			ary[i].style.fontSize = "";
	 		}
			animate(aboutDivs[0], {"height": 120,
		 	"width": 200, "top": 0, "left": 0,"opacity": 1,"fontSize": 10}, 2, 500);
		}, 1000);
		window.setTimeout(function(){
			var ary = utils.children(aboutDivs[1], "p");
			for(var i=0; i<ary.length; i++){
	 			ary[i].style.fontSize = "";
	 		}
			animate(aboutDivs[1], {"height": 120,
			"width": 200, "top": 0, "right": 0,"opacity": 1,"fontSize": 10}, 2, 500);
			window.setTimeout(function(){ openState = 1;} , 1200);
		}, 1500);
		window.setTimeout(function(){
			animate(closeFlag, {"opacity": 1}, 1, 200);
		}, 2000);
	}

	function closeAbout() {
		closeState = 0;
		window.setTimeout(function(){
			animate(closeFlag, {"opacity": 0}, 1, 200);
		}, 100);
		animate(aboutDivs[1], {"height": 0,
 		"width": 0, "top": 120, "right": 200,"opacity": 1, "fontSize": 0}, 2, 500);
 		window.setTimeout(function(){
	 		var ary = utils.children(aboutDivs[1], "p");
	 		for(var i=0; i<ary.length; i++){
	 			ary[i].style.fontSize = 0;
	 		}
	 	},100);
		
		window.setTimeout(function(){
			animate(aboutDivs[0], {"height": 0,
			"width": 0, "top": 120, "left": 200,"opacity": 1, "fontSize": 0}, 2, 500);
			window.setTimeout(function(){
	 		var ary = utils.children(aboutDivs[0], "p");
		 		for(var i=0; i<ary.length; i++){
		 			ary[i].style.fontSize = 0;
		 		}
		 	},100);
		}, 500);
			
		window.setTimeout(function(){
			animate(aboutDivs[2], {"height": 0,
		 	"width": 0, "bottom": 120, "left": 200,"opacity": 1,"fontSize": 0}, 2, 500);
		 	window.setTimeout(function(){
		 		var ary = utils.children(aboutDivs[2], "p");
		 		for(var i=0; i<ary.length; i++){
		 			ary[i].style.fontSize = 0;
		 		}
		 	},100);
		}, 1000);
			
		window.setTimeout(function(){
			animate(aboutDivs[3], {"height": 0,
			"width": 0, "bottom": 120, "right": 200,"opacity": 1, "fontSize": 0}, 2, 500);
			window.setTimeout(function(){
		 		var ary = utils.children(aboutDivs[3], "p");
		 		for(var i=0; i<ary.length; i++){
		 			ary[i].style.fontSize = 0;
		 		}
		 	},100);
		 	window.setTimeout(function(){ 
		 		closeState = 1;
		 	}, 1200);
		}, 1500)	
	}

    var obj = new Drag(about);

	Event.on(about, "click", function(e){
		if(e.target.id == "about_img") {
			if(openState == 1 && closeState ==1){
				animate(about, {"top": 50, "left": 100}, 2, 1000);
				window.setTimeout(openAbout, 1200);
			}
		}
		if(e.target.className == "pa closeAbout"){
			if(closeState == 1){
				closeAbout();
				window.setTimeout(function(){
					animate(about, {"top": -50, "left": 830}, 2, 1000);
				}, 1700);
			}
		}
	});

})();

/*section1*/
;(function(){
	var partOdivs = utils.getElementsByClass('part');
	
	var processState = true; 
	var stateTimer = null;
	var stateCount = 0;
	utils.removeClass(partOdivs[1], 'section1_two');
	utils.removeClass(partOdivs[2], 'section1_three');

	Event.on(window, "hashchange", function(){
		if(location.hash == "#secondPage"){
			window.clearTimeout(stateTimer);
			stateCount = 0;
			if(processState === true){
				processState = false;
				utils.addClass(partOdivs[1], 'section1_two');
				utils.addClass(partOdivs[2], 'section1_three');
			}
		}else {
			processState = true;
				if(stateCount == 0) {
					window.clearTimeout(stateTimer);
					stateTimer =  window.setTimeout(function() {
						utils.removeClass(partOdivs[1], 'section1_two');
						utils.removeClass(partOdivs[2], 'section1_three');
					}, 500);
				}
				stateCount++;
				if(stateCount == 0xffffff){
					stateCount = 0;
			}
		}
	});
})();

/*section2*/
;(function(){
	var procseeDivs = utils.getElementsByClass("process_inner");
	var percentOspans = document.getElementById('skills').getElementsByTagName('span');
	var processState = true;
	Event.on(window, "hashchange", function(){
		console.log(location.hash);
		if(location.hash == "#3rdPage"){
			if(processState === true){
				processState = false;
				utils.addClass(procseeDivs[0], "increase_width_one")
				utils.addClass(procseeDivs[1], "increase_width_two")
				utils.addClass(procseeDivs[2], "increase_width_three")
				utils.addClass(procseeDivs[3], "increase_width_four")
				utils.addClass(procseeDivs[4], "increase_width_five")
				utils.addClass(procseeDivs[5], "increase_width_six")
				increaseNum(percentOspans[0], 95, 3000);
				increaseNum(percentOspans[1], 85, 3000);
				increaseNum(percentOspans[2], 80, 3000);
				increaseNum(percentOspans[3], 60, 3000);
				increaseNum(percentOspans[4], 50, 3000);
				increaseNum(percentOspans[5], 50, 3000);
			}
		}else{
			processState = true;
			utils.removeClass(procseeDivs[0], "increase_width_one")
			utils.removeClass(procseeDivs[1], "increase_width_two")
			utils.removeClass(procseeDivs[2], "increase_width_three")
			utils.removeClass(procseeDivs[3], "increase_width_four")
			utils.removeClass(procseeDivs[4], "increase_width_five")
			utils.removeClass(procseeDivs[5], "increase_width_six")
		}
	});

	function increaseNum(ele, target, duraction){
		var interval = duraction/target;
		var times = 0;
		interval = 15;
		function step() {
			times += interval;
			if(times < duraction) {
				num = times/duraction * target;
				ele.innerHTML = Math.ceil(num) + '%';
			}else {
				ele.innerHTML = target + '%'
				return;
			}
			window.setTimeout(step, interval);
		}
		step();
	}
})();

/*section4*/
;(function(){
	var demo = utils.getElementsByClass('demo');
	var section4_left = utils.getElementsByClass('section4_left')[0];
	var section4_right = utils.getElementsByClass('section4_right')[0];
	Event.on(window, "hashchange", function(){
		if(location.hash == "#4rdPage"){
			for(var i=0; i<demo.length; i++){
				utils.addClass(demo[i], 'demo-action');
			}
		}else {
			for(var i=0; i<demo.length; i++){
				utils.removeClass(demo[i], 'demo-action');
			}
		}

		if(location.hash == "#5rdPage"){
			utils.addClass(section4_left, 'section4_left_action');
			utils.addClass(section4_right, 'section4_right_action');
		}else {
			utils.removeClass(section4_left, 'section4_left_action');
			utils.removeClass(section4_right, 'section4_right_action');
		}
	});
})();