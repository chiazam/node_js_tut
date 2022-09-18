// C is a systems language, and it is a safe and powerful shorthand alternative
//  for developers familiar with keying in assembly instructions.
// Given its familiar setting of a microprocessor, C makes low-level system tasks easy. 
// For instance, you can search a block of memory for a byte of a specific value.

int find_byte(const char *buffer, int size, const char b) {

for (int i = 0; i < size; i++) {

if (buffer[i] == b) {

return i;

}

}

return -1;