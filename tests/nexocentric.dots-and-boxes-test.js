TESTING_MODE = true;
IMAGES_FOLDER = "../images";

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

	returnValue = createArray(4, 4);
	assert.deepEqual(returnValue.length, 4, "Returns a one dimensional array if only column numbers are passed.");
	assert.deepEqual(returnValue[0].length, 4, "Returns an empty array if no parameters passed.");
});

QUnit.test("startGame function", function(assert) {
	var generatedGameGrid = startGame();
	var sizeOfDimension = 0;

	sizeOfDimension = generatedGameGrid.length;
	assert.deepEqual(
		sizeOfDimension - GAME_GRID_COLUMNS,
		BOX_OFFSET,
		"Width of grid is offset for move tracking."
	);

	sizeOfDimension = generatedGameGrid[0].length;
	assert.deepEqual(
		sizeOfDimension - GAME_GRID_ROWS, 
		BOX_OFFSET,
		"Height of grid is offset for move tracking."
	);
});

QUnit.test("replaceResource function", function(assert) {
	var returnValue = replaceResource(1, 2, -1, 1);
	assert.deepEqual(
		returnValue, 
		"", 
		"Returns a blank string if the x coordinate is less than 0."
	);
	returnValue = replaceResource(1, 2, GAME_GRID_COLUMNS + BOX_OFFSET, 1);
	assert.deepEqual(
		returnValue, 
		"", 
		"Returns a blank string if the x coordinate outside of range."
	);

	returnValue = replaceResource(1, 2, 1, -1);
	assert.deepEqual(
		returnValue, 
		"", 
		"Returns a blank string if the y coordinate is less than 0."
	);
	returnValue = replaceResource(1, 2, 1, GAME_GRID_ROWS + BOX_OFFSET);
	assert.deepEqual(
		returnValue, 
		"", 
		"Returns a blank string if the y coordinate outside of range."
	);

	returnValue = replaceResource(PLAYER_ONE_MARKER, HORIZONTAL, 1, 1);
	assert.deepEqual(
		(returnValue.length > 0), 
		true, 
		"Returns resource path on success."
	);
});

QUnit.test("coordinatesWithinRange function", function(assert) {
	var returnValue = coordinatesWithinRange(-1, 0);
	assert.deepEqual(
		returnValue,
		false,
		"Returns false if x is too small."
	);
	returnValue = coordinatesWithinRange(GAME_GRID_COLUMNS + BOX_OFFSET, 0);
	assert.deepEqual(
		returnValue,
		false,
		"Returns false if x is too big."
	);


	returnValue = coordinatesWithinRange(0, -1);
	assert.deepEqual(
		returnValue,
		false,
		"Returns false if y is too small."
	);

	returnValue = coordinatesWithinRange(0, GAME_GRID_ROWS + BOX_OFFSET);
	assert.deepEqual(
		returnValue,
		false,
		"Returns false if y is too big."
	);

	returnValue = coordinatesWithinRange(GAME_GRID_COLUMNS, GAME_GRID_ROWS);
	assert.deepEqual(
		returnValue,
		true,
		"Returns true when coordinates within range."
	);
});

QUnit.test("claimBoxSide function", function(assert) {
	startGame();
	var returnValue = claimBoxSide(HORIZONTAL, -1, 0);
	assert.deepEqual(
		returnValue,
		-1,
		"Returns -1 if x coordinate outside of range."
	);

	returnValue = claimBoxSide(HORIZONTAL, -1, GAME_GRID_ROWS + BOX_OFFSET);
	assert.deepEqual(
		returnValue,
		-1,
		"Returns -1 if y coordinate outside of range."
	);

	returnValue = claimBoxSide(HORIZONTAL, 1, 1);
	assert.deepEqual(
		returnValue,
		false,
		"Returns false if side unclaimed."
	);

	returnValue = claimBoxSide(HORIZONTAL, 1, 1);
	assert.deepEqual(
		returnValue,
		true,
		"Returns true if side already claimed."
	);
});

QUnit.test("boxClaimedOn function", function(assert) {
	startGame();
	var returnValue = boxClaimedOn(TOP, GAME_GRID_COLUMNS + BOX_OFFSET, 0);
	assert.deepEqual(
		returnValue,
		-1, 
		"Returns -1 if x coordinate outside of range."
	);

	returnValue = boxClaimedOn(TOP, 0, -1);
	assert.deepEqual(
		returnValue,
		-1, 
		"Returns -1 if y coordinate outside of range."
	);

	returnValue = boxClaimedOn(TOP, 1, 2);
	assert.deepEqual(
		returnValue,
		false, 
		"Returns false if side unclaimed."
	);

	claimBoxSide(HORIZONTAL, 1, 1);
	returnValue = boxClaimedOn(TOP, 1, 1);
	assert.deepEqual(
		returnValue,
		true, 
		"Returns true if side claimed."
	);
});

