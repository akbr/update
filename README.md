# update :wrench:

**Immutably patch JS objects.**

Supports nesting and caching.

## Quickstart

```javascript
var obj = {hello: "world"};

// A simple revision
var obj2 = update(obj, "foo", "bar");
obj2 // {hello: "world", foo: "bar"}
var excited = update(obj, "hello", s => s + '!');
excited // {hello: "world!"}

// Burrow in
var obj3 = update(obj, ["a", "b", "c"], "baz");
obj3 // {hello: "world", a:{b:{c:"baz"}}}}
obj1 // {hello: "world"}

// For multiple update operations, cache can speed things up.
var universe = {
  galaxies: {
    1: {}
    //, ... 500 more
  }
};

var cache = {};
var universe2 = update(universe, ["galaxies", 1, "name"], "Milky Way", cache);
// Cache now indicates that "galaxies" and "1" have already been copied, and are thus "safe" for future mutation (w/r/t the original universe object).
// If we pass this cache to another operation, we avoid creating redundant shallow copies.
universe2 = update(universe2, ["galaxies", 1, "isInhabitedBy"], ["humans", "martians"], cache);
```

## API
### update(obj, path, value[, cache])

`obj`: an object or array.

`path`:
* A string, dot notation for nesting;
* A number;
* An array, multiple values for nesting.

Other `path` types are interpreted as an empty path.

`value`: any value, or a function (currentValue => nextValue)

`cache`: an empty object (for a new cache) or a previous cache object. pathInto mutates cache objects so they are cumulative over multiple operations.
