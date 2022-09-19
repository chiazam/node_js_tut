// Node's process object provides information on and control over the current
// running process. It is an instance of EventEmitter is accessible from any scope, and
// exposes very useful low-level pointers. Consider the following program: 

const size = process.argv[2];
const n = process.argv[3] || 100;
const buffers = [];
let i;
for (i = 0; i < n; i++) {
buffers.push(Buffer.alloc(size));
process.stdout.write(process.memoryUsage().heapTotal + "\n");
}
// Have Node run process.js with a command like this: $ node process.js 1000000
100
// The program gets the command-line arguments from process.argv, loops to
// allocate memory, and reports memory usage back to standard out. Instead of
// logging back to the terminal, you could stream output to another process, or a
// file: $ node process.js 1000000 100 > output.txt