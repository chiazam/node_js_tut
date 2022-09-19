// As an exercise, re-implement stream.js to send the data r produces to a file
// instead of the terminal. You'll need to make a new writable stream w, using
// Node's fs.createWriteStream: File stream2.js
// Bring in Node's file system module
const fs = require('fs');
// Make the file counter.txt we can fill by writing data to writeable stream w
const w = fs.createWriteStream('./counter.txt', { flags: 'w', mode: 0666 });
// ...
// Put w beneath r instead
r.pipe(w);