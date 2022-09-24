// setImmediate is technically a member of the class of timers, along with setInterval
// and setTimeout . However, there is no sense of time associated with it — there is
// no number of milliseconds to wait for an argument to be sent.
// This method is really more of a sibling to process.nextTick, differing in one very
// important way: while callbacks queued by nextTick will execute before I/O and
// timer events, callbacks queued by setImmediate will be called after I/O events.
// The naming of these two methods is confusing: Node will actually
// run the function you give to nextTick before the one you pass to
// setImmediate.
// This method does reflect the standard behavior of timers in that its invocation
// will return an object that can be passed to clearImmediate, cancelling your request
// to run your function later on in the same way clearTimeout cancels timers set with
// setTimeout.