//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// This is a simiple function used to validate arrays. A
// function like this is needed because there are a number
// of conditions that need to be checked before one can be
// sure that an array is valid for use in JavaScript.
// [parameters]
// 1) an array to validate
// [return]
// 1) true if the array is safe for use
// 2) false otherwise
//==========================================================
function validateArray(arrayToValidate)
{
	if (
		typeof arrayToValidate != "undefined" 
		&& arrayToValidate != null 
		&& arrayToValidate.length != null
		&& arrayToValidate.length > 0
	) {
		return true;
	}
	return false;
}

QUnit.test("createArray function", function(assert) {
	var returnValue = createArray();
	assert.deepEqual(returnValue.length, 0, "Returns an empty array if no parameters passed.");

	returnValue = createArray(4);
	assert.deepEqual(returnValue.length, 4, "Returns a one dimensional array if only column numbers are passed.");
	assert.deepEqual(returnValue[0], "0", "Returns a one dimensional array if only column numbers are passed.");

	returnValue = validateArray(returnValue[0][0]);
	assert.deepEqual(returnValue, false, "Second dimension should not exist.");

	returnValue = createArray(4, 4);
	assert.deepEqual(returnValue.length, 4, "Returns a one dimensional array if only column numbers are passed.");
	assert.deepEqual(returnValue[0].length, 4, "Returns an empty array if no parameters passed.");
});

QUnit.test("startGame function", function(assert) {
	// function startGame()
});

QUnit.test("replaceResource function", function(assert) {
	// function replaceResource(playerMarker, resourceType, xCoordinate, yCoordinate) {
});

QUnit.test("boxClaimedOn function", function(assert) {	
	// function boxClaimedOn(side, xLineCoordinate, yLineCoordinate)
});

QUnit.test("claimBoxSide function", function(assert) {
	// function claimBoxSide(lineOrientation, xLineCoordinate, yLineCoordinate)
});

QUnit.test("determineBoxOwner function", function(assert) {
	// function determineBoxOwner(lineOrientation, xBoxCoordinate, yBoxCoordinate)
});

QUnit.test("playTurn function", function(assert) {
	// function playTurn(lineOrientation, xLineCoordinate, yLineCoordinate)
});