var elephant = (function(){
    var add = function(){return 'lalala'};
    var text = 'some text';
    return {
        add: add,
        text: text,
    }
})
elephant.add(5,5);