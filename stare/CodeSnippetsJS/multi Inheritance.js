function multi(){
    var n = {}, len = arguments.length, stuff, i=0;
    for (i=0; i<len; i++){
        stuff = arguments[i];
        for(var j in stuff){
            if(stuff.hasOwnProperty(j)){
                n[j] = stuff[j];  
            }
        }        
    }
    return n;
};
var obj1 = {
    name: 'luk',
    a : [1, 1, 2, 4]
};
var obj2 = {
    type : 'toyota',
    b : ['1', 'b', 'hell']
};
var obj3 = {
    bool: false,
    side : 55,
    height : 44,
    func : function(){return this.side*this.height}
};
var sumObj = multi(obj1, obj2, obj3);
console.log(sumObj);
var adder = new Function('a', 'b', 'return a+b');