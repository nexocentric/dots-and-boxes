QUnit.test("createArray function", function(assert) {
	var returnValue = createArray();
	assert.deepEqual(returnValue.length, 0, "returns an empty array if no parameters passed.");

	returnValue = createArray(4);
	assert.deepEqual(returnValue.length, 4, "Returns a one dimensional array if only column numbers are passed.");
	assert.deepEqual(returnValue[0], 0, "Returns a one dimensional array if only column numbers are passed.");
	assert.deepEqual(returnValue[0].length, undefined, "returns an empty array if no parameters passed.");

	returnValue = createArray(4,4);
	assert.deepEqual(returnValue.length, 4, "Returns a one dimensional array if only column numbers are passed.");
	assert.deepEqual(returnValue[0].length, 4, "returns an empty array if no parameters passed.");
});