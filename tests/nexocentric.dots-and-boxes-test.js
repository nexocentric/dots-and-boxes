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

QUnit.test("countClaimsByPlayer function", function(assert) {
	var testSetOne = [[1, 1], [1, 1]];
	var testSetTwo = [[1, 2], [1, 1]];

	var returnValue = countClaimsByPlayer(1, testSetOne);
	assert.deepEqual(returnValue, 4, "returns an empty array if no parameters passed.");
	
	returnValue = countClaimsByPlayer(2, testSetOne);
	assert.deepEqual(returnValue, 0, "returns an empty array if no parameters passed.");

	returnValue = countClaimsByPlayer(1, testSetTwo);
	assert.deepEqual(returnValue, 3, "returns an empty array if no parameters passed.");

	returnValue = countClaimsByPlayer(2, testSetTwo);
	assert.deepEqual(returnValue, 1, "returns an empty array if no parameters passed.");
});