These are some notes on JavaScript.

`typeof 'a'` is `string` and `typeof {}` is `object`.

JavaScript objects don't really have types, because everything is so dynamic.  An object type is simply a collection of properties.

`for (k in obj) ...` iterates over the _enumerable_ properties of `obj`, including properties on the `__proto__` chain.

`__proto__` is the actual object that is used in the lookup chain. `prototype` is the
object that is used to build `__proto__` when you create an object with `new`.

`prototype` is a property of a Function object. It is the prototype of objects constructed by that function.

`__proto__` is an internal property of an object, pointing to its prototype. Current standards provide an equivalent `Object.getPrototypeOf(obj)`.
