function Auto(){
    //properties
    this.name = '';
    this.speed = 0;

    //methods
    this.getName = function(){
        return console.log(this.name);
    }
    this.getSpeed = function(){
        return console.log(this.speed);
    }

    this.accelerate = accelerate;
    function accelerate(rate){
        this.speed = this.speed+rate;
    }
}
console.log('something');
var car = new Auto();
car.name = "toyota";
car.getName();
car.getSpeed();
car.speed = 10;
car.getSpeed();
car.accelerate(10);
car.getSpeed();



