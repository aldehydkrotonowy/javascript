// https://marmelab.com/blog/2018/04/18/functional-programming-2-monoid.html
const uncurry = fn => (...args) => {
    console.log(args);
    const result = args.reduce((prevRes, arg) => {
        if (typeof prevRes === 'function'){
            return prevRes(arg);
        }
        return prevRes;
    }, fn);
    return typeof result === 'function' ? uncurry(result) : result;
}

const add = uncurry(a => b => c => a+b+c);
const add2 = (a => b => c => a*b*c);


const a1 = add(1)(2)(3);
const b1 = add(1,2,3);
const c1 = add(1,2)(3);
const d1 = add(1)(2,3);

console.log(a1,b1,c1,d1);


const e = add2(4)(2)(3);

console.log(e);



const add5 = a => a + 5;
const double = a => a * 2;
const compose = (f1, f2) => arg => f1(f2(arg));

const add5ThenMultiplyBy2 = compose(double, add5);
const j = add5ThenMultiplyBy2(1);
console.log(j);


//fn.length dont take default args into account!!!


// First we need to know the number of arguments of the function.
// Thankfully, functions have a length parameter that tells us just that.
const curry = (fn, length = fn.length) => (...args) => {
    if (args.length >= length) {
        return fn(...args);
    }

    return curry((...nextArgs) => fn(...args, ...nextArgs), fn.length - args.length);
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3); // 6
add(1, 2, 3); // 6
add(1, 2)(3); // 6
add(1)(2, 3); // 6