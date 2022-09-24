// A method of the native Node process module, process.nextTick is similar to the
// familiar setTimeout method in which it delays execution of its callback function
// until some point in the future. However, the comparison is not exact; a list of all
// requested nextTick callbacks are placed at the head of the event queue, and is
// processed, in its entirety and in order, before I/O or timer events and after
// execution of the current script (the JavaScript code executing synchronously on
// the V8 thread).
// The primary use of nextTick in a function is to postpone the broadcast of result
// events to listeners on the current execution stack until the caller has had an
// opportunity to register event listeners, giving the currently executing program a
// chance to bind callbacks to EventEmitter.emit events.
// Think of this as a pattern to use wherever you want to create your own
// asynchronous behavior. For instance, imagine a lookup system that may either
// fetch from a cache, or pull fresh data from a data store. The cache is fast and
// doesn't need callbacks, while the data I/O call would need them.
// The need for callbacks in the second case argues for emulation of the callback
// behavior, with nextTick in the first case. This allows a consistent API, improving
// clarity of implementation without burdening the developer with the
// responsibility of determining whether or not to use a callback.
// The following code seems to set up a simple transaction; when an instance of
// EventEmitter emits a start event, log Started to the console: 

const events = require('events');
function getEmitter() {
let emitter = new events.EventEmitter();
emitter.emit('start');
return emitter;
}

let myEmitter = getEmitter();
myEmitter.on("start", () => {
console.log("Started");
});
// However, the result you might expect will not occur! The event emitter
// instantiated within getEmitter emits start previous to being returned, wrongfooting the subsequent assignment of a listener, which arrives a step late, missing
// the event notification.
// To solve this race condition, we can use process.nextTick: 

const events = require('events');
function getEmitter() {
let emitter = new events.EventEmitter();
process.nextTick(() => {
emitter.emit('start');
});
return emitter;
}

let myEmitter = getEmitter();
myEmitter.on('start', () => {
console.log('Started');
});

// This code attaches the on("start") handler before Node gives us the start event,
// and works properly.
// Erroneous code can recursively call nextTick, causing an unending loop of code to
// run. Note that unlike a recursive call to a function within a single turn of the
// event loop, doing this won't cause a stack overflow. Rather, it will starve the
// event loop, churn your process on the microprocessor, and could prevent your
// program from discovering the I/O that Node has finished.