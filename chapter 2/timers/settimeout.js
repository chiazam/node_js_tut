// Timeouts can be used to defer the execution of a function until some number of
// milliseconds into the future.
// Consider the following code: 

setTimeout(a, 1000);
setTimeout(b, 1001);
// One would expect that function b would execute after function a. However, this
// cannot be guaranteed — a may follow b, or the other way around.
// Now, consider the subtle difference present in the following code snippet:
setTimeout(a, 1000);
setTimeout(b, 1000);
// The execution order of a and b are predictable in this case. Node essentially
// maintains an object map grouping callbacks with identical timeout lengths. Isaac
// Schlueter, a former leader of the Node project and now CEO of npm Inc., puts it
// in this way: As we can find on https://groups.google.com/forum/#!msg/nodejs-dev/kiowz4
// iht4Q/T0RuSwAeJV0J, "[N]ode uses a single low level timer object for each timeout
// value. If you attach multiple callbacks for a single timeout value, they'll occur in
// order, because they're sitting in a queue. However, if they're on different timeout
// values, then they'll be using timers in different threads, and are thus subject to
// the vagaries of the [CPU] scheduler."
// The ordering of timer callbacks registered within an identical execution scope
// does not predictably determine the eventual execution order in all cases.
// Additionally, there exists a minimum wait time of one millisecond for a timeout.
// Passing a value of zero, -1, or a non-number will be translated into this minimum
// value.
// To cancel a timeout, use 

clearTimeout(timerReference)

{/* <span xmlns="http://www.w3.org/1999/xhtml" class="koboSpan"
id="kobo.5.1">let intervalId = setInterval(() => { ... </span><span
xmlns="http://www.w3.org/1999/xhtml" class="koboSpan"
id="kobo.5.2">}, 100);</span>
Every 100 milliseconds the sent callback function will execute, a
process that can be cancelled with */}

clearInterval(intervalReference)

// Unfortunately, as with setTimeout, this behavior is not always
// reliable. Importantly, if a system delay (such as some badly written
// blocking while loop) occupies the event loop for some period of time,
// intervals set prior and completing within that interim will have their
// results queued on the stack. When the event loop becomes unblocked
// and unwinds, all the interval callbacks will be fired in sequence,
// essentially immediately, losing any sort of timing delays they
// intended.
// Luckily, unlike browser-based JavaScript, intervals are rather more
// reliable in Node, generally able to maintain expected periodicity in
// normal use scenarios.