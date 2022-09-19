// You'll be seeing let and const throughout this book. These are new variable
// declaration types. Unlike var, let is block scoped; it does not apply outside of its
// containing block: 

let foo = 'bar';
if(foo == 'bar') {
let foo = 'baz';
console.log(foo); // 1st
}
console.log(foo); // 2nd
// baz
// bar
// If we had used var instead of let:
// baz
// baz
// For variables that will never change, use const, for constant. This is helpful for
// the compiler as well, as it can optimize more easily if a variable is guaranteed
// never to change. Note that const only works on assignment, where the following
// is illegal: const foo = 1;
// foo = 2; // Error: assignment to a constant variable
// However, if the value is an object, const doesn't protect members: 

const foo = {
bar: 1 }
console.log(foo.bar) // 1
foo.bar = 2;
console.log(foo.bar) // 2

// Another powerful new feature is destructuring, which allows us to easily assign
// the values of arrays to new variables: 

let [executable, absPath, target, ...message] = process.argv;

// Destructuring allows you to rapidly map arrays to variable names. Since
// process.argv is an array, which always contains the path to the Node executable