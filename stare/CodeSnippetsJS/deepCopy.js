function deepCopy(p, c){
    var c = c || {};
    for (var i in p){
        if(p.hasOwnProperty(i)){
            if( typeof p[i] === 'object'){
                c[i] = Array.isArray(p[i]) ? [] : {};
                deepCopy(p[i], c[i]);
            }else{
                c[i] = p[i];
            }
       }
    }
    return c;
};

var obj = {
    numbers : [2, 4, 5],
    letters : ['a', 'b', 'c'],
    oo : {letter: 'a', name: 'ala', car: 'toyota'},
    bool : true,
    variable : 1
};
var newObj = deepCopy(obj);
console.log(newObj);