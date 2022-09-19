// A fundamental part of Node's design is to create or fork processes when
// parallelizing execution or scaling a system, as opposed to creating a thread pool,
// for instance. We will be using these child processes in various ways throughout
// this book. Right now, the focus will be on understanding how to handle
// communication events between child processes.
// To create a child process, require Node's child_process module, and call the fork
// method. Pass the name of the program file the new process should execute:

let cp = require("child_process");
let child = cp.fork(__dirname + "/lovechild.js");

// You can keep any number of subprocesses running with this method. On
// multicore machines, the operating system will distribute forked processes across
// the available hardware cores. Spreading Node processes across cores, even onto
// other machines, and managing IPC is one way to scale a Node application in a
// stable, understandable, and predictable way.
// Extending the preceding example, we can now have the forking process (parent)
// send, and listen for, messages from the forked process (child). Here's the code for
// parent.js:

// The following is the output for parent.js:
// $ node parent.js
// Parent said: I love you
// Child said: I love you too
// (then Ctrl+C to terminate both processes)
// Alongside that file, make another one and name it lovechild.js. The code of the
// child in here can listen for messages and send them back up:
// lovechild.js
// Don't run lovechild.js yourself; --parent.js will do that for you with fork!
// Running parent.js should fork a child process and send that child a message. The
// child should respond in kind:
// Parent said: I love you
// Child said: I love you too
// With parent.js running, check your operating system's task manager. There will
// be two Node processes, not one, as there were with preceeding examples.
// Another very powerful idea is to pass a network server an object to a child. This
// technique allows multiple processes, including the parent, to share the
// responsibility for servicing connection requests, spreading load across cores.
// For example, the following program will start a network server, fork a child
// process, and pass the server reference from the parent down to the child:
// net-parent.js

// In addition to passing a message to a child process as the first argument to send,
// the preceding code also sends the server handle to itself as a second argument.
// Our child server can now help out with the family's service business:
// net-child.js

// This child process should print out the sent message to your console, and begin
// listening for connections, sharing the sent server handle.
// Repeatedly connecting to this server at localhost:8080 will result in either childhandled connection or parent-handled connection being displayed; two separate
// processes are balancing the server load. This technique, when combined with the
// simple inter-process messaging protocol discussed previously, demonstrates how
// Ryan Dahl's creation succeeds in providing an easy way to build scalable
// network programs.
