// Secondly, let's attempt the reverse: from the find-byte.c code prior,
//  let's write js code Before Node, it was not possible to use JavaScript to search a block of memory for a specific byte. 
// In the browser, JavaScript can't allocate a buffer, and doesn't even have a type for byte. But with Node, it's both possible and easy

function find_byte(buffer, b) {
    let i;
    for (i = 0; i < buffer.length; i++) {
    if (buffer[i] == b) {
    return i;
    }
    }
    return -1; // Not found
    }
    
    let buffer = Buffer.from("ascii A is byte value sixty-five", "utf8");
let r = find_byte(buffer, 65); // Find the first byte with value 65
console.log(r); // 6 bytes into the buffer
