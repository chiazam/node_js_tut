// Finally, you will see a lot of backticks in the code. This is the new template
// literal syntax, and along with other things, it (finally!) makes working with
// strings in JavaScript much less error-prone and tedious. You saw in the example
// how it is now easy to express multiline strings (avoiding 'First line\n' + 'Next
// line\n' types of constructs). String interpolation is similarly improved: 

let name = 'Sandro';
console.log('My name is ' + name);
console.log(`My name is ${name}`);
// My name is Sandro
// My name is Sandro
// This sort of substitution is especially effective when concatenating many
// variables, and since the contents of each ${expression} can be any JavaScript code:
console.log(`2 + 2 = ${2+2}`) // 2 + 2 = 4
// You can also use repeat to generate strings: 'ha'.repeat(3) // hahaha.
// Strings are now iterable. Using the new for...of construct, you can pluck apart a
// string character by character: 
for(let c of 'Mastering Node.js') {
console.log(c);
// M
// a
// s
// ...
}
// Alternatively, use the spread operator: 
console.log([...'Mastering Node.js']);
// ['M', 'a', 's',...]
// Searching is also easier. New methods allow common substring seeks without
// much ceremony: 
let targ = 'The rain in Spain lies mostly on the plain';
console.log(targ.startsWith('The', 0)); // true
console.log(targ.startsWith('The', 1)); // false
console.log(targ.endsWith('plain')); // true
console.log(targ.includes('rain', 5)); // false
// The second argument to these methods indicates a search offset, defaulting to 0.
// The is found at position 0, so beginning the search at position 1 fails in the second
// case.
// Great, writing JavaScript programs just got a little easier. The next question is
// what's going on when that program is executed within a V8 process?