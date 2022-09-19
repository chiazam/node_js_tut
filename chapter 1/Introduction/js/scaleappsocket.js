// Node supports standard network protocols in addition to HTTP, such as
// TLS/SSL, and UDP. With these tools we can easily build scalable network
// programs, moving far beyond the comparatively limited AJAX solutions
// JavaScript developers know from the browser.
// Let's write a simple program that sends a UDP packet to another node: const
dgram = require('dgram');
let client = dgram.createSocket("udp4");
let server = dgram.createSocket("udp4");
let message = process.argv[2] || "message";
message = Buffer.from(message);
server
.on('message', msg => {
process.stdout.write(`Got message: ${msg}\n`);
process.exit();
})
.bind(41234);
client.send(message, 0, message.length, 41234, "localhost");
// Go ahead and open two terminal windows and navigate each to your code
// bundle for Chapter 8, Scaling Your Application, under the /udp folder. We're now
// going to run a UDP server in one window, and a UDP client in another.
// In the right window, run receive.js with a command like the following: $ node
// receive.js
// On the left, run send.js with a command, as follows: $ node send.js
// Executing that command will cause the message to appear on the right: $ node
// receive.js
// Message received!
// A UDP server is an instance of EventEmitter, emitting a message event when
// messages are received on the bound port. With Node, you can use JavaScript to
// write your application at the I/O level, moving packets and streams of binary
// data with ease.
// Let's continue to explore I/O, the process object, and events. First, let's dig into
// the machine powering Node's core, V8.