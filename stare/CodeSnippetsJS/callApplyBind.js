//na podstawie wpisu:
//https://www.kainos.pl/blog/javascript-sterowanie-kontekstem-wywolania-funkcji-apply-call-bind-1/
var obi = {
	x : "jestem sobie pole x w objekcjie obi",
	test : function(){
		console.log(this.x);
		console.log('------------------------------------------');
		console.log('czy this === window?');
		console.log(this===window);
		console.log('------------------------------------------');
		console.log('czy this === obi?');
		console.log(this===obi);
	}
}
//obi.test();
//obi.x;
var myObject = {
    name: "Marcin",
    height: 184,
    width: 230,
    print : function() {
        console.log(this.name)
    },
    field : function(){
        console.log(this.height * this.width);
    }
};
myObject.weight = 73;
myObject.printDetails = function(){
    return {
        height : this.height,
        name : this.sname,
        weight : this.weight
    }
}
myObject.printDetails();