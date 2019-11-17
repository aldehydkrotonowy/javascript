//var e = !!3;
var fn = function(){
    return {
        foobar: this.e,
        e: !!0
    };
};
var res = fn();
res.foobar;