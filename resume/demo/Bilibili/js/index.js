
/*左边banner轮播*/
(function(){
    var box1=document.getElementById('box1'),
        bannerBox1=document.getElementById('bannerbox1'),
        tipBox1=document.getElementById('tipbox1'),
        bannerInner=bannerBox1.getElementsByTagName('ul')[0],
        tipTitle=tipBox1.getElementsByTagName("div")[0],
        titleSps=tipTitle.getElementsByTagName("span"),
        tipUl=tipBox1.getElementsByTagName('ul')[0],aLi=tipUl.getElementsByTagName('li'),
        aLis=bannerInner.getElementsByTagName('li'),
        step= 0,
        autoTimer=null,
        interval=3000;

    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if(step>=aLis.length-1){
            step=0;
            utils.css(bannerInner,'left',-step*440)
        }
        step++;
        zhufengAnimate(bannerInner,{left:-step*440},200);
        bannerTip();
    }

    function bannerTip(){
        var  tmp=step>=aLi.length?0:step;
        for(var i=0; i<aLi.length; i++){
            i===tmp?utils.addClass(aLi[i],'on'):utils.removeClass(aLi[i],'on');
        }
        tmp=step>=titleSps.length?0:step;
        for(var j=0; j<titleSps.length; j++){
            j===tmp?titleSps[j].style.display="inline-block":titleSps[j].style.display="none";
        }
    }


    box1.onmouseover=function(){
        clearInterval(autoTimer);
    };
    box1.onmouseout=function(){
        autoTimer=setInterval(autoMove,interval)
    };


    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index;
                zhufengAnimate(bannerInner,{left:-step*440},200);
                bannerTip();
            }
        }
    }
})();

/*右边banner半轮播半选项*/
(function(){
    var box2=document.getElementById('box2'),
        aUl=box2.getElementsByTagName('ul'),
        btnL=document.getElementById('btnL'),
        btnR=document.getElementById('btnR'),
        step= 0;

    function show(){
        if(step===0){
            utils.css(aUl[0],'zIndex',1);
            zhufengAnimate(aUl[0],{opacity:1},500,function(){
                var siblings=utils.siblings(this);
                for(var k=0; k<siblings.length; k++){
                    utils.css(siblings[k],'opacity',0);
                }
            })
        }else{
            utils.css(aUl[0],'zIndex',0)
        }
    }
    show();

    function move(){
        if(step>=aUl.length-1){
            step=-1;
        }
        step++;
        setBanner();
    }

    function setBanner(){
        for(var i=0; i<aUl.length; i++){
            var curEle=aUl[i];
            if(i===step){
                utils.css(curEle,'zIndex',1);
                zhufengAnimate(curEle,{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var k=0; k<siblings.length; k++){
                        utils.css(siblings[k],'opacity',0);
                    }
                })
            }else{
                utils.css(curEle,'zIndex',0)
            }

        }
    }

    btnL.onclick=move;
    btnR.onclick=function(){
        if(step<=0){
            step=aUl.length;
        }
        step--;
        setBanner();
    }
})();

/*中间的轮播*/
(function(){
    var box3=document.getElementById('box3'),
        box3List=document.getElementById('box3List'),
        box3Bottom=document.getElementById('box3Bottom'),
        bannerInner=box3List.getElementsByTagName('ul')[0],
        aLis=box3List.getElementsByTagName('li'),
        aLi=box3Bottom.getElementsByTagName('li'),
        aDivInfo=box3Bottom.getElementsByTagName('div')[0],
        aDiv=aDivInfo.getElementsByTagName('div'),
        step= 0,
        autoTimer=null,
        interval=3000;

    clearInterval(autoTimer);
    autoTimer=setInterval(autoMove,interval);
    function autoMove(){
        if(step>=aLis.length-1){
            step=0;
            utils.css(bannerInner,'margin-left',-step*260)
        }
        step++;
        zhufengAnimate(bannerInner,{marginLeft:-step*260},100);
        bannerTip()
    }

    function bannerTip(){
        var  tmp=step>=aLi.length?0:step;
        for(var i=0; i<aLi.length; i++){
            i===tmp?utils.addClass(aLi[i],'on'):utils.removeClass(aLi[i],'on');
        }
        tmp=step>=aDiv.length?0:step;
        for(var j=0; j<aDiv.length; j++){
            j===tmp?aDiv[j].style.display="block":aDiv[j].style.display="none";
        }
    }

    box3.onmouseover=function(){
        clearInterval(autoTimer);
    };
    box3.onmouseout=function(){
        autoTimer=setInterval(autoMove,interval)
    };

    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index;
                zhufengAnimate(bannerInner,{marginLeft:-step*260},100);
                bannerTip();
            }
        }
    }

})();

