// Deferred execution
// One occasionally needs to defer the execution of a function. Traditional
// JavaScript uses timers for this purpose, with the well-known setTimeout and
// setInterval functions. Node introduces another perspective on defers, primarily as
// means of controlling the order in which a callback executes in relation to I/O
// events, as well as timer events properly.
// As we saw earlier, managing timers is one of the main jobs of Node's event loop.
// Two types of deferred event sources that give a developer the ability to schedule
// callback executions to occur either before, or after, the processing of queued I/O
// events are process.nextTick and setImmediate. Let's look at those now.