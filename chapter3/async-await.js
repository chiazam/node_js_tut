// Rather than wrap fulfillment in a specialized data structure like a Promise with
// so many function blocks and parentheses and special contexts, why not simply
// make it so that asynchronous expressions can have their cake and eat it, too?
// These expressions do not block the process (asynchronous execution), but they
// nevertheless halt further execution of a program (synchronous) until resolved.
// The await operator is used to wait for a Promise. It only executes within an async
// function. The async/await concurrency modeling syntax has been available since
// Node 8.x. Here's a demonstration of async/await being used to replicate the
// preceding Promise.all example:
const db = {
getFullName: Promise.resolve('Jack Spratt'),
getAddress: Promise.resolve('10 Clean Street'),
getFavorites: Promise.resolve('Lean'),
}
async function profile() {
let fullName = await db.getFullName() // Jack Spratt
let address = await db.getAddress() // 10 Clean Street
let favorites = await db.getFavorites() // Lean
return {fullName, address, favorites};
}
profile().then(res => console.log(res) // results = ['Jack Spratt', '10 Clean Street', 'Lean'

// Nice, right? You'll note that profile() returned a Promise. An async function
// always returns a Promise, though as we see here, the function itself can return
// anything it would like.
// Promises and async/await work together like old pals. Here is a recursive directory
// walker that demonstrates this teamwork: 

const {join} = require('path');
const {promisify} = require('util');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
async function $readDir (dir, acc = []) {
await Promise.all((await readdir(dir)).map(async file => {
file = join(dir, file);
return (await stat(file)).isDirectory() && acc.push(file) && $readDir(file, acc);
}));
return acc;
}
$readDir(`./dummy_filesystem`).then(dirInfo => console.log(dirInfo));
// [ 'dummy_filesystem/folderA',
// 'dummy_filesystem/folderB',
// 'dummy_filesystem/folderA/folderA-C' ]
// It's a testament to how terse the code is for this recursive directory walker, that it
// is only slightly longer than the setup code above it. Since await expects a
// Promise, which Promise.all will return, run through every file that the readDir
// Promise returns, and map each file to another awaited Promise that will handle
// any recursive descent into subdirectories, updating the accumulator where
// appropriate. Read like this, the 

Promise.all((await readdir(dir)).map 

// construct reads
// not unlike a basic looping construct, where deep asynchronous recursion is being
// modelled in a simple and easy-to-follow procedural, synchronous way.
// A pure Promise drop-in replacement version might look like this, assuming the
// same dependencies as the async/await version: 

function $readDir(dir, acc=[]) {
return readdir(dir).then(files => Promise.all(files.map(file => {
file = join(dir, file);
return stat(file).then(fobj => {
if (fobj.isDirectory()) {
acc.push(file);
return $readDir(file, acc);
}
});
}))).then(() => acc);
};

// Both versions are cleaner than what you would have with callbacks. The
// async/await version does take the best of both worlds, and creates a succinct
// representation resembling synchronous code, making it perhaps easier to follow
// and reason about.
// Error handling with async/await is also quite easy, as it requires no special new
// syntax. With Promises and catch, there is a slight problem with synchronous code
// errors. Promises catch errors that occur in then blocks. If, for example, a thirdparty library your code is calling throws, that code is not wrapped by the
// Promise and that error will not be caught by catch.
// With async/await, you can use the familiar try...catch statement: 

async function
makeError() {
try {
console.log(await thisDoesntExist());
} catch (error) {
console.error(error);
}
}
makeError();

// This avoids all problems with special error-catching constructs. This native,
// rock-solid method will catch anything that throws anywhere in the try block,
// regardless of whether execution is synchronous or not.