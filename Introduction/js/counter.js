// The following code sets Node's EventEmitter object as the prototype of a function
// constructor we define. Each constructed instance has the EventEmitter object
// exposed to its prototype chain, providing a natural reference to the event API.
// The counter instance methods emit events, and code after that listens for them.
// After making a Counter, we listen for the incremented event, specifying a callback
// Node will call when the event happens. Then, we call the increment twice. Each
// time, our Counter increments the internal count it holds, and then emits the
// incremented event. This calls our callback, giving it the current count, which our
// callback logs: File counter.js
// Load Node's 'events' module, and point directly to EventEmitter there
const EventEmitter = require('events').EventEmitter;
// Define our Counter function
const Counter = function(i) { // Takes a starting number
this.increment = function() { // The counter's increment method
i++; // Increment the count we hold
this.emit('incremented', i); // Emit an event named incremented
}
}
// Base our Counter on Node's EventEmitter
Counter.prototype = new EventEmitter(); // We did this afterwards, not before!
// Now that we've defined our objects, let's see them in action
// Make a new Counter starting at 10
const counter = new Counter(10);
// Define a callback function which logs the number n you give it
const callback = function(n) {
console.log(n);
}
// Counter is an EventEmitter, so it comes with addListener
counter.addListener('incremented', callback);
counter.increment(); // 11
counter.increment(); // 12
// To remove the event listeners bound to counter, use this:
counter.removeListener('incremented', callback)
