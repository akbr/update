# makePath :wavy_dash:

**Defines and enforces an array-based "path" convention.**

A path is an array intended to be interpreted as a list of keys. Useful for nesting into javascript objects.

## API
### makePath(input) => path
Valid `input`:
* a string (splits on periods);
* a number;
* an array (simply returned). 

Invalid `input` returns an empty path.

## Usage
```javascript
makePath("id"); // ["id"]
makePath("users.0.name"); // ["users", "0", "name"]
makePath(1); // [1]
makePath(["foo", "bar"]); // ["foo", "bar"]
makePath({foo:"bar"}); // []
```

## Changelog
1.0.1 - Invalid input now returns an empty path.