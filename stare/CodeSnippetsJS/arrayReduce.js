function getRand(min, max, n){
    var t = [];
    for(var i=0; i<n; i++){
       t.push(Math.floor(Math.random()*(max - min)+min));
    }
    return t;
}
function sqrtFunc(){
    return array.map(function(currentValue){
        return Math.sqrt(currentValue);
    });
}
var array = getRand(0, 200, 5);
var max = array.reduce(function(previous, current){
    return Math.max(previous, current);
}, 0);
var sum = array.reduce(function(previous, current){
    return previous+current;
});
var sqr = sqrtFunc();
var pow2 = array.map(function(current, i, arr){
    var p = current*current;
    return 'current: '+current+'^2 = '+p;
})

var results = {};
results.array = array;
results.max = max;
results.sum = sum;
results.sqrt = sqr.toString();
results.pow2 = pow2.toString();
results;