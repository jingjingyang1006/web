/**
 * Created by xiao lei on 2016/7/16.
 */
/**
 * bind:解决了DOM2级事件的兼容问题；（除了顺序以外）
 * @param curEle
 * @param eventType
 * @param eventFn
 */
function bind(curEle,eventType,eventFn){
    if('addEventListener' in document){//标准浏览器的支持
        curEle.addEventListener(eventType,eventFn,false);
        return;
    }
    //相当于我们给eventFn这个方法带了黑面具；
    var tmpFn=function(){
        eventFn.call(curEle);//这里主要解决this问题；
    };
    tmpFn.name=eventFn;
    if(!curEle['myBind'+eventType]){//自定义属性不存在的话
        curEle['myBind'+eventType]=[];//创建一个自定义属性做为数组；
    }
    var ary=curEle['myBind'+eventType];//ary是自己的事件池；
        //每次往数组中插入新的匿名函数的时候，我们都会先通过这个匿名函数的名字，判断他是否已经存在，如果存在，不插入，不存在才插入
        for(var i=0; i<ary.length; i++){
            var cur=ary[i];
            if(cur.name===eventFn){//如果数组中如果存在该匿名函数，不做任何操作
                return;//这里主要解决的是重复问题；
            }
    }
    ary.push(tmpFn);//每个被绑定的匿名函数，都存在元素的自定义属性这个数组上；
    //IE浏览器的兼容处理
    curEle.attachEvent('on'+eventType,tmpFn);//把带了黑面具的这个方法，放在系统的事件池中；
}
/**
 * unbind:解除DOM2级事件绑定
 * @param curEle
 * @param eventType
 * @param eventFn
 */
function unbind(curEle,eventType,eventFn){
    if('removeEventListener' in document){//标准浏览器的支持
        curEle.removeEventListener(eventType,eventFn,false);
        return;
    }
    var ary=curEle['myBind'+eventType];
    for(var i=0; i<ary.length; i++){
        var cur=ary[i];
        if(cur.name===eventFn){
            //1.删除自己事件池中的匿名函数--splice
            ary.splice(i,1);
            //2.删掉浏览器事件池中的匿名函数--detachEvent
            curEle.detachEvent('on'+eventType,cur);
            break;
        }
    }

    //IE浏览器的兼容处理
    curEle.detachEvent('on'+eventType,eventFn);
}
/*
* 1）bind里做了什么事？--解决了 this问题，重复问题
*   1.处理标准浏览器和低级浏览器的兼容处理
*   2.处理this问题：把每个匿名函数（给绑定的方法改变this指向）放在定义属性这个数组中；这就是自己的事件池; 把每个匿名函数也放在系统事件池中；
*   3.为了在unbind中能够解除浏览器事件池中的匿名函数；需要在bind中给自己的事件池添加以前，给每个匿名函数起个名字 tmpFn.name=eventFn;
* 2)unbind
*   1.拿到自定义属性上的数组；
*   2.判断数组中谁的名字===eventFn;浏览器事件池解除这个匿名函数；删除数组中的这一项匿名函数；
* */
/*
* 1）on里想干什么事？--绑定事件 this问题， 重复问题 ，顺序问题；
*   1.创建一个自定义属性，做为数组，存的是每个行为绑定的方法；--做为自己的事件池
*   2.给元素的某个行为绑定bind一个run方法（直接把run方法放到系统事件池里了）
*   bind(curEle,eventType,run)//run方法中有一个系统传入的参数e：事件对象；run方法中的this就是curEle;
* 2）run方法里干了什么事？
*   1.核心：把元素自定义属性上的数组中的所有方法都执行了； this？事件对象？
*   2.做了低级浏览器的兼容处理；if(!e.target).....
* 3）off里干了什么事？--解除绑定
* 系统的事件池里，只有一个 run方法，如果想解除事件绑定，只要删除数组中原有的方法，run方法中就不会执行已删除的这个方法；
* */
function on(curEle,eventType,eventFn){
    //1.创建一个自定义属性，做为数组，存的是每个行为绑定的方法；
    if(!curEle['myEvent'+eventType]){
        curEle['myEvent'+eventType]=[];
    }
    var ary=curEle['myEvent'+eventType];
    for(var i=0; i<ary.length; i++){
        var cur=ary[i];
        if(cur===eventFn){
            return;
        }
    }
    ary.push(eventFn);
    //2.给元素的某个行为绑定bind一个run方法
    bind(curEle,eventType,run);
    //run有一个参数e--事件对象； run中的this是当前元素curEle；
}
function off(curEle,eventType,eventFn){
    var ary=curEle['myEvent'+eventType];
    for(var i=0; i<ary.length; i++){
        var cur=ary[i];
        if(cur===eventFn){
            ary.splice(i,1);
            break;
        }
    }
}
function run(e){
    //this-curEle;
    e=e||window.event;
    //2.做了低级浏览器的兼容处理；if(!e.target).....
    if(!e.target){
        e.target= e.srcElement;//事件源的兼容处理
        //到首屏的左上角的坐标位置
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        //阻止默认事件
        e.preventDefault=function(){
            e.returnValue=false;
        };
        //阻止冒泡
        e.stopPropagation=function(){
            e.cancelBubble=true;
        }
    }
    //1.核心：把元素自定义属性上的数组中的所有方法都执行了； this？事件对象？
    var ary=this['myEvent'+ e.type];
    for(var i=0; i<ary.length; i++){
        var cur=ary[i];
        cur.call(this,e);
    }
}










