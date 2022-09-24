// A Node program does not stay alive without a reason to do so. A process will
// keep running for as long as there are callbacks still waiting to be processed.
// Once those are cleared, the Node process has nothing left to do, and it will exit.
// For example, the following silly code fragment will keep a Node process
// running forever: let intervalId = setInterval(() => {}, 1000);
// Even though the set callback function does nothing useful or interesting, it
// continues to be called. This is the correct behavior, as an interval should keep
// running until clearInterval is used to stop it.
// There are cases of using a timer to do something interesting with external I/O, or
// some data structure, or a network interface, where once those external event
// sources stop occurring or disappear, the timer itself becomes unnecessary.
// Normally, one would trap that irrelevant state of a timer somewhere else in the
// program, and cancel the timer from there. This can become difficult or even
// clumsy, as an unnecessary tangling of concerns is now necessary, an added level
// of complexity.
// The unref method allows the developer to assert the following instructions: when
// this timer is the only event source remaining for the event loop to process, go
// ahead and terminate the process.
// Let's test this functionality to our previous silly example, which will result in the
// process terminating rather than running forever: let intervalId = setInterval(() =>
// {}, 1000);
// intervalId.unref();
// Note that unref is a method of the opaque value returned when starting a timer,
// which is an object.
// Now, let's add an external event source, a timer. Once that external source gets
// cleaned up (in about 100 milliseconds), the process will terminate. We send
// information to the console to log what is happening: setTimeout(() => {
// console.log("now stop");
// }, 100);
// let intervalId = setInterval(() => {
// console.log("running")
// }, 1);
// intervalId.unref();
// You may return a timer to its normal behavior with ref, which will undo an unref
// method: let intervalId = setInterval(() => {}, 1000);
// intervalId.unref();
// intervalId.ref();
// The listed process will continue indefinitely, as in our original silly example.
// Snap quiz! After running the following code, what is the expected order of
// logged messages?
// const fs = require('fs');
// const EventEmitter = require('events').EventEmitter;
// let pos = 0;
// let messenger = new EventEmitter();
// // Listener for EventEmitter
// messenger.on("message", (msg) => {
// console.log(++pos + " MESSAGE: " + msg);
// });
// // (A) FIRST
// console.log(++pos + " FIRST");
// // (B) NEXT
// process.nextTick(() => {
// console.log(++pos + " NEXT")
// })
// // (C) QUICK TIMER
// setTimeout(() => {
// console.log(++pos + " QUICK TIMER")
// }, 0)
// // (D) LONG TIMER
// setTimeout(() => {
// console.log(++pos + " LONG TIMER")
// }, 10)
// // (E) IMMEDIATE
// setImmediate(() => {
// console.log(++pos + " IMMEDIATE")
// })
// // (F) MESSAGE HELLO!
// messenger.emit("message", "Hello!");
// // (G) FIRST STAT
// fs.stat(__filename, () => {
// console.log(++pos + " FIRST STAT");
// });
// // (H) LAST STAT
// fs.stat(__filename, () => {
// console.log(++pos + " LAST STAT");
// });
// // (I) LAST
// console.log(++pos + " LAST");
// The output of this program is: FIRST (A).
// MESSAGE: Hello! (F).
// LAST (I).
// NEXT (B).
// QUICK TIMER (C).
// FIRST STAT (G).
// LAST STAT (H).
// IMMEDIATE (E).
// LONG TIMER (D).
// Let's break the preceding code down:
// A, F, and I execute in the main program flow, and as such, they will have the
// first priority in the main thread. This is obvious; your JavaScript executes its
// instructions in the order they are written, including the synchronous execution of
// the emit callback.
// With the main call stack exhausted, the event loop is now almost reading to
// process I/O operations. This is the moment when nextTick requests are honored,
// slotting in at the head of the event queue. This is when B is displayed.
// The rest of the order should be clear. Timers and I/O operations will be
// processed next, (C, G, H) followed by the results of the setImmediate callback (E),
// always arriving after any I/O and timer responses are executed.
// Finally, the long timeout (D) arrives, being a relatively far-future event.
// Note that reordering the expressions in this program will not change the output
// order outside of possible reordering of the STAT results, which only implies that
// they have been returned from the thread pool in a different order, remaining as a
// group in the correct order as related to the event queue.