---
title: Loops
headerImage: image/8.png
chapterNumber: 4
tocOrder: 5
---
LOOPS ALLOW US to repeat lines of code until a certain set of conditions are met. It’s another simple concept on the surface, but one that allows us to do a surprising amount of work.for

You’ll use `for` loops in situations where you’ll be running a loop for a known number of times, or *iterations*. (By “known,” I don’t mean that *we*, the brains between the keyboards and chairs, necessarily know how many times we’ll need to go through a loop in advance; I just mean that we’ll be looping through a known quantity.)

The syntax for a loop is a little tricky, since we’re packing a lot of information into just a few characters. The basics are almost expected by this point: a `for` keyword, followed by a set of parentheses, followed by a pair of curly braces that we want our loop to execute however many times.

But it’s the syntax between the parentheses that’s unlike anything we’ve encountered so far. A `for` loop accepts three expressions: the *initialization*, the *condition*, and the somewhat redundantly named *final expression*, all separated by semicolons.

```
for( var i = 0; i < 3; i++ ) {
  console.log( "This loop will run three times.")
}
(3) This loop will run three times.
```

The initialization is almost always used for one thing: to initialize a variable that will act as a counter. It gets initialized the same as any other variable, with a `var` keyword, an identifier, and an assignment. You’ll see a lot of these counter variables with the identifier `i`, which stands for “iteration.” It *does* break the rule against giving identifiers single-character names, but it’s a well-established convention. Since JavaScript starts indexing things at zero, it’s a good idea for us to always start from zero as well—that way we don’t get into the habit of counting up from one or run into any mismatched counters in our scripts.

The condition is how we define the point at which the loop stops. So, we’re defining `i` as starting at zero, and we want the loop to run for as long as `i` is less than three.

The final expression is the statement we want executed at the end of every iteration through the loop—so, this is where we tick the `i` variable’s value up by one. If you think all the way back to the mathematical operators we learned about earlier, you’ll recall that the `++` syntax increments a value by one: `i++` as the final expression says to increase i by one every time the loop finishes.

So, in plain English, the `for` syntax above says this: “Start `i` at zero. Only run the following code if `i` is smaller than three, and add one to `i` after every loop.”

One of the most common uses for a `for` loop is iterating over each item in an array. As we learned in the last chapter, arrays come with a property for determining how many items it contains—the `.length` property—so we’ll always be dealing with a known quantity. If we use the array’s length in the condition, we get a loop that iterates as many times as there are items in our array:

```
var loopArray = ["first", "second", "third"];
for( var i = 0; i < loopArray.length; i++ ) {
  console.log( "Loop." );
}
(3) Loop.
```

And if we add an item to our test array, the number of iterations changes to match:

```
var loopArray = ["first", "second", "third", 4];
for( var i = 0; i < loopArray.length; i++ ) {
  console.log( "Loop." );
}
(4) Loop.
```

Cool—we can make a thing that runs arbitrary code as many times as we have items in an array. I know that isn’t particularly useful or exciting on the surface, but what’s *very* exciting (I don’t get out much) is that `i` is a plain ol’ number type variable that’s available to us on every iteration of the loop, and since we’re counting from zero, it contains a value that corresponds to the index of each item in our array. A `for` loop gives us a method of iterating over the data in an array all at once:

```
var names = [ "Ed", "Al" ];
for( var i = 0; i < names.length; i++ ) {
  var name = names[ i ];
  console.log( "Hello, " + name + "!" );
}
Hello, Ed!
Hello, Al!
```

Now we can reach back into the `names` variable that we’re iterating over, and using i as the index, we can tap into each item inside the array.

We didn’t have to initialize a new `name` variable here, of course—we could have used `names[ i ]` inside our `console.``log` and had everything work the same way. Storing the array’s data in a variable on each iteration is a good idea if you’re likely to access that data multiple times during your loop, just for the sake of convenience.

### for/in

`for`/`in` loops start out the same way as the `for` loops above, using a `for` keyword, a set of parentheses, and a pair of curly braces containing whatever code we want to iterate over. Likewise, you’ll use the `for`/`in` syntax to iterate over multiple items—but not necessarily the way we would want to with an array. `for`/`in` is used to iterate over the properties of an object—but in an arbitrary order, not a sequential one.

Instead of an initialization, condition, and final expression, a `for`/`in` loop starts with us initializing a variable that will correspond with the keys in our object, followed by the `in` keyword, and the object we want to iterate over:

```
var nameObject = {
  "first": "Mat",
  "last": "Marquis" 
};
for( var name in nameObject ) {
  console.log( "Loop." );
}
(2) Loop.
```

Unlike iterating over an array using `for`—where we have a handy `i` variable at our disposal—we now have to do a little more work to figure out what strings are used as keys in our object. Those keys get assigned to the `name` variable we initialized in the parentheses.

