// Node brought EventEmitter to JavaScript and made it an object your objects can
// extend. This greatly increases the possibilities available to developers. With
// EventEmitter, Node can handle I/O data streams in an event-oriented manner,
// performing long-running tasks while keeping true to Node's principles of
// asynchronous, non-blocking programming: File stream.js
// Use Node's stream module, and get Readable inside
let Readable = require('stream').Readable;
// Make our own readable stream, named r
let r = new Readable;
// Start the count at 0
let count = 0;
// Downstream code will call r's _read function when it wants some data from r
r._read = function() {
count++;
if (count > 10) { // After our count has grown beyond 10
return r.push(null); // Push null downstream to signal we've got no more data
}
setTimeout(() => r.push(count + '\n'), 500); // A half second from now, push our
// count on a line
};
// Have our readable send the data it produces to standard out
r.pipe(process.stdout);
// This example creates a readable stream r, and pipes its output to the standard
// out. Every 500 milliseconds, code increments a counter and pushes a line of text
// with the current count downstream. Try running the program yourself, and you'll
// see the series of numbers appear on your terminal.
// On what would be the 11
// th count, r pushes null downstream, indicating that it
// has no more data to send. This closes the stream, and with nothing more to do,
// Node exits the process.
