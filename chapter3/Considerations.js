// Any developer is regularly making decisions with a far-reaching impact. It is
// very hard to predict all the possible consequences resulting from a new bit of
// code, or a new design theory. For this reason, it may be useful to keep the shape
// of your code simple, and to force yourself to consistently follow the common
// practices of other Node developers. These are some guidelines you may find
// useful, as follows:
// Generally, try to aim for shallow code. This type of refactoring is
// uncommon in non-evented environments. Remind yourself of it by
// regularly re-evaluating entry and exit points, and shared functions.
// Consider building your systems using distinct, composable microservices,
// which we'll discuss in Chapter 9, Microservices.
// Where possible, provide a common context for callback re-entry. Closures
// are very powerful tools in JavaScript, and by extension, Node, as long as
// the context frame length of the enclosed callbacks is not excessive.
// Name your functions. In addition to being useful in deeply recursive
// constructs, debugging code is much easier when a stack trace contains
// distinct function names, as opposed to anonymous.
// Think hard about priorities. Does the order, in which a given result arrives
// or a callback is executed, actually matter? More importantly, does it matter
// in relation to I/O operations? If so, consider nextTick and setImmediate.
// Consider using finite state machines for managing your events. State
// machines are surprisingly under-represented in JavaScript codebases. When
// a callback re-enters program flow, it has likely changed the state of your
// application, and the issuing of the asynchronous call itself is a likely
// indicator that state is about to change.