// Generators are function execution contexts that can be paused and resumed.
// When you call a normal function, it will likely return a value; the function fully
// executes, then terminates. A Generator function will yield a value then stop but
// the function context of a Generator is not disposed of (as it is with normal
// functions). You can re-enter the Generator at a later point in time and pick up
// further results.
// An example might help:
function* threeThings() {
yield 'one';
yield 'two';
yield 'three';
}
let tt = threeThings();
console.log(tt); // {}
console.log(tt.next()); // { value: 'one', done: false }
console.log(tt.next()); // { value: 'two', done: false }
console.log(tt.next()); // { value: 'three', done: false }
console.log(tt.next()); // { value: undefined, done: true }
// A Generator is declared by marking it with an asterisk (*). On the first call to
// threeThings, we get don't get a result, but an Generator object.
// Generators conform to the new JavaScript iteration protocols (https://developer.mo
// zilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator), which for
// our purposes mean that a Generator object exposes a next method, which is used
// to pull out as many values from a Generator as it is willing to yield. This power
// comes from the fact that Generators implement the JavaScript Iteration protocol.
// So, what's an iterator?
// As https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
// says,
// "An object is an iterator when it knows how to access items from a collection
// one at a time, while keeping track of its current position within that sequence. In
// JavaScript an iterator is an object that provides a next() method which returns
// the next item in the sequence. This method returns an object with two properties:
// done and value."
// We can replicate the Generator example using just an Iterator: function
demoIterator(array) {
let idx = 0;
return {
next: () => {
return idx < array.length ? {
value: array[idx++],
done: false
} : { done: true };
}
};
}
let it = demoIterator(['one', 'two', 'three']);
console.log(it); // { next: [Function: next] }
console.log(it.next()); // { value: 'one', done: false }
console.log(it.next()); // { value: 'two', done: false }
console.log(it.next()); // { value: 'three', done: false }
console.log(it.next()); // { done: true }
// You'll note that the results are nearly identical with the Generator example, with
// one important difference we can see in the first result: an Iterator is simply an
// object with a next method. It must do all the work of maintaining its own
// internal state (tracking idx in the previous example). Generators are factories for
// Iterators; furthermore, they do all the work of maintaining and yielding their
// own state.
// Descended from Iterators, Generators yield objects with two properties:
// done : A Boolean. If true, the Generator is indicating that it has nothing left
// to yield. If you were to think of Generators as streams (not a bad parallel),
// then you might compare this pattern to the pattern of Readable.read()
// returning null when a stream has ended (or if you prefer, the way a Readable
// will push null when finished).
// value: The value of the last yield. Should be ignored if done is true.
// Generators are designed for iterative contexts, not unlike a loop, providing the
// powerful advantage of a function execution context. You may have written
// something like this: 

function getArraySomehow() {
// slice into a copy; don't send original
return ['one','two','buckle','my','shoe'].slice(0);
}
let state = getArraySomehow();
for(let x=0; x < state.length; x++) {
console.log(state[x].toUpperCase());
}
// This is fine, but there are downsides, such as needing to create a local reference
// to an external data provider and maintaining that reference when this block or
// function terminates. Do we make state a global? Should it be immutable? If the
// underlying data changes, for example, a new element is added to the array, how
// do we make sure state is updated, disconnected as it is from the true state of our
// application? What if something accidentally overwrites state? Data observation
// and binding libraries exist, design theories exist, frameworks exist to properly
// encapsulate your data sources and inject immutable versions into execution
// contexts; but what if there was a better way?
// Generators can contain and manage their own data and yield the right answer
// even through change. We can implement the previous code with Generators:
function* liveData(state) {
let state = ['one','two','buckle','my','shoe'];
let current;
while(current = state.shift()) {
yield current;
}
}
let list = liveData([]);
let item;
while (item = list.next()) {
if(!item.value) {
break;
}
console.log('generated:', item.value);
}
// The Generator method handles all the "boilerplate" for sending back a value, and
// naturally encapsulates the state. But there doesn't seem to be a significant
// advantage here. This is because we are using a Generator to execute iterations
// that run sequentially and immediately. Generators are really for situations when
// a series of values are promised, with individual values being generated only
// when requested, over time. Rather than processing an array all at once and in
// order, what we really want to create is a sequential chain of communicating
// processes, each process "tick" calculating a result with visibility into previous
// process results.
// Consider the following:
function* range(start=1, end=2) {
do {
yield start;
} while(++start <= end)
}
for (let num of range(1, 3)) {
console.log(num);
}
// 1
// 2
// 3
// You can pass arguments to Generators. We create a range state machine by
// passing range bounds, where further calls to the machine will cause an internal
// state change, and yield the current state representation to the caller. While for
// demonstration purposes we use the for...of method of traversing Iterators (and
// therefore Generators), this sequential processing (which blocks the main thread
// until it is finished) can be made asynchronous.
// The run/halt (not run/stop) design of Generators means that we can think of
// iteration not as running through a list, but of capturing a set of transition events
// over time. This idea is central to the idea of Reactive Programming (https://en.w
// ikipedia.org/wiki/Reactive_programming), for example. Let's think through another
// example where this particular advantage of Generators can be displayed.
// There are many other things you can do with these sorts of data structures. It
// might be helpful to think this way: Generators are to a sequence of future values
// as Promises are to a single future value. Both Promises and Generators can be
// passed around the instant they are generated (even if some eventual values are
// still resolving, or haven't yet been queued for resolution), with one getting values
// via the next() interface, and the other via the then() interface.