```
var nameObject = {
  "first": "Mat",
  "last": "Marquis" 
};
for( var name in nameObject ) {
  console.log( name );
}
first
last
```

Not too useful on the surface, but just like a regular `for` loop gave us a number data type we could use to access our data on each iteration, `for`/`in` gives us the string we need to access the data in an object:

```
var fullName = {
  "first": "Mat",
  "last": "Marquis" 
};
for( var name in fullName ) {
  console.log( name + ": " + fullName[ name ] );
}
first: Mat
last: Marquis
```

You’ll notice we’re using bracket notation instead of dot notation here—that’s because we have to. If we were to try to access `fullName.name`, we’d be trying to access exactly that: `fullName.name`—a property with the key `name` inside  `fullName`—instead of a property with a key that matches the string that `name` *contains*.

Now, you might be thinking, “But if pretty much everything is an object—sort of—does that mean we can use `for`/`in` to iterate over an array?” You can, in fact. Arrays behave just like any other objects using `for`/`in`, but `for`/`in` isn’t quite as array-friendly as a regular `for` loop. For one thing, we can’t guarantee that `for`/`in` will iterate over an array in sequential order—and that might be okay, depending on what you’re doing.

The bigger problem is that `for`/`in` has a catch that a regular `for` loop doesn’t: since pretty much everything is an object—and you can add properties to any object—that means `for`/`in` can end up iterating over properties we never meant for it to know about.

I’ve previously mentioned that everything in JavaScript has “built-in” methods and properties—how a string, even though we only define it as a handful of characters, will come with properties like `.length` and methods like `.toLowerCase()`.

These methods and properties aren’t completely buried in the dark recesses of JavaScript. We can see—and even *change*—the methods and properties that come attached to data types, arrays, objects, and so on.

### Prototypal inheritance

Most objects have an internal property named `prototype` that contains those built-in properties, but accessing it for ourselves is a little strange. When we access a property on an object—even one we’ve created ourselves—the JavaScript runtime first checks to see if that property is something *we* defined. If not, it looks for that key as a `prototype` property for that object’s constructor—a sort of overarching template that JavaScript follows whenever dealing with a certain type of object. All strings, for example, inherit all the `prototype` properties and methods from the `String` constructor. With *most* browser tools, typing `String.prototype` into your console will show you all of those built-in properties.

If your first instinct is that JavaScript allowing us to override built-in methods is a little scary, you’re absolutely right. The `toString` method, for example, is a pretty cut-and-dry way of converting any object to a string, but with a few lines of code we can overwrite it, and make that method do whatever we want.

```
var myObject = {};
var otherObject = {};
myObject.toString();
"[object Object]"
myObject.toString = function() {
  console.log( "I just broke JavaScript a little." );
};
myObject.toString();
I just broke JavaScript a little.
otherObject.toString();
"[object Object]"
```

That’s kind of a scary amount of power, but it gets scarier.

We can access a constructor’s `prototype` from *any* object of that type by using the `__proto__` property—a reference to the `prototype` for *all* objects of that same type. It isn’t available in all browsers just yet, but that’s okay—we probably shouldn’t be messing with it anyway. `__proto__` allows us to add, remove, and completely change how JavaScript’s built-in properties work on any one object—and in doing so, change the set of properties and methods that are built into *all related* *objects*.

```
var myObject = {};
var unrelatedObject = {};
myObject.toString();
"[object Object]"
myObject.\_\_proto\_\_.toString = function() {
  console.log( "I just broke JavaScript a LOT." );
};
myObject.toString();
I just broke JavaScript a LOT.
unrelatedObject.toString(); // Uh oh.
I just broke JavaScript a LOT.
```

Here, we managed to change the `toString` method not just on `myObject`, but on *all* objects, by changing it at the `prototype` level. In a vacuum like this, where we can see all our code at a glance, it may not seem like an especially terrifying prospect—but by tampering with the way JavaScript does things, we run a huge risk of breaking things on a real site.

Luckily, you won’t see this much. By the time anyone has advanced enough in their script-writing to think they have a need to mess with `prototype`, they’ve learned not to. What you will see on occasion are *additions* to `prototype`—methods and functions added to `prototype` so they’re available to all objects of the same type.

We can add methods and properties to *all* objects of a certain type by making changes to the `prototype` property of a constructor directly—we just can’t change the properties that have already been defined. This works the way you might expect: making additions to `String.prototype` works the way you’d add properties on an object you created yourself.

Now, adding methods to `prototype` isn’t a great idea either—especially when it comes to `for`/`in` loops. But for the sake of argument, let’s say you’ll frequently need to check objects for the presence of a key with the identifier `name`. In theory, we could just add a method to *all* objects by adding a new method to the `Object` constructor’s `prototype` property. We won’t need to use `__proto__` here, since we’re not looking to change `Object.prototype` by way of an object data type itself: 