QUnit.test("determineBoxOwner function", function(assert) {
	startGame();
	var returnValue = determineBoxOwner(HORIZONTAL, -1, 4);
	assert.deepEqual(
		returnValue,
		-1,
		"Returns -1 if x coordinate out of range."
	);

	returnValue = determineBoxOwner(HORIZONTAL, 4, GAME_GRID_ROWS + BOX_OFFSET);
	assert.deepEqual(
		returnValue,
		-1,
		"Returns -1 if x coordinate out of range."
	);

	returnValue = determineBoxOwner(HORIZONTAL, 4, 4);
	assert.deepEqual(returnValue[0], -1, "Current box x coordinate [no claim horizontal].");
	assert.deepEqual(returnValue[1], -1, "Current box y coordinate [no claim horizontal].");
	assert.deepEqual(returnValue[2], -1, "Negative offset box x coordinate [no claim horizontal].");
	assert.deepEqual(returnValue[3], -1, "Negative offset box y coordinate [no claim horizontal].");

	returnValue = determineBoxOwner(VERTICAL, 4, 4);
	assert.deepEqual(returnValue[0], -1, "Current box x coordinate [no claim vertical].");
	assert.deepEqual(returnValue[1], -1, "Current box y coordinate [no claim vertical].");
	assert.deepEqual(returnValue[2], -1, "Negative offset box x coordinate [no claim vertical].");
	assert.deepEqual(returnValue[3], -1, "Negative offset box y coordinate [no claim vertical].");

	//--------------------------------------
	// 1 is an offset for negative lookups
	// on claims see claimBoxSide for more
	// information
	//--------------------------------------
	for (var column = 1; column < GAME_GRID_COLUMNS + BOX_OFFSET; column++) {
		for (var row = 1; row < GAME_GRID_ROWS + BOX_OFFSET; row++) {
			if (!coordinatesWithinRange(column, row)) {
				continue;
			}
			claimBoxSide(HORIZONTAL, column, row);
			claimBoxSide(VERTICAL, column, row);
		}
	}

	//--------------------------------------
	// confirms that will detect if two 
	// boxes were claimed when a horizontal
	// line is selected
	//--------------------------------------
	returnValue = determineBoxOwner(HORIZONTAL, 4, 4);
	assert.deepEqual(returnValue[0], 4, "Current box x coordinate [claim horizontal].");
	assert.deepEqual(returnValue[1], 4, "Current box y coordinate [claim horizontal].");
	assert.deepEqual(returnValue[2], 4, "Negative offset box x coordinate [claim horizontal].");
	assert.deepEqual(returnValue[3], 3, "Negative offset box y coordinate [claim horizontal].");

	//--------------------------------------
	// confirms that will detect if two 
	// boxes were claimed when a vertical
	// line is selected
	//--------------------------------------
	returnValue = determineBoxOwner(VERTICAL, 4, 4);
	assert.deepEqual(returnValue[0], 4, "Current box x coordinate [claim vertical].");
	assert.deepEqual(returnValue[1], 4, "Current box y coordinate [claim vertical].");
	assert.deepEqual(returnValue[2], 3, "Negative offset box x coordinate [claim vertical].");
	assert.deepEqual(returnValue[3], 4, "Negative offset box y coordinate [claim vertical].");
});

QUnit.test("playTurn function", function(assert) {
	startGame();
	var returnValue = playTurn(HORIZONTAL, 2, 2);
	assert.deepEqual(
		returnValue, 
		1,
		"Returns 1 for every valid horizontal move."
	);

	returnValue = playTurn(VERTICAL, 2, 2);
	assert.deepEqual(
		returnValue, 
		1,
		"Returns 1 for every valid vertical move."
	);

	returnValue = playTurn(HORIZONTAL, 2, 2);
	assert.deepEqual(
		returnValue, 
		0,
		"Returns 0 for every invalid horizontal move."
	);

	returnValue = playTurn(VERTICAL, 2, 2);
	assert.deepEqual(
		returnValue, 
		0,
		"Returns 0 for every invalid vertical move."
	);

	returnValue = markerForCurrentPlayer;
	playTurn(HORIZONTAL, 3, 3);
	assert.deepEqual(
		(returnValue == markerForCurrentPlayer), 
		false,
		"The player marker changes for each valid move."
	);

	returnValue = markerForCurrentPlayer;
	playTurn(HORIZONTAL, 3, 3);
	assert.deepEqual(
		(returnValue == markerForCurrentPlayer), 
		true,
		"The player marker does not change on invalid moves."
	);
});