const makePath = require('@akbr/make-path');
const shallowCopy = require('./shallowCopy.js');

const getValue = function (value, obj) {
	if (typeof(value) === 'function') {
		return value(obj);
	} else {
		return value;
	}
};

module.exports = function update (obj, path, value, cache) {
	if (typeof(obj) !== 'object') {
		return getValue(value, obj);
	}
	
	path = makePath(path);
	
	if (path.length < 1) {
		return getValue(value, obj);
	}

	let copy = shallowCopy(obj);
	let step = copy;
	let cacheStep = cache;
	let endKey = path.pop();

	path.forEach(key => {
		if (typeof(step[key]) !== 'object') {
			step[key] = {};
		} else if (!(cache && cacheStep[key])) {
			step[key] = shallowCopy(step[key]);
		} // else cache tells us the next step is already safe to mutate
		
		step = step[key];
		
		if (cache) {
			cacheStep = cacheStep[key] = step;
		}
	});
	
	step[endKey] = getValue(value, step[endKey]);
	
	if (cache) {
		cacheStep[endKey] = step[endKey];
	}
	
	return copy;
}
