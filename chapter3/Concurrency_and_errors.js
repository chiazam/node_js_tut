// Members of the Node community develop new packages and projects every day.
// Because of Node's evented nature, callbacks permeate these codebases. We've
// considered several of the key ways in which events might be queued, dispatched,
// and handled through the use of callbacks. Let's spend a little time outlining the
// best practices, in particular, about conventions for designing callbacks and
// handling errors, and discuss some useful patterns when designing complex
// chains of events and callbacks. In particular, let's look at the new Promise,
// Generator, and async/await patterns that you will see in this book, and other
// examples of modern Node code.