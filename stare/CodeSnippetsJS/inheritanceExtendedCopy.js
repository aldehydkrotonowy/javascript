function extendCopy(parent){
    var c = {};
    for (var i in parent){
        c[i] = parent[i]
    }
    c.uber = parent;
    return c;
}
function betterExtendCopy(parent, childParamsHash){
    var c = {};
    for (var i in parent){
        c[i] = parent[i]
    }
    for (var j in childParamsHash){
        c[j] = childParamsHash[j];
    }
    c.uber = parent;

    return c;
}
var shape = {
    name: "Shape",
    toString : function(){return this.name;}
}

var _shape2D = extendCopy(shape);
_shape2D.name = "Shape 2D";


var _Triangle = extendCopy(_shape2D);
_Triangle.name = "triangle";
_Triangle.side = 0;
_Triangle.height = 0;
_Triangle.getArea = function(){return 0.5*this.side*this.height;};


triangle = extendCopy(_Triangle);

triangle.toString();
triangle.uber.toString();
triangle.side = 50;
triangle.height = 10;
triangle.getArea();

var params = {width: 10, height:10};
var rectangle = betterExtendCopy(_shape2D, params);
rectangle.getArea = function(){return this.width*this.height;};
rectangle.getArea();

var i;