var theTabs=(function(){
    function tab(a){
        var box=document.getElementById(a),
            oUl=box.getElementsByClassName('bodyL-tab')[0],
            aLi=oUl.getElementsByTagName('li'),
            oDiv=box.getElementsByClassName("bodyL-body")[0],
            aUl=oDiv.getElementsByTagName('ul');
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                for(var i=0; i<aLi.length; i++){
                    aLi[i].className='';
                    /*aUl[i].className='bodyLbox v-List';*/
                    utils.removeClass(aUl[i],'show');
                }

                aLi[this.index].className='on';
                /*aUl[this.index].className='bodyLbox v-List show';*/
                utils.addClass(aUl[this.index],'show');
            }
        }
    }

    function ImgLoad(oDiv){
        var box=document.getElementById(oDiv);
        var aImg=box.getElementsByTagName('img');
        window.onscroll=function(){
            var scrollBottom=utils.win('scrollTop')+utils.win('clientHeight');
            for(var i=0; i<aImg.length; i++){
                var imgPosition=utils.offset(aImg[i]).top+utils.getCss(aImg[i],'height');
                if(imgPosition<=scrollBottom){
                    lazyImg(aImg[i]);
                }
            }
        }
        function lazyImg(img){
            if(img.loaded){
                return;
            }
            var tmpImg=new Image;
            tmpImg.src=img.getAttribute('realImg');
            tmpImg.onload=function(){
                img.src=this.src;
                tmpImg=null;
                img.loaded=true;
            };
            tmpImg.onerror=function(){
                tmpImg=null;
                img.loaded=true;
            }
        }
    }

    return {
        tab:tab,
        ImgLoad:ImgLoad,

    }

})();

theTabs.tab('animate');
theTabs.tab('movie');
theTabs.tab('music');
theTabs.tab('comic');
theTabs.tab('dance');

theTabs.ImgLoad('mainLazyImg');

var mainTab=(function(){
    function tab(){
        var box=document.getElementById("animate"),
            boxInn=box.getElementsByClassName("mainContent-list")[0],
            oUl=boxInn.getElementsByClassName("list-tab-box")[0],
            aLi=oUl.getElementsByTagName('li'),
            oDiv=boxInn.getElementsByClassName("mainListL-body-content")[0],
            aUl=oDiv.getElementsByTagName('ul');

        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                for(var i=0; i<aLi.length; i++){
                    aLi[i].className='';
                    /*aUl[i].className='bodyLbox v-List';*/
                    utils.removeClass(aUl[i],'show');
                }

                aLi[this.index].className='on';
                /*aUl[this.index].className='bodyLbox v-List show';*/
                utils.addClass(aUl[this.index],'show');
            }
        }

    }


    return {tab:tab}
})();

mainTab.tab();

/*(function(){
    var box=document.getElementById('numShow');
    var oUl=box.getElementsByClassName('menu-nav')[0];

    var aLi=utils.getChildren(oUl);
    var aUl=oUl.getElementsByTagName('ul');
    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aLi[i+1].onmouseenter=function(){
            aUl[i].style.display='block';
            /!*utils.css(aUl[i],display,'block');*!/
        };
        aLi[i+1].onmouseleave=function(){
            aUl[i].style.display='none';
            /!*utils.css(aUl[i],display,'none');*!/
        };
    }

})();*/

(function(){
    var box=document.getElementById('numShow');
    var oUl=box.getElementsByClassName('menu-nav')[0];
    var aLi=utils.getChildren(oUl);
    var aUl=oUl.getElementsByTagName('ul');
    var square=document.getElementById('square');

    aLi[1].onmouseenter=function(){
        aUl[0].style.display='block';
    };
    aLi[1].onmouseleave=function(){
        aUl[0].style.display='none';
    };
    aLi[2].onmouseenter=function(){
        aUl[1].style.display='block';
    };
    aLi[2].onmouseleave=function(){
        aUl[1].style.display='none';
    };
    aLi[3].onmouseenter=function(){
        aUl[2].style.display='block';
    };
    aLi[3].onmouseleave=function(){
        aUl[2].style.display='none';
    };
    aLi[4].onmouseenter=function(){
        aUl[3].style.display='block';
    };
    aLi[4].onmouseleave=function(){
        aUl[3].style.display='none';
    };
    aLi[5].onmouseenter=function(){
        aUl[4].style.display='block';
    };
    aLi[5].onmouseleave=function(){
        aUl[4].style.display='none';
    };
    aLi[6].onmouseenter=function(){
        aUl[5].style.display='block';
    };
    aLi[6].onmouseleave=function(){
        aUl[5].style.display='none';
    };
    aLi[7].onmouseenter=function(){
        aUl[6].style.display='block';
    };
    aLi[7].onmouseleave=function(){
        aUl[6].style.display='none';
    };
    aLi[8].onmouseenter=function(){
        aUl[7].style.display='block';
    };
    aLi[8].onmouseleave=function(){
        aUl[7].style.display='none';
    };
    aLi[9].onmouseenter=function(){
        aUl[8].style.display='block';
    };
    aLi[9].onmouseleave=function(){
        aUl[8].style.display='none';
    };
    aLi[10].onmouseenter=function(){
        aUl[9].style.display='block';
    };
    aLi[10].onmouseleave=function(){
        aUl[9].style.display='none';
    };
    aLi[11].onmouseenter=function(){
        aUl[10].style.display='block';
    };
    aLi[11].onmouseleave=function(){
        aUl[10].style.display='none';
    };
    aLi[12].onmouseenter=function(){
        square.style.display='block';
    };
    aLi[12].onmouseleave=function(){
        square.style.display='none';
    };
    aLi[13].onmouseenter=function(){
        aUl[12].style.display='block';
    };
    aLi[13].onmouseleave=function(){
        aUl[12].style.display='none';
    };
})();









