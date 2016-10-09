function selfEventEmitter() {};

selfEventEmitter.prototype.on = function(type, fn) {
    if(!this["emiiter" + type]) {
        this["emiiter" + type] = [];
    }
    var ary = this["emiiter" + type];
    for(var i=0; i<ary.length; i++){
        if(ary[i] == fn) {
            return;
        }
    }
    ary.push(fn);
}

selfEventEmitter.prototype.run = function(type, e) {
    var ary = this["emiiter" + type];
    if(ary && (ary.length != 0)){
        for(var i=0; i<ary.length; i++){
            if(typeof ary[i] == "function") {
                ary[i].call(this, e);
            }
        }
    }
}

selfEventEmitter.prototype.off = function(type, fn) {
    var ary = this["emiiter" + type];
    for(var i=0; i<ary.length; i++){
        if(ary[i] == fn) {
            ary.splice(i, 1);
            return;
        }
    }
}