```
var firstObject = {
  "foo" : false
};
undefined
var secondObject = { 
  "name" : "Hawkeye",
  "location" : "Maine"
};
undefined
Object.prototype.containsAName = function() {
  var result = false;
  for( var key in this ) {
    if( key === "name" ) {
      result = true;
    }
  }
  return result;
}
function Object.containsAName()
firstObject.containsAName();
false
secondObject.containsAName();
true
```

Once you’ve added something to an object’s prototype, that property or method will be available to all instances of that data type.

Now, don’t commit that code to memory—it's an incredibly convoluted way to see whether an object contains the key `name`. It works well enough, but in addition to being a strange way to handle a simple task, it comes with an unintended side-effect: an object’s built-in properties aren’t *enumerable*, meaning that they don’t show up when we loop through an object’s properties using `for`/`in`. When we add *new* properties to `prototype`, however, they *are* enumerable:

```
Object.prototype.containsAName = function() {
  var result = false;
  for( var key in this ) {
    if( key === "name" ) {
      result = true;
    }
  }
  return result;
}
function Object.containsAName()
var newObject = { "name": "BJ" };
for( var key in newObject ) {
  console.log( key );
}
name
containsAName
```

Now every time we run a `for`/`in` loop, our `containsAName` method is going to show up—certainly not ideal, and probably reason enough to leave `prototype` alone. Whenever we tinker with `prototype`, we’re making global changes to JavaScript’s internals—adding a method or property means `for`/`in` loops throughout all the scripts on our page could end up behaving unexpectedly.

That means we have to look at the issue from the other side—what happens to our `for`/`in` loops when someone else starts tinkering with `prototype`? A page can contain scripts written by multiple developers, third-party scripts from external sources, and so on—we can’t be certain that our `for`/`in` loops won’t be affected by unexpected enumerable properties.

### hasOwnProperty

The reason for this treacherous journey through `prototype` was two-fold: first, to teach you a little bit about `prototype`, since we were in the neighborhood and all. Second, to introduce you to the `hasOwnProperty` method, which we can use to safeguard our `for`/`in` loops against unexpected enumerable properties on `prototype`:

```
Object.prototype.containsAName = function() {
  var result = false;
  for( var key in this ) {
    if( key === "name" ) {
      result = true;
    }
  }
  return result;
}
function Object.containsAName()
var mysteryObject = {
  "name" : "Frank"
}
mysteryObject.hasOwnProperty( "name" );
true
mysteryObject.hasOwnProperty( "containsAName" );
false
```

It just so happens that we can use `hasOwnProperty` to do what we were trying to do when we were messing with  `prototype`: determine whether an object we created contains a certain property. But even more importantly—at least, for the sake of our loops—`hasOwnProperty` *doesn’t* apply to properties inherited from `prototype`. We can use it to safeguard our `for`/`in` loops against misguided `prototype` shenanigans.

```
Object.prototype.customPrototypeMethod = function() {
  console.log( "Hello again." ); 
};
function Object.customPrototypeMethod()
var swamp = {
  "bunk1" : "Hawkeye",
  "bunk2" : "BJ",
  "bunk3" : "Frank"
};
undefined
for( var bunk in swamp ) {
  console.log( swamp[ bunk ] );
}
Hawkeye
BJ
Frank
function Object.containsAName()
for( var bunk in swamp ) {
  if( swamp.hasOwnProperty( bunk ) ) {
    console.log( swamp[ bunk ] );
  }
}
Hawkeye
BJ
Frank 
```

With `hasOwnProperty` in place, no additions to `prototype` can change the results we expect from our `for`/`in` loops. After all, we won’t always be able to guarantee that we control every line of code that makes it into our websites, or know for certain whether another developer decided to tinker with a constructor’s `prototype`.

## while

After that brief excursion into `prototype`, the syntax for `while` loops is going to be a refreshing change of pace. Like all the others, it starts with a keyword—`while`—followed by a set of parentheses and a set of curly braces. The only thing we’ll put between the parentheses of a `while` loop is a *condition*—and just like the keyword implies, the loop will continue to execute for as long as that condition evaluates to true.

```
var i = 0;
while( i < 3 ) {
  console.log( "Loop." );
  i++;
}
(3) Loop
```

The code above is really just another way of writing our first `for` loop. Instead of putting the initialization, condition, and final expression between the parentheses, we’re creating the counter variable before the loop and incrementing the counter inside the loop.

This isn’t a common case for `while`, however—we could write this much more concisely using `for`, after all. We’ll use `while` when we *don’t* have any way of measuring the number of iterations necessary, and instead want to continue to run the loop until a certain condition is met. For example, the following snippet of code will continually generate a number between zero and nine, only stopping when that random number equals three:

```
var random = Math.floor( Math.random() * 10 );
while( random !== 3 ){
  console.log( "Nope, not " + random );
  var random = Math.floor( Math.random() * 10 );
}
console.log( "Got it!" );
Nope, not 5
Nope, not 9
Nope, not 2
Got it!
```

If we run this code again, that `while` loop could run any number of times before continuing on to the `console.log` that follows it—or `random` could contain a `3` right off the bat, and the loop will never run at all.

### do/while

`do`/`while` loops serve largely the same purpose as `while` loops: to iterate over a loop until a given condition evaluates to true, as many times as is needed. The syntax is a little different—in fact, compared to the conditional logic you’ve seen so far, `do`/`while` loops look a little backwards. We start with a `do` keyword, immediately followed by a set of curly braces—no parentheses, no conditions—containing the code we want to iterate over. *After* the curly braces, we use the `while` keyword and parentheses containing the condition; as long as that condition evaluates to true, the loop will keep on running.

```
var i = 0;
do {
  console.log( "Loop." );
  i++;
} while (i < 3);
(3) Loop.
```

There’s really only one difference between a `do`/`while` and a plain ol’ `while` loop: the contents of a `while` loop may never run at all—as in our random number example above—but the code in a `do`/`while` loop will always execute at least once.

Instead of evaluating the condition then deciding whether or not to run the code, the way all the other loops work, `do`/`while` will execute the code, then stop the loop *after* the condition is found. If we were to write our random-number guessing game above using `do`/`while`, the code will run even once the condition is met:

```
do {
  var random = Math.floor( Math.random() * 10 );
  console.log( "Is it... " + random + "?" );
} while( random !== 3 );
console.log( "Got it!" );
Is it... 7?
Is it... 9?
Is it... 6?
Is it… 3?
Got it!
```

Now we don’t have to generate a random number before the loop *and* regenerate it on each iteration: since the code inside the `do` curly braces will always be executed before the condition is evaluated, we can generate the random number for the first time *and* regenerate it on each subsequent iteration on that one line. We then log each “guess” to our console—and since the code executes before the condition is checked, that will include the matching number. Now that the condition matches, the loop stops, and we move on.

## continue AND break

All of the loop syntaxes handle both iteration and termination—they all accept some form of condition for stopping the loop. If we need more finely grained control, we can do a little steering within our loops using the `continue` and `break` keywords.

To play with these keywords a little, let’s start with a `for` loop that counts from zero to four:

```
for( var i = 0; i < 5; i++ ) {
  console.log( i );
}
0
1
2
3
4
```

`continue` allows us to skip ahead to the next iteration of a loop without executing any of the code inside the loop that follows the `continue` statement.

```
for( var i = 0; i < 5; i++ ) {
  if( i === 2 ) {
    continue;
  }
  console.log( i );
}
0
1
3
4
```

This loop skips the third `console.log` by using `continue` when `i` is equal to two—which skips the third iteration, remember, since we start counting at zero. We never see a `2` in our console.

`break`—a deeply satisfying keyword to type after a few hours of programming, in my experience—not only stops the current iteration of a loop, but stops the loop completely:

```
for( var i = 0; i < 5; i++ ) {
  if( i === 2 ) {
    break;
  }
  console.log( i );
}
0
1
```

Upon encountering a `break`, JavaScript reacts the same way it does when it reaches a loop’s built-in condition for termination: it stops iterating over the loop completely. As a matter of fact, we don’t *need* to build in that condition at all—we can write a loop that iterates forever by default, and control its behavior using `break`.

```
var concatString = "a";
while( true ) {
  concatString = concatString + "a";
  if( concatString.length === 5 ) {
    break;
  }
  console.log( concatString );
}
aa
aaa
aaaa
```

`true` can’t possibly stop evaluating to `true`, so using it as a `while` condition means the loop has to run forever—unless we use `break` to stop it, once our string reaches five characters long.

## INFINITE LOOPS

We’re standing on the precipice of a very touchy subject for developers of any language. What happens if we pass `while` the keyword `true` as a condition, or write a `for` loop that counts upwards from zero, but only stops iterating if `i` is equal to `-1`? We’ve just created an infinite loop, and here be dragons.

Upon encountering an infinite loop, some modern browsers eventually offer you the option of aborting the script—but only newer browsers, and not always. More often than not, an infinite loop means a browser crash.

It happens to the best of us, and there’s no serious harm done (as long as the offending code didn’t make it out to a production website). Close and reopen your browser and you’ll be back to business as usual—just be sure to fix the infinite loop before you attempt to run your script again.

## PUTTING IT ALL TOGETHER

We’ve covered a lot of ground so far. Now that we have a sense of how JavaScript handles data, logic, and loops, we can start putting it all together into something more useful than a couple of lines in our developer consoles. It’s time to write a script in the context it was meant to occupy: a real web page.
