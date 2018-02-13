module.exports = function shallowCopy (obj) {
	if (Array.isArray(obj)) {
		return [...obj];
	} else if (typeof(obj) === 'object') {
		return {...obj};
	} else {
		return obj;
	}
};
