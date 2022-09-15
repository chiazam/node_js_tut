// Arrow functions allow you to shorten function declarations, from 
function() {}
// to simply 
() => {}
// . Indeed, you can replace a line like this: 

SomeEmitter.on('message',
function(message) { console.log(message) });
// To:
SomeEmitter.on('message', message => console.log(message));
// Here, we lose both the brackets and curly braces, and the tighter code works as
// expected.
// Another important feature of arrow functions is they are not assigned their own
// this—arrow functions inherit this from the call site. For example, the following
// code does not work: 
function Counter() {
this.count = 0;
setInterval(function() {
console.log(this.count++);
}, 1000);
}
new Counter();
// The function within setInterval is being called in the context of setInterval, rather
// than the Counter object, so this does not have any reference to count. That is, at
// the function call site, this is a Timeout object, which you can check yourself by
// adding console.log(this) to the prior code.
// With arrow functions, this is assigned at the point of definition. Fixing the code
// is easy: 
setInterval(() => { // arrow function to the rescue!
console.log(this);
console.log(this.count++);
}, 1000);
// Counter { count: 0 }
// 0
// Counter { count: 1 }
// 1
// ...