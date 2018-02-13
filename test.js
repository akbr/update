var assert = require("assert");
var update = require("./index");

var obj = {};
var clean = {};

assert.equal(
  update(null, null, 1), 1
);

assert.equal(
  update(obj, {}), undefined
);

assert.equal(
	update(obj, {}, function(){}),
	undefined
);

// Basic use
var profile = update(obj, "name", "Aaron");

assert.deepEqual(
	update(profile, ["stats", "age"], 31),
  {name: "Aaron", stats:{age: 31}}
);

assert.deepEqual(
	update(profile, "name", n => n + '!'),
  {name: "Aaron!"}
);

assert.deepEqual(
  obj, clean
);

// Burrowing, with cache
var cache = {};
var deep = update(obj, ["a", "b", "c", "d"], "foo", cache);
assert.deepEqual(
  deep, {a:{b:{c:{d:"foo"}}}}
);
assert.deepEqual(
  obj, clean
);

// Watch out!! If we pass the cache from the previous operation into an unrelated operation,
// we risk mutating. Here, the cache tells update that the "b" branch is safe to mutate.
var original = {a:{b:"foo"}};
update(original, "a.b", "bar", cache);
assert.deepEqual(
  original, {a:{b:"bar"}} // !!!!
)

// Copies through anything that isn't an object
var copyThrough = update({name: "Aaron"}, ["name", "first"], "Aaron");
assert.deepEqual(
  copyThrough, {name:{first: "Aaron"}}
);
var copyThrough2 = update({name: []}, ["name", "first"], "Aaron");
assert.deepEqual(
  copyThrough2, {name:{first: "Aaron"}}
);
assert.deepEqual(
  obj, clean
);

// You can patch into an array
var nums = update([1,2,3], 3, 4);
assert.deepEqual(
  nums, [1,2,3,4]
);

// But careful not to assign string key to an array! Yuck.
var count = update([1,2,3,4], "foo", "bar");
assert.equal(
  count.length, 4
);
assert.equal(
  count.foo, "bar"
);
