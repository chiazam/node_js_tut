// Simplifying control flows has been a concern of the Node community since the
// very beginning of the project. Indeed, this potential criticism was one of the very
// first anticipated by Ryan Dahl, who discussed it at length during the talk in
// which he introduced Node to the JavaScript developer community.
// Because deferred code execution often requires the nesting of callbacks within
// callbacks, a Node program can sometimes begin to resemble a sideways
// pyramid, also known as The Pyramid of Doom. You've seen it: deeply nested
// code, 4 or 5 or even more levels deep, curly braces everywhere. Apart from
// syntactical annoyances, you can also imagine that tracking errors across such a
// call stack might be difficult—if a callback at the third level throws, who is
// responsible for handling that error? The second level? Even if level 2 is reading
// a file and level 3 is querying a database? Does that make sense? It can be hard to
// make sense of asynchronous program flows.