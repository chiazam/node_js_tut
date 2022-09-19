// The following three points are important to remember, as we break down the
// event loop:
// The event loop runs in the same (single) thread your JavaScript code runs
// in. Blocking the event loop means blocking the entire thread.
// You don't start and/or stop the event loop. The event loop starts as soon as a
// process starts, and ends when no further callbacks remain to be performed.
// The event loop may, therefore, run forever.
// The event loop delegates many I/O operations to libuv, which manages
// these operations (using the power of the OS itself, such as thread pools),
// notifying the event loop when results are available. An easy-to-reasonabout single-threaded programming model is reinforced with the efficiency
// of multithreading.
// For example, the following while loop will never terminate: 

let stop = false;
setTimeout(() => {
stop = true;
}, 1000);
while (stop === false) {};

// Even though one might expect, in approximately one second, the assignment of a
// Boolean true to the variable stop, tripping the while conditional and interrupting its
// loop; this will never happen. Why? This while loop starves the event loop by
// running infinitely, greedily checking and rechecking a value that is never given a
// chance to change, as the event loop is never given a chance to schedule our timer
// callback for execution. This proves the event loop (which manages timers), and
// runs on the same thread.
// According to the Node documentation, "The event loop is what allows Node.js
// to perform non-blocking I/O operations — despite the fact that JavaScript is
// single-threaded — by offloading operations to the system kernel whenever
// possible." The key design choice made by Node's designers was the
// implementation of an event loop as a concurrency manager. For example,
// notifying your Node-based HTTP server of network connections to your local
// hardware is handled by the OS passing along, via libuv, network interface events.
// The following description of event-driven programming (taken from: http://www.p
// rinceton.edu/~achaney/tmve/wiki100k/docs/Event-driven_programming.html) clearly not only
// describes the event-driven paradigm, but also introduces us to how events are
// handled in Node, and how JavaScript is an ideal language for such a paradigm.
// In computer programming, event-driven programming or event-based
// programming is a programming paradigm in which the flow of the program is
// determined by events—that is, sensor outputs or user actions (mouse clicks, key
// presses) or messages from other programs or threads. Event-driven programming
// can also be defined as an application architecture technique in which the
// application has a main loop that is clearly divided down to two sections: the first
// is event selection (or event detection), and the second is event handling […].
// Event-driven programs can be written in any language, although the task is
// easier in languages that provide high-level abstractions, such as closures. Visit ht
// tps://www.youtube.com/watch?v=QQnz4QHNZKc for more information.
// Node makes a single thread more efficient by delegating many blocking
// operations to OS subsystems to process, bothering the main V8 thread only
// when there is data available for use. The main thread (your executing Node
// program) expresses interest in some data (such as via fs.readFile) by passing a
// callback, and is notified when that data is available. Until that data arrives, no
// further burden is placed on V8's main JavaScript thread. How? Node delegates
// I/O work to libuv, as quoted at: http://nikhilm.github.io/uvbook/basics.html#eventloops.
// In event-driven programming, an application expresses interest in certain events,
// and responds to them when they occur. The responsibility of gathering events
// from the operating system or monitoring other sources of events is handled by
// libuv, and the user can register callbacks to be invoked when an event occurs.
// Matteo Collina has created an interesting module for
// benchmarking the event loop, which is available at: https://github.co
// m/mcollina/loopbench.
// Consider the following code:

const fs = require('fs');
fs.readFile('foo.js', {encoding:'utf8'}, (err, fileContents) => {
console.log('Then the contents are available', fileContents);
});
console.log('This happens first');

// The output of this program is:
// > This happens first
// > Then the contents are available, [file contents shown]
// Here's what Node does when executing this program:
// 1. A process object is created in C++ using the V8 API. The Node.js runtime
// is then imported into this V8 process.
// 2. The fs module is attached to the Node runtime. V8 exposes C++ to
// JavaScript. This provides access to native filesystem bindings for your
// JavaScript code.
// 3. The fs.readFile method has passed instructions and a JavaScript callback.
// Through fs.binding, libuv is notified of the file read request, and is passed a
// specially prepared version of the callback sent by the original program.
// 4. libuv invokes the OS-level functions necessary to read a file.
// 5. The JavaScript program continues, printing This happens first. Because there
// is a callback outstanding, the event loop continues to spin, waiting for that
// callback to resolve.
// 6. When the file descriptor has been fully read by the OS, libuv (via internal
// mechanisms) is informed, and the callback passed to libuv is invoked, which
// essentially prepares the original JavaScript callback for re-entrance into the
// main (V8) thread.
// 7. The original JavaScript callback is pushed onto the event loop, and is
// invoked on a near-future tick of the loop.
// 8. The file contents are printed to the console.
// 9. As there are no further callbacks in flight, the process exits.
// Here, we see the key ideas that Node implements to achieve fast, manageable,
// and scalable I/O. If, for example, there were 10 read calls made for foo.js in the
// preceding program, the execution time would, nevertheless, remain roughly the
// same. Each call will be managed by libuv as efficiently as possible (by, for
// example, parallelizing the calls using threads). Even though we wrote our code
// in JavaScript, we are actually deploying a very efficient multithreaded execution
// engine while avoiding the difficulties of OS asynchronous process management.
// Now that we know how a filesystem operation might work, let's dig into how
// every type of asynchronous operation Node capable of spawning is treated on
// the event loop.
