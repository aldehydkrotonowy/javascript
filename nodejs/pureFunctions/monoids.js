// https://marmelab.com/blog/2018/04/18/functional-programming-2-monoid.html
const compose = (f1, f2) => arg => {
    console.log('f1', f1);
    console.log('f2', f2);
    return f1(f2(arg));
}
const composeArray = arr => arr.reduce(compose, x => x);
const resultIs = a => `result: ${a}`;
const add5 = a => a + 5;
const double = a => a * 2;
const functions = [resultIs, add5, double];
const myOperation = composeArray(functions);
const x = myOperation(2);
// console.log(x);


compose(x=>x, double) 