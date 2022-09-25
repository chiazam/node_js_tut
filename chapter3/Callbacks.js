// Luckily, Node creators agreed upon sane conventions on how to structure
// callbacks early on. It is important to follow this tradition. Deviation leads to
// surprises, sometimes very bad surprises, and in general, to do so automatically
// makes an API awkward, a characteristic other developers will rapidly tire of.
// One is either returning a function result by executing a callback, handling the
// arguments received by a callback, or designing the signature for a callback within
// your API. Whichever situation is being considered, one should follow the
// convention relevant to that case.
// The first argument returned to a callback function is any error
// message, preferably in the form of an error object. If no error is to
// be reported, this slot should contain a null value.
// When passing a callback to a function, it should be assigned the last slot of the
// function signature. APIs should be consistently designed this way.
// Any number of arguments may exist between the error and the callback slots.
// To create an error object: 

new Error("Argument must be a String!")