// Remember that in JavaScript, an object and an array are very similar under the
// hood (resulting in strange rules that provide no end of material for those poking
// fun at the language!). We won't be discussing those differences, only the
// important similarities, specifically in terms of how both these data constructs
// benefit from similar optimization techniques.
// Avoid mixing types in arrays. It is always better to have a consistent data type,
// such as all integers or all strings. As well, avoid changing types in arrays, or in
// property assignments after initialization if possible. V8 creates blueprints of
// objects by creating hidden classes to track types, and when those types change
// the optimization, blueprints will be destroyed and rebuilt—if you're lucky. 
//Visit https://github.com/v8/v8/wiki/Design%20Elements for more information.
// Don't create arrays with gaps, such as the following: 

let a = [];
a[2] = 'foo';
a[23] = 'bar';
// Sparse arrays are bad for this reason: V8 can either use a very efficient linear
// storage strategy to store (and access) your array data, or it can use a hash table
// (which is much slower). If your array is sparse, V8 must choose the least
// efficient of the two. For the same reason, always start your arrays at the zero
// index. As well, do not ever use delete to remove elements from an array. You are
// simply inserting an undefined value at that position, which is just another way of
// creating a sparse array. Similarly, be careful about populating an array with
// empty values—ensure that the external data you are pushing into an array is not
// incomplete.
// Try not to preallocate large arrays—grow as you go. Similarly, do not preallocate
// an array and then exceed that size. You always want to avoid spooking V8 into
// turning your array into a hash table. V8 creates a new hidden class whenever a
// new property is added to an object constructor. Try to avoid adding properties
// after an object is instantiated. Initialize all members in constructor functions in
// the same order. Same properties + same order = same object.
// Remember that JavaScript is a dynamic language that allows object (and object
// prototype) modifications after instantiation. Since the shape and volume of an
// object can, therefore, be altered after the fact, how does V8 allocate memory for
// objects? It makes some reasonable assumptions. After a set number of objects
// are instantiated from a given constructor (I believe 8 is the trigger amount), the
// largest of these is assumed to be of the maximum size, and all further instances
// are allocated that amount of memory (and the initial objects are similarly
// resized). A total of 32 fast property slots, inclusive, are then allocated to each
// instance based on this assumed maximum size. Any extra properties are slotted
// into a (slower) overflow property array, which can be resized to accommodate
// any further new properties.
// With objects, as with arrays, try to define as much as possible the shape of your
// data structures in a futureproof manner, with a set number of properties, of types,
// and so on.