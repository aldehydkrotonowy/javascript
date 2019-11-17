// https://medium.com/@chetcorcos/introduction-to-parsers-644d1b5d7f3d
const char = c => input => {
    if (input[0] === c){
      return {success: true, rest: input.slice(1)}
    }
    return {success: false, rest: input}
  }
  
  
  const sequence = parsers => input => {
    let next = input;
    for (let i=0; i<parsers.length; i++){
      const parser = parsers[i];
      const {success, rest} = parser(next);
      if (success){
        console.log(`parser ${i} found something!`)
      } else {
        return {success, rest}
      }
      next = rest
    }
    return {success: true, rest: next}
    
  }
  
  
  
  console.log(sequence([char('a'), char('b'), char('c')])('abck'));
  
  const string = str => sequence(str.split('').map(char));
  
  string('abcde')('abcdefg');
  
  
  const either = parsers => input => {
    for (var i = 0; i < parsers.length; i++) {
      const parser = parsers[i]
      const {success, rest} = parser(input)
      if (success) {
        return {success, rest}
      }
    }
    return {success: false, rest: input}
  }
  either([string('abc'), string('abab')])('abcd');
  // => { success: true, rest: 'd' }
  either([string('abc'), string('abab')])('ababab');
  // => { success: true, rest: 'ab' }
  either([string('abc'), string('abab')])('aba');
  // => { success: false, rest: 'aba' }


class Stram {
  constructor(iterable, cursor, length){
    this.iterable = iterable;
    this.cursor = cursor || 0
    this.length = length === undefined ? iterable.length - this.cursor : length
  }
  head(){
    if (this.length <= 0){
      throw new TypeError('index out of range');
    }
    return this.iterable[this.cursoor]
  }
  move(distance){
    return new Stream(this.iterable, this.cursor + distance, this.length - distance)
  }
  slice(start, stop){
    if (stop < start){
      throw new Error('stop < start')
    }
    if (start && stop > this.length){
      throw new TypeError('index out of range')
    }
    return new Stream(this.iterable, this.cursor + start, (stop || this.length) - start)
  }
};

class Result {
  constructor(value, rest) {
    this.value = value
    this.rest = rest
  }
}

class Success extends Result {
  map(fn) {
    return new Success(fn(this.value), this.rest)
  }
  bimap(s, f) {
    return new Success(s(this.value), this.rest)
  }
  chain(fn) {
    return fn(this.value, this.rest)
  }
  fold(s, f) {
    return s(this.value, this.rest)
  }
}
  
class Failure extends Result {
  map(fn) {
    return this
  }
  bimap(s, f) {
    return new Failure(f(this.value), this.rest)
  }
  chain(fn) {
    return this
  }
  fold(s, f) {
    return f(this.value, this.rest)
  }
}


class Parser {
  constructor(parse) {
    this.parse = parse
  }
  run(iterable) {
    if (iterable instanceof Stream) {
      return this.parse(iterable)
    } else {
      return this.parse(new Stream(iterable))
    }
  }
  map(f) {
    return new Parser(stream => this.parse(stream).map(f))
  }
  bimap(s, f) {
    return new Parser(stream => this.parse(stream).bimap(s, f))
  }
  chain(f) {
    return new Parser(stream => 
      this.parse(stream).chain((v, s) => f(v).run(s)))
  }
  fold(s, f) {
    return new Parser(stream => this.parse(stream).fold(s, f))
  }
}


  const char = c =>
  new Parser(stream => {
    if (stream.length === 0) {
      return new Failure('unexpected end', stream)
    }
    const value = stream.head()
    if (value === c) {
      return new Success(value, stream.move(1))
    }
    return new Failure('char did not match', stream)
  })