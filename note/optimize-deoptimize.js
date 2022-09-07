// V8 uses 32-bit numbers for all values internally, for performance reasons that are
// too technical to discuss here. It can be said that one bit is used to point to another
// 32-bit number, should greater width be needed. Regardless, it is clear that there
// are two types of values tagged as numbers by V8, and switching between these
// types will cost you something. Try to restrict your needs to 31-bit signed
// Integers where possible.
// Because of the type ambiguity of JavaScript, switching the types of numbers
// assigned to a slot is allowed. For example, the following code does not throw an
// error: 
let a = 7;
a = 7.77;
// However, a speculative compiler like V8 will be unable to optimize this variable
// assignment, given that its guess that a will always be an Integer turned out to be
// wrong, forcing de-optimization.
// We can demonstrate the optimization/de-optimization process by setting some
// powerful V8 options, executing V8 native commands in your Node program,
// and tracing how v8 optimizes/de-optimizes your code.
// Consider the following Node program:  program.js
let someFunc = function foo(){}
console.log(%FunctionGetName(someFunc));
// If you try to run this normally, you will receive an Unexpected Token error – the
// modulo (%) symbol cannot be used within an identifier name in JavaScript.
// What is this strange method with a % prefix? It is a V8 native command, and we
// can turn on execution of these types of functions by using the --allow-natives-
// syntax flag: node --allow-natives-syntax program.js
// 'someFunc', the function name, is printed to the console.
// Now, consider the following code, which uses native functions to assert
// information about the optimization status of the square function, using the
// %OptimizeFunctionOnNextCall native method: 
let operand = 3;
function square() {
return operand * operand;
}
// Make first pass to gather type information
square();
// Ask that the next call of #square trigger an optimization attempt;
// Call
%OptimizeFunctionOnNextCall(square);
square();
// Create a file using the previous code, and execute it using the following
// command: node --allow-natives-syntax --trace_opt --trace_deopt myfile.js. You will
// see something like the following returned: [deoptimize context: c39daf14679]
// [optimizing: square / c39dafca921 - took 1.900, 0.851, 0.000 ms]
// We can see that V8 has no problem optimizing the square function, as operand is
// declared once and never changed. Now, append the following lines to your file
// and run it again: 

%OptimizeFunctionOnNextCall(square);
operand = 3.01;
square();
// On this execution, following the optimization report given earlier, you should
// now receive something like the following: **** DEOPT: square at bailout #2,
// address 0x0, frame size 8
// [deoptimizing: begin 0x2493d0fca8d9 square @2]
// ...
// [deoptimizing: end 0x2493d0fca8d9 square => node=3, pc=0x29edb8164b46,
// state=NO_REGISTERS, alignment=no padding, took 0.033 ms]
// [removing optimized code for: square]
// This very expressive optimization report tells the story very clearly: the onceoptimized square function was de-optimized following the change we made in
// one number's type. You are encouraged to spend some time writing code and
// testing it using these methods