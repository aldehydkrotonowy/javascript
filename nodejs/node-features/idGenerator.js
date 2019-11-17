function *idMaker(){
  let index = 0;
  while(true){
    yield index++;
  }
}

const id = idMaker();

console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());
console.log(id.next());