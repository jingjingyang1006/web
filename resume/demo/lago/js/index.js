window.onload = function () {
    var pop = document.getElementById("popup");
    var toTop = document.getElementById('backtop');
    var but1 = document.getElementById("butt1");
    var but2 = document.getElementById("butt2");
    var lin = document.getElementById("linkbox");
    var btn = document.getElementById("search");
    var cont = document.getElementById("cont");
    var cons = utils.getChildren(cont);
    var job = document.getElementById("job");
    var list = job.getElementsByTagName('li');
    var fbC = document.getElementById('fb_con');
    var pr = document.getElementById('product');
    var ft = document.getElementById('ft');
    var timer = -1;
    toTop.onclick = function () {
        var target = utils.win('scrollTop');
        var duration = 1000;
        var step = target / duration * 30;
        if (timer != -1) {
            clearInterval(timer);
        }

        timer = setInterval(function () {
            toTop.className = "backtop_1";
            var curTop = utils.win('scrollTop');
            if (curTop <= 0) {
                clearInterval(timer);
                toTop.className = "backtop";
                return;
            }
            curTop -= step;
            utils.win('scrollTop', curTop);
        }, 30);
    };
    window.onscroll = function () {
        if (utils.win('scrollTop') > 0) {

            toTop.style.display = "block";
        } else {
            toTop.style.display = "none";
        }
    };
    var login = document.getElementById("loginToolBar");
    window.addEventListener('scroll', fixed, false);
    function fixed() {
        if (utils.css(lin, "height") <= 31) {
            if (utils.win("scrollTop") < 2200 - (217 - 31)) {
                login.style.position = "fixed";
                login.style.bottom = 0;
            } else if (2200 - (217 - 31) <= utils.win("scrollTop")) {
                login.style.position = "fixed";
                login.style.bottom = utils.win("scrollTop") - (2200 - (217 - 31)) + "px";
            }
        } else if (utils.css(lin, "height") > 31) {
            if (utils.win("scrollTop") < 2200) {
                login.style.position = "fixed";
                login.style.bottom = 0;
            } else if (2200 - (217 - 31) <= utils.win("scrollTop")) {
                login.style.position = "fixed";
                login.style.bottom = utils.win("scrollTop") - 2200 + "px";
            }
        }
    }

    var Tz = document.getElementById('Tz');
    Tz.onclick = function () {
        window.location.href = "/D/毕业作业/新建文件夹/denglu.html";
    }
    var l = utils.css(lin, "height");
    but1.onclick = function () {
        if (utils.css(lin, "height") > 31) {
            utils.css(lin, {height: 31});
            but1.style.display = "none";
            but2.style.display = "block";
        }
        fixed();
    };
    but2.onclick = function () {
        if (utils.css(lin, "height") <= 31) {
            utils.css(lin, {height: l});
            but1.style.display = "block";
            but2.style.display = "none";
            utils.win("scrollTop", 2264);
        }
        fixed();
    };
    btn.onfocus = function () {
        btn.placeholder = "搜索职位、公司或地点";
    };
    btn.onblur = function () {
        btn.placeholder = "市场推广";
    };
    for (var i = 0; i < list.length; i++) {
        list[i].index = i;
        list[i].onclick = function () {
            for (var i = 0; i < list.length; i++) {
                list[i].className = "";
                cons[i].className = "hidden";
            }
            this.className = "current";
            cons[this.index].className = "show";
        };
    }
    document.onclick = function (e) {
        e = e || window.event;
        var str = e.target || e.srcElement;
        if (str.className == "fb-icon") {
            fbC.style.display = "block";
        }
        if (str.className == "ft") {
            fbC.style.display = "none";
        }
    };
    pop.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.id === "popup" || tar.id === "non") {
            pop.style.display = "none";
        }
    };
    function blok() {
        pop.style.display = "block";
    }

    var banner = function () {
        var ban = document.getElementById("banner");
        var oUl = ban.getElementsByTagName("ul")[0];
        var con = ban.getElementsByTagName("div")[0];
        var lis = oUl.getElementsByTagName("li");
        var oLi = con.getElementsByTagName("li");
        var em = con.getElementsByTagName("em")[0];
        var oi = con.getElementsByTagName("i");
        var step = 0;
        oUl.innerHTML += '<li class="banner_bg_1"><img src="img/banner.JPG" alt=""></li>';
        oUl.style.height = lis.length * lis[0].offsetHeight + 'px';
        clearInterval(autoTimer);
        var autoTimer = setInterval(autoMove, 3000);

        function autoMove() {
            if (step >= lis.length - 1) {
                step = 0;
                utils.css(oUl, 'top', -step * 160);
            }
            step++;
            zhufengAnimate(oUl, {top: -step * 160}, 500);
            bannerTip();
        }

        oUl.onmousemove = function () {
            clearInterval(autoTimer);
        };
        oUl.onmouseout = function () {
            autoTimer = setInterval(autoMove, 3000);
        };
        function bannerTip() {
            var tmpStep = step >= oLi.length ? 0 : step;
            for (var i = 0; i < oLi.length; i++) {
                oLi[i].index = i;
                em.style.top = (tmpStep % 3) * 55 + "px";
                if (tmpStep === i) {
                    oi[i].style.display = "none";
                }
                if (tmpStep !== i) {
                    oi[i].style.display = "block";
                }
            }
            ;
        };
        function handleChange() {
            for (var i = 0; i < oLi.length; i++) {
                oLi[i].index = i;
                oLi[i].onmouseover = function () {
                    step = this.index;
                    clearInterval(autoTimer);
                    zhufengAnimate(oUl, {top: -step * 160}, 500);
                    bannerTip();
                };
                em.onmouseover = function () {
                    clearInterval(autoTimer);
                };
                em.onmouseout = function () {
                    autoTimer = setInterval(autoMove, 3000);
                };
            }
        }

        autoMove();
        handleChange();
    }
    var thumbs = function () {
        var oUl = document.getElementById('da_thumbs');
        var oLi = oUl.getElementsByTagName("li");
        var body = document.getElementsByTagName('body')[0];
        for (var i = 0; i < oLi.length; i++) {
            var curI = oLi[i];
            curI.onmouseenter = curI.onmouseleave = function (e) {
                var oDiv = this.getElementsByTagName('div')[0];
                var o = utils.offset(this);
                var w = this.offsetWidth;
                var h = this.offsetHeight;
                var interval = 200;
                var x = (e.pageX - o.left - (w / 2)) * (w > h ? (h / w) : 1);
                var y = (e.pageY - o.top - (h / 2)) * (h > w ? (w / h) : 1);
                var dir = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
                var curL = 0, curT = 0, tarL = 0, tarT = 0;
                if (e.type === "mouseenter") {
                    dir === 0 ? curT = -117 : null;
                    dir === 1 ? curL = 117 : null;
                    dir === 2 ? curT = 117 : null;
                    dir === 3 ? curL = -117 : null;
                    utils.css(oDiv, {top: curT, left: curL, display: "block"});
                    zhufengAnimate(oDiv, {top: tarT, left: tarL}, interval, function () {
                        utils.css(oDiv, {top: tarT, left: tarL});
                    });
                } else if (e.type === "mouseleave") {
                    dir === 0 ? tarT = -117 : null;
                    dir === 1 ? tarL = 117 : null;
                    dir === 2 ? tarT = 117 : null;
                    dir === 3 ? tarL = -117 : null;
                    zhufengAnimate(oDiv, {top: tarT, left: tarL}, interval, 2, function () {
                        utils.css(oDiv, {top: tarT, left: tarL});
                    });
                }
            }
        }
    }
    var init = function () {
        banner();
        blok();
        fixed();
        thumbs();
    };
    init();
};