var EventEmitter = function () {
    this.events = {};
};

EventEmitter.prototype.on = function (event, listener) {
    if (typeof this.events[event] !== 'object') {
        this.events[event] = [];
    }

    this.events[event].push(listener);
};
var b;
b.on('click', somefun);
function somefun(){
    console.log('somefun says hello');
}