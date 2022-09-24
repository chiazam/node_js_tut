// Timers are used to schedule events in the future. They are used when one seeks
// to delay the execution of some block of code until a specified number of
// milliseconds have passed, to schedule periodic execution of a particular function,
// and so on.
// JavaScript provides two asynchronous timers: setInterval() and setTimeout(). It is
// assumed that the reader is fully aware of how to set (and cancel) these timers, so
// very little time will be spent discussing the syntax. We'll instead focus more on
// gotchas and less well-known details about timeouts and intervals.
// The key takeaway will be this: when using timers, one should make no
// assumptions about the amount of actual time that will expire before the callback
// registered for this timer fires, or about the ordering of callbacks. Node timers are
// not interrupts. Timers simply promise to execute as close as possible to the
// specified time (though never before), beholden, as with every other event source,
// to event loop scheduling.
// At least one thing you may not know about timers-we are all
// familiar with the standard arguments to setTimeout: a callback
// function and timeout interval. Did you know that many additional
// arguments are passed to the callback function? 

setTimeout(callback,
time, [passArg1, passArg2…])