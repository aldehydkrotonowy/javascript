function *list(){
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const generator = list();

console.log(generator.next()); // prints { value: 1, done: false }
console.log(generator.next()); // prints { value: 2, done: false }
console.log(generator.next()); // prints { value: 3, done: false }
console.log(generator.next()); // prints { value: 4, done: false }
console.log(generator.next()); // prints { value: 5, done: false }
console.log(generator.next()); // prints { value: undefined, done: true }