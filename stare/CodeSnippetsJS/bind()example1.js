this.x = 8;
var module = {
    x: 81,
    getX: function(){return console.log(this.x);}
}
module.getX();
var retriveX = module.getX; //here 'this' is lost
retriveX(); //result is 8 in browser or undefined in node.js
var getBoundX = retriveX.bind(module);
getBoundX();//this give again value 81