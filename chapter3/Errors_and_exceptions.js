// Generally in programming, the terms error and exception are often used
// interchangeably. Within the Node environment, these two concepts are not
// identical. Errors and exceptions are different. Additionally, the definition of error
// and exception within Node does not necessarily align with similar definitions in
// other languages and development environments.
// Conventionally, an error condition in a Node program is a non-fatal condition
// that should be caught and handled, seen most explicitly in the Error as first
// argument convention displayed by the typical Node callback pattern. An
// exception is a serious error (a system error) that a sane environment should not
// ignore or try to handle.
// One comes across four common error contexts in Node, and should respond
// predictably:
// A synchronous context: This will normally happen in the context of a
// function, where a bad call signature or another non-fatal error is detected.
// The function should simply return an error object; new Error(…), or some
// other consistent indicator that the function call has failed.
// An asynchronous context: When expected to respond by firing a callback
// function, the execution context should pass an Error object, with appropriate
// message, as the first argument to that callback.
// An event context: Quoting the Node documentation: "When an EventEmitter
// instance experiences an error, the typical action is to emit an error event.
// Error events are treated as a special case in node. If there is no listener for
// it, then the default action is to print a stack trace and exit the program."
// Use events where events are expected.
// A Promise context: A Promise throws or is otherwise rejected, and this
// error is caught within a .catch block. Important note: you should always
// reject Promises with true Error objects. Petka Antonov, author of the popular
// Bluebird Promises implementation, discusses why: https://github.com/petkaant
// onov/bluebird/blob/master/docs/docs/warning-explanations.md
// Clearly, these are situations where an error is caught in a controlled manner,
// prior to it destabilizing the entire application. Without falling too far into
// defensive coding, an effort should be made to check inputs and other sources for
// errors, and properly dismiss them.
// An additional benefit of always returning a proper Error object is access to the
// stack property of that object. The error stack shows the provenance of an error,
// each link in the chain of function, and calls the function that led to the error. A
// typical Error.stack trace would look like this: > 
console.log(new Error("My ErrorMessage").stack);
// Error: My Error Message
// at Object.<anonymous> (/js/errorstack.js:1:75)
// at Module._compile (module.js:449:26)
// at Object.Module._extensions..js (module.js:467:10)
// ...
// Similarly, the stack is always available via the console.trace method: >
// console.trace("The Stack Head")
// Trace: The Stack Head
// at Object.<anonymous> (/js/stackhead.js:1:71)
// at Module._compile (module.js:449:26)
// at Object.Module._extensions..js (module.js:467:10)
// ...
// It should be clear how this information aids in debugging, helping to ensure that
// the logical flow of our application is sound.
// A normal stack trace truncates after a dozen or so levels. If longer
// stack traces are useful to you, try Matt Insler's longjohn: https://git
// hub.com/mattinsler/longjohn
// As well, run and examine the js/stacktrace.js file in your bundle for
// some ideas on how stack information might be used when reporting
// errors, or even test results.
// Exception handling is different. Exceptions are unexpected or fatal errors that
// have destabilized the application. These should be handled with care; a system in
// an exception state is unstable, with indeterminate future states, and should be
// gracefully shut down and restarted. This is the smart thing to do.
// Typically, exceptions are caught in try/catch blocks: 

try {
something.that = wontWork;
} catch (thrownError) {
// do something with the exception we just caught
}
// Peppering a codebase with try/catch blocks and trying to anticipate all errors can
// become unmanageable and unwieldy. Additionally, what if an exception you
// didn't anticipate, an uncaught exception, occurs? How do you pick up from
// where you left off?
// Node does not have a standard built-in way to handle uncaught critical
// exceptions. This is a weakness of the platform. An exception that is uncaught
// will continue to bubble up through the execution stack until it hits the event loop
// where, like a wrench in the gears of a machine, it will take down the entire
// process. The best we have is to attach an uncaughtException handler to the process
itself: process.on('uncaughtException', (err) => {
console.log('Caught exception: ' + err);
});
setTimeout(() => {
console.log("The exception was caught and this can run.");
}, 1000);
throwAnUncaughtException();
// > Caught exception: ReferenceError: throwAnUncaughtException is not
defined
// > The exception was caught and this can run.
// While nothing that follows our exception code will execute, the timeout will still
// fire, as the process managed to catch the exception, saving itself. However, this
// is a very clumsy way of handling exceptions. The domain module aimed to fix this
// hole in Node's design, but it has since been deprecated. Properly handling and
// reporting errors remains a real weakness in the Node platform. Work continues
// by the core team to address this problem: https://nodejs.org/en/docs/guides/domain-po
// stmortem/
// Recently, a similar mechanism was introduced to catch runaway Promises,
// which occur when you do not attach a catch handler to your Promise chain:
process.on('unhandledRejection', (reason, Prom) => {
console.log(`Unhandled Rejection: ${p} reason: ${reason}`);
});
// The unhandledRejection handler is fired whenever a Promise is rejected and no error
// handler is attached to the Promise within one turn of the event loop.