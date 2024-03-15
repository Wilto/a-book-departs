As of [a few days ago], Interaction to Next Paint (INP) replaced First Input Delay (FID) as a [Core Web Vital](#) metric. 

FID and INP are measuring the same situation in the browser: the delay between a user interacting with an element on the page and the page responding to that interaction. The good news for the web—and users—is that INP is a way better representation of real-world performance. The good news for _you_ is that having a solid FID will get you most of the way to a solid INP. 

Like so many aspects of front-end performance, the key to understanding both is JavaScript’s main thread. You might have heard JavaScript described as “single-threaded” in the past, and while that’s not _strictly_ true since the advent of [Web Workers](#), it’s still a useful way to describe JavaScript’s synchronous execution model: within a given “realm”—like a web worker, an `iframe`, or the browser tab—only one [task](https://web.dev/articles/optimize-long-tasks) can be executed at a time. In the context of a browser tab, this sequential execution context is called the “main thread, and it’s shared by other browser tasks—parsing HTML, rendering and re-rendering parts of the page, running CSS animations, and handling user interactions. 

JavaScript manages “execution contexts”—the code currently being executed—using a last-in-first-out list called the “call stack” (or just “the stack”). When a script starts up, the JavaScript interpreter creates a “global execution context”—a playlist item, of a sort, that represents the execution of the script outside of any function calls. That global execution context is pushed to the call stack, where it gets executed top-to-bottom, as you might expect. When the interpreter encounters a function call during the execution of the global context, it creates a “function execution context” for that function call, pushes it onto the top of the stack, pauses the global execution context, and executes the function execution context. If that function call contains a function call, a new function execution context is created, pushed to the top of the stack, and executed right away. The highest execution context in the stack is always the current one being executed, and when that concludes, it gets popped off the stack so the new highest execution context can resume. Eventually execution ends up back down at the global execution context, and either the global context concludes and the call stack is empty, or another function call is encountered and execution works its way through that and any function calls that call contains, one at a time. Turtles all the way down.

Now, if that were the end of the story, a function that performs any kind of asynchronous task—say, fetching data from a server, or firing an event handler’s callback function—would be a performance disaster, either blocking the main thread until that task completes and the associated callback function kicks off, or interrupting whatever function context the call stack happened to be working through when that task completed. So alongside the stack, JavaScript makes use of an event-driven “concurrency model” made up of the “event loop” and “callback queue” (or “message queue”). 

When an asynchronous task is completed, and its callback function is called, the execution context for the callback function is placed in a callback queue instead of at the top of the call stack—it doesn’t take over execution immediately.

Sitting between the callback queue and the call stack is the event loop, which is constantly polling for items in. If there are tasks in a callback queue and the event loop determines that the call stack is empty, those callback function calls are pushed to the top of the call stack. 

So, for example, say we have a script that uses an old-fashioned `setTimeout` to log something to the console after 1000 milliseconds:

```javascript
setTimeout( function myCallback() {
	console.log( "Done." );
}, 1000 );

// Output: Done.
```

When this script runs, a global execution context is created and executed. The global execution context calls the `setTimeout` method, so a function execution context for the `setTimeout` is created at the top of the call stack. That takes over the main thread and the timer starts ticking. The `myCallback` function isn’t added to the stack, however, since it hasn’t been called yet. Since there’s nothing else for the `setTimeout` to do, it gets popped off the stack, and the global execution context resumes.

Now, at any point during this sequence of events our timer could elapse, calling `myCallback`. Instead of being added to the stack and interrupting whatever else was being executed, that callback function is added to a callback queue. Waiting for the event loop to push the execution context for `myCallback` to the stack to be executed.


```javascript
const rightNow = new Date().getTime();

setTimeout( () => {
	console.log( `The callback function was executed after ${ new Date().getTime() - rightNow }` );
}, 1000);

// Output: The callback function was executed after 1004 milliseconds.
```

The main thread is done working long before the timer elapses, our callback function is added to the empty call stack right away. Without anything else to do on the main thread, our callback fires right on time—give or take a few milliseconds.

A complex JavaScript application could have tens of thousands of function execution contexts for the main thread to power through before reaching the end of the global execution context—and as fast as browsers are, these things take time. So, let’s fake an overcrowded main thread by keeping the global execution context busy with a `while` loop that counts to a brisk fifteen million.

```JavaScript
const rightNow = new Date().getTime();
let i = 0;

setTimeout( function myCallback() {
  console.log( `The callback function was executed after ${ new Date().getTime() - rightNow } milliseconds.`);
}, 1000);

while( i < 15000000 ) {
  i++;
}
// Output: The callback function was executed after 1608 milliseconds.
```

Counting to a high number isn’t exactly the heaviest lift for a modern browser running on, in my case, a relatively modern laptop—but in front-end performance terms there’s still a huge difference in the result.

Now, we’ve been using `setTimeout` for the sake of predictability, but event handlers work the same way: upon encountering an event handler in either the global or a function execution context, the event becomes bound, but the callback function associated with that event listener isn’t added to the call stack. Just like waiting for a `setTimeout` to elapse, that callback function hasn’t been called yet—not until the event fires. Once the event _does_ fire, that callback function is added to the callback queue.

```javascript
const myButton = document.querySelector( "button" );

myButton.addEventListener( "click", () => {
 console.log( "Clicked!" );
});
// https://codepen.io/Wilto/pen/YzMpXXx
```

So what happens if the main thread is bogged down, either with our one big slow `while` loop, or—in more realistic terms—several megabytes’ worth of function calls within function calls within function calls?

```JavaScript 
// I don’t think I can do this in a CodePen, can I?
const myButton = document.querySelector( "button" );
let i = 0;

myButton.addEventListener( "click", () => {
 console.log( "Clicked!" );
});

while( i < 15000000 ) {
  i++;
}
```

The same thing we saw when our `setTimeout` elapsed: a big delay. If a user clicks on this `button` element right away, the callback functions execution context is created and added to the callback queue, but it can’t get moved to the stack until the stack is empty.

That’s First Input Delay: the time between the firing of an event handler, and the start of the callback function’s execution. A slow page, bogged down by parsing and executing tons of JavaScript just to get rendered and functional won’t have room in the call stack for event handler callbacks to get queued up right away, and you end up with a delay between a user interaction and the callback function being invoked. A few hundred milliseconds may not seem like much on paper, but any delay between a user interaction and the result of that interaction means a _huge_ difference in perceived performance—ask anyone that played too much Nintendo as a kid. There’s no disputing that FID was an important metric. That’s why it hasn’t really _gone away_, just gotten wrapped up into the much more holistic Interaction to Next Paint.

INP captures the time between a user interaction and an event handler firing, plus the time spent _executing_ the event handler, plus time spent rendering the end result on the page.



