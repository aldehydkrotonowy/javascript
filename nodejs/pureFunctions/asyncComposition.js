// https://marmelab.com/blog/2018/04/18/functional-programming-2-monoid.html
const fetchJoke = async number => fetch(`http://api.icndb.com/jokes/${number}`);
const toJson = async response => response.json();
const parseJoke = json => json.value.joke;

const getJoke = async number => parseJoke(await toJson(await fetchJoke(number)));
getJoke(23).then(console.log); // "Time waits for no man. Unless that man is Chuck Norris."

// the getJoke() function is a pain to write. Let's use composition to make it easier
const asyncCompose = (func1, func2) => async x => func1(await func2(x));

// asyncCompose() is associative
asyncCompose(parseJoke, asyncCompose(toJson, fetchJoke))(23).then(console.log);
// "Time waits for no man. Unless that man is Chuck Norris."

asyncCompose(asyncCompose(parseJoke, toJson), fetchJoke)(23).then(console.log);
// "Time waits for no man. Unless that man is Chuck Norris."

// asyncCompose() has a neutral element - the identity function
const neutralAsyncFunc = x => x;
asyncCompose(a => Promise.resolve(a + 1), neutralAsyncFunc)(5) // Promise(6)
asyncCompose(neutralAsyncFunc, a => Promise.resolve(a + 1))(5) // Promise(6)

// so async functions form a monoid under the asyncCompose operation
// hurray, we can use Array.reduce!
const asyncComposeArray = functions => functions.reduce(asyncCompose, x => x);
// let's make it a function that takes an arbitrary number of arguments instead
const asyncComposeArgs = (...args) => args.reduce(asyncCompose, x => x);

// now, writing getJoke() becomes much easier
const getJoke2 = asyncComposeArgs(parseJoke, toJson, fetchJoke);
getJoke2(23).then(console.log); // "Time waits for no man. Unless that man is Chuck Norris."