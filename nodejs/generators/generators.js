// https://www.youtube.com/watch?v=ategZqxHkz4

const fetch = require('node-fetch');
// const co = require('co');

// co(function *(){
//   const uri = 'http://jsonplaceholder.typicode.com/posts/1';
//   const response = yield fetch(uri); //fetch returns promise
//   const post = yield response.json();// response returns promise
//   const title = post.title;
//   console.log(title);
// })

// now run function instead of co 
run(function *(){
  const uri = 'http://jsonplaceholder.typicode.com/posts/1';
  const response = yield fetch(uri); //fetch returns promise
  const post = yield response.json();// response returns promise
  const title = post.title;
  console.log(title);
})

function run(generator){
  const iterator = generator(); //genrator function gives us iterator
  const iteration = iterator.next(); //iteration = { value: Promise { <pending> }, done: false }
  const promise = iteration.value;
  promise.then(value => iterator.next(value));
}