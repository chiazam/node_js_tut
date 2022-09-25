// Like some politicians, the Node core was against Promises before it was for
// them. Mikeal Rogers, in discussing why Promises were removed from the
// original Node core, makes a strong argument for why leaving feature
// development to the community leads to a stronger core product. You can view
// this discussion at: https://web.archive.org/posts/broken-promises.html
// Promises have gained a very large following since then, and Node core has
// changed in response. Promises are essentially a replacement for the standard
// callback pattern seen everywhere in Node. Once, you might have written this:

API.getUser(loginInfo, function(err, user) {
API.getProfile(user, function(err, profile) {
// ...and so on
}
});

// If API was instead "Promisified" (recall util.promisify from the previous
// chapter?), your description of the preceding asynchronous control flow would be
// described using a Promise chain: 

let promiseProfile = API.getUser(loginInfo)
.then(user => API.getProfile(user))
.then(profile => {
// do something with #profile
})
.catch(err => console.log(err))

// This is at least a tighter syntax that reads a little more easily, with long chains of
// operations; however, there is much more going on here that is of value.
// promiseProfile references a Promise object. Promises only execute once, reaching
// either an error state (unfulfilled) or fulfilled state, where you can extract the last,
// immutable value via then, as we did with profile, previously. Of course, Promises
// can be assigned to a variable, and that variable can be passed around to as many
// consumers as you'd like, even prior to resolving. Since then is only called when
// there is a value available, whenever that may be, Promises are aptly named as
// promises of a future state.
// Perhaps most importantly, Promises, unlike callbacks, are able to manage errors
// across many asynchronous actions. If you go back and look at the example
// callback code at the head of this section, you'll see err parameters in each
// callback, reflecting the core error-first callback style of Node. Each of those
// error objects must be handled individually, so the preceding code would actually
// start to look more like this: 

API.getUser(loginInfo, function(err, user) {
if(err) {
throw err;
}
API.getProfile(user, function(err, profile) {
if(err) {
throw err;
}
// ...and so on
}
});

// Observe how each error condition must be handled individually. In practice,
// developers would like to be responsible for "hand-rolling" a wrapper around this
// code, such as a try...catch block, which would, in some way, catch all errors in
// this logical unit and manage them in a centralized way.
// With Promises, you get that for free. Any catch statement will catch any errors
// thrown by any then prior to it in the chain. This makes creating a common error
// handler a snap. Even more, Promises allows the execution chain to continue past
// an error. You can add the following to the previous Promise chain: 

.catch(err =>
console.log(err))
.then(() => // this happens no matter what happened previously)

// In this way, Promises allows you to compose rather complex, asynchronous,
// logical flows in much less space, with limited indentation, where error handling
// is much easier to work with and values are immutable and exchangeable.
// Another extremely useful feature of the Promise object is that these futureresolving states can be managed as a block. For instance, imagine that to fulfill a
// query for a user profile, you needed to make three database calls. Rather than
// chaining these calls which always run serially, one at a time in order, you might
// use 
Promise.all: const db = {
getFullName: Promise.resolve('Jack Spratt'),
getAddress: Promise.resolve('10 Clean Street'),
getFavorites: Promise.resolve('Lean'),
};
Promise.all([
db.getFullName()
db.getAddress()
db.getFavorites()
])
.then(results => {
// results = ['Jack Spratt', '10 Clean Stree', 'Lean']
})
.catch(err => {...})

// Here, all three of the Promises will be triggered simultaneously, and will run in
// parallel. Running calls in parallel is, of course, much more efficient than running
// them serially. Also, Promise.all guarantees that the final thennable receives an
// array of results ordered to synchronize result position with caller position.
// It would be good for you to familiarize yourself with the full Promise API,
// which you can read about at MDN: https://developer.mozilla.org/en-US/docs/Web/JavaS
// cript/Reference/Global_Objects/Promise
// Even though Promises are now native, there remains a "userland" module,
// bluebird, which continues to offer a compelling alternative Promises
// implementation, with added features and oftentimes faster execution speed. You
// can read more about bluebird here: http://bluebirdjs.com/docs/api-reference.html.