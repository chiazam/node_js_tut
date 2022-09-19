// In fact, a new method util.promisify was recently added to Node's core, which
// converts a callback-based function to a Promise-based one: 

const {promisify} = require('util');
const fs = require('fs');
// Promisification happens here
let readFileAsync = promisify(fs.readFile);
let [executable, absPath, target, ...message] = process.argv;
console.log(message.length ? message.join(' ') : `Running file ${absPath} using
binary ${executable}`);
readFileAsync(target, {encoding: 'utf8'})
.then(console.log)
.catch(err => {
let message = err.message;
console.log(`
An error occurred!
Read error: ${message}
`);
});
// Being able to easily promisify fs.readFile is very useful.
// Did you notice any other new JavaScript constructs possibly unfamiliar to you?