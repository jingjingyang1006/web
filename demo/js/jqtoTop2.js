
$(function(){
    var $win=$(window);
    var timer=null;
    var bOk=false;
    //当滚动条滚动的距离大于可视区的时候，让按钮显示，否则隐藏
    $(window).on('scroll',function(){
        if(bOk){
            clearInterval(timer)
        }
        bOk=true;
        //$win.height()->代表clientHeight
        if($win.scrollTop()>$win.height()){
            $('div').stop().show();
        }else{
            $('div').stop().hide();
        }
    });
    //点击按钮，回到顶部
    $('div').click(function(){
        var target=$win.scrollTop();
        var duration=1000;
        var interval=30;
        var step=target/duration*interval;
        timer=setInterval(function(){
            bOk=false;
            target-=step;
            if(target<=0){
                clearInterval(timer);
                return;
            }
            $win.scrollTop(target);
        },interval)
    })
})