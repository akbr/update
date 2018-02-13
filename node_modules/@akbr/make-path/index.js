module.exports = function makePath(input) {
  var type = typeof(input);

  if (Array.isArray(input)) {
    return input;
  } else if (type === "string") {
    return input.split(".");
  } else if (type === "number") {
    return [input];
  } else {
    return [];
  }
};