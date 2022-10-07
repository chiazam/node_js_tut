// Programming with events is not always easy. The control and context switches,
// defining the paradigm, often confound those new to evented systems. This
// seemingly reckless loss of control and the resulting complexity drives many
// developers away from these ideas. Students in introductory programming
// courses normally develop a mindset in which program flow can be dictated,
// where a program whose execution flow does not proceed sequentially from A to
// B can bend understanding.
// By examining the evolution of the architectural problems, Node is now
// attempting to solve for network applications—in terms of scaling and code
// organization, in general terms of data and complexity volume, in terms of state
// awareness, and in terms of well-defined data and process boundaries. We learned
// how managing these event queues can be done intelligently. We saw how
// different event sources are predictably stacked for an event loop to process, and
// how far-future events can enter and reenter contexts using closures and smart
// callback ordering. We also learned about the newer Promise, Generator, and
// async/await structures designed to help with managing concurrency.
// We now have a basic domain understanding of the design and characteristics of
// Node, in particular, how evented programming is done using it. Let's now move
// on to larger, more advanced applications of this knowledge