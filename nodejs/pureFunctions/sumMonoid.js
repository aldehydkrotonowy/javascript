const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const Sum = x => ({
    append: y => Sum(x + y.val),
    val: x
})

Sum.identity = Sum(0)


const fold = (M, xs) =>
  xs.map(x => M(x)).reduce(
    (acc, y) => {
        console.log(y);
        return acc.append(y)
    },
    M.identity
  )

// Surprise: it's 45!
const x = fold(Sum, numbers).val;
console.log(x);