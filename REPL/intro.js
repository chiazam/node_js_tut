// Node's REPL (Read-Eval-Print-Loop) represents the Node shell. To enter the
// shell prompt, enter Node via your terminal without passing a filename: $ node
// You now have access to a running Node process, and may pass JavaScript
// commands to this process. Additionally, if you enter an expression, the REPL
// will echo back the value of the expression. As a simple example of this, you can
// use the REPL as a pocket calculator: $ node
// > 2+2
// 4
// Enter the 2+2 expression, and Node will echo back the value of the expression, 4.
// Going beyond simple number literals, you can use this behavior to query, set,
// and again, query the values of variables: > a
// ReferenceError: a is not defined
// at repl:1:1
// at sigintHandlersWrap (vm.js:22:35)
// at sigintHandlersWrap (vm.js:96:12)
// at ContextifyScript.Script.runInThisContext (vm.js:21:12)
// at REPLServer.defaultEval (repl.js:346:29)
// at bound (domain.js:280:14)
// at REPLServer.runBound [as eval] (domain.js:293:12)
// at REPLServer.<anonymous> (repl.js:545:10)
// at emitOne (events.js:101:20)
// at REPLServer.emit (events.js:188:7)
// > a = 7
// 7
// > a
// 7
// Node's REPL is an excellent place to try out, debug, test, or otherwise play with
// JavaScript code.
// As the REPL is a native object, programs can also use instances as a context in