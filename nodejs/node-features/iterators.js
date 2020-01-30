function nextIterator(array){
  let nextIndex = 0;

  return {
    next: function(){
      return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {done: true};
    }
  }
}

const it = nextIterator([1, 2, 3, 4, 5]);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);