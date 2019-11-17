function Shape(){};
Shape.prototype.name = 'Shape';
Shape.prototype.toString = function(){return this.name};

function extend(child, parent){
    child.prototype.constructor = child;
    child.prototype = new parent;
}

function Shape2D(){
    this.hello = 'hello';
};
extend(Shape2D, Shape);
Shape2D.prototype.constructor = Shape2D;
Shape2D.prototype.name = "2D Shape";


function Triangle(side, height){
    this.side = side;
    this.height = height;
}
extend(Triangle, Shape2D);
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea = function(){return 0.5*this.side*this.height;};

var o = new Shape2D();

function Rectangle(){};
Rectangle.prototype = o;

function Diamoond(){};
Diamoond.prototype = o;

var object = new Object();
var shape = new Shape();
var shape2D = new Shape2D();
var triangle = new Triangle(10, 10);
var rectangle = new Rectangle();
var diamond = new Diamoond();


function Circle(){}
extend(Circle, Shape2D);
var circle = new Circle();
circle.__proto__ === Circle.prototype;



//triangle.__proto__ === Triangle.prototype; //false
//rectangle.__proto__ === diamond.__proto__; //true