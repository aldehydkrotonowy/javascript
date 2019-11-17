// 1. One parameter in ES6
let sum1 = (a, b) => a + b;
console.log('ES6 sum is: '+sum1(5,1));
 
// in ES5
var sum2 = function(a, b) {
    return a + b; 
};
console.log('ES5 sum is: '+sum2(5,1));

//ES6
let randomNum = () => Math.random();
console.log('ES6 random: '+randomNum());
//ES5
var randomNum1 = function() {
    return Math.random(); 
};
console.log('ES5 random: '+randomNum1());

// 3. Without return in ES6
let message1 = (name) => console.log('ES6 message: '+"Hi " + name + "!"); 
message1('norbert');
 
// in ES5
var message2 = function(yourName) {
    console.log('ES5 message: '+" Hi " + yourName + "!");  
};
message2('norbert');