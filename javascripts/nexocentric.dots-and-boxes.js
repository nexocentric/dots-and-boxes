var NEUTRAL_MARKER = 0;
var PLAYER_ONE_MARKER = 1;
var PLAYER_TWO_MARKER = 2;
var GAME_GRID_COLUMNS = 4;
var GAME_GRID_ROWS = 4;
var LINE_OFFSET = 1;
var HORIZONTAL = "HORIZONTAL";
var VERTICAL = "VERTICAL";
var verticalLinesClaimed = [];
var horizontalLinesClaimed = [];
var boxesClaimed = [];
var turnsTaken = 0;
var markerForCurrentPlayer = PLAYER_ONE_MARKER;

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// This is used to create new 1 or 2 dimensional array.
// [parameters]
// 1) an integer representing the number of columns to make
// 2) an optional integer representing the number of rows to
//    make
// [return]
// 1) a newly created array
//==========================================================
function createArray(numberOfColumns, numberOfRows) {
	var createdArray = [];
	//--------------------------------------
	// initializations
	//--------------------------------------
	numberOfColumns = numberOfColumns || 0
	numberOfRows = numberOfRows || 0

	//--------------------------------------
	// if only columns were specified
	//--------------------------------------
	if (numberOfRows == 0) {
		createdArray = new Array(numberOfColumns);

		//--------------------------------------
		// if only columns were specified
		//--------------------------------------
		for (var column = 0; column < numberOfColumns; column++) {
			createdArray[column] = NEUTRAL_MARKER;
		}

		return createdArray;
	} else {
		createdArray = new Array(numberOfColumns);
	}

	//--------------------------------------
	// if only
	//--------------------------------------
	for (var newRow = 0; newRow < numberOfRows; newRow++) {
		//--------------------------------------
		// if only columns were specified
		//--------------------------------------
		createdArray[newRow] = new Array(numberOfColumns);

		for (var newColumn = 0; newColumn < numberOfColumns; newColumn++) {
			createdArray[newRow][newColumn] = NEUTRAL_MARKER;
		}
	}
	return createdArray;
}

function claim(playerMarker, arrayForClaim, columnIndex, rowIndex) {
	if (arrayForClaim[rowIndex][columnIndex] != NEUTRAL_MARKER) {
		return false;
	}

	arrayForClaim[rowIndex][columnIndex] = playerMarker;
	return true;
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// 
// [parameters]
// none
// [return]
// none
//==========================================================
function countClaimsByPlayer(playerMarker, arrayToCount) {
	var rowCount = arrayToCount.length;
	var columnCount = arrayToCount[0].length;
	var totalClaims = 0;

	for (var row = 0; row < rowCount; row++) {
		for (var column = 0; column < columnCount; column++) {
			if (arrayToCount[row][column] != playerMarker) {
				continue;
			}
			totalClaims += 1;
		}
	}

	return totalClaims;
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// 
// [parameters]
// none
// [return]
// none
//==========================================================
function resetGameCounters() {
	verticalLinesClaimed = createArray(
		GAME_GRID_ROWS,
		GAME_GRID_COLUMNS + LINE_OFFSET
	);
	horizontalLinesClaimed = createArray(
		GAME_GRID_ROWS + LINE_OFFSET,
		GAME_GRID_COLUMNS
	);
	boxesClaimed = createArray(
		GAME_GRID_ROWS,
		GAME_GRID_COLUMNS
	);
	
	return true;
}

function restartGame() {
	resetGameCounters();
}

//just need to convert this for image toggling
function visuallyMarkClaim(playerMarker, claimType, columnIndex, rowIndex) {
	var resourceSelector = "." + claimType.toLowerCase() + "-" + columnIndex + "-" + rowIndex + " > img";
	var resourcePath = "images/" + playerMarker + "-" + claimType + ".svg";
	var resourceEvent = "";

	switch (claimType) {
		case HORIZONTAL:
			resourceEvent = " onclick='turnsTaken += run(" + HORIZONTAL + ", " + columnIndex + ", " + rowIndex + ");'";
			break;
		case VERTICAL:
			resourceEvent = " onclick='turnsTaken += run(" + VERTICAL + ", " + columnIndex + ", " + rowIndex + ");'";
			break;
		default:
			resourceEvent = "";
			break;
	}
	var imageForClaim = "<img" + resourceEvent + ">";

	console.log("resourceSelector :" + resourceSelector);
	console.log("resourcePath :" + resourcePath);
	console.log("resourceEvent :" + resourceEvent);
	console.log("newImageTag :" + imageForClaim);

	var loadedImage = $(imageForClaim).attr("src", resourcePath).load(function() {
		$(resourceSelector).first().replaceWith(loadedImage);
	});

	return imageForClaim;
}

// function resetImages() {

// }

// function resetGame() {

// }

// function gameFinished(playerOneScore, playerTwoScore) {

// }

// function displayWinner(playerMarker) {

// }

function determineClaimHorizontal(columnIndex, rowIndex)
{
	var maxHorizontalLines = horizontalLinesClaimed[0].length;
	var maxVerticalLines = verticalLinesClaimed[0].length;
	var topClaimed = false;
	var bottomClaimed = false;
	var leftClaimed = false;
	var rightClaimed = false;

	//when horizontal bar = (columnIndex + 1) == maxHorizontalLines
	//set right claimed
	//subtract one from column index
	if ((columnIndex + 1) == maxHorizontalLines) {
		columnIndex--;
	}

	if (
		horizontalLinesClaimed[rowIndex][columnIndex] != NEUTRAL_MARKER
	) {
		leftClaimed = true;
	}

	if (
		horizontalLinesClaimed[rowIndex][columnIndex + 1] != NEUTRAL_MARKER
	) {
		rightClaimed = true;	
	}

	if (
		verticalLinesClaimed[rowIndex][columnIndex] != NEUTRAL_MARKER
	) {
		topClaimed = true;
	}

	if (
		verticalLinesClaimed[rowIndex + 1][columnIndex] != NEUTRAL_MARKER
	) {
		bottomClaimed = true;
	}


	if (topClaimed && bottomClaimed && leftClaimed && rightClaimed) {
		return true;
	}
	return false;
}

function determineClaimVertical(columnIndex, rowIndex)
{
	var maxHorizontalLines = horizontalLinesClaimed[0].length;
	var maxVerticalLines = verticalLinesClaimed[0].length;
	var topClaimed = false;
	var bottomClaimed = false;
	var leftClaimed = false;
	var rightClaimed = false;

	//when horizontal bar = (columnIndex + 1) == maxHorizontalLines
	//set right claimed
	//subtract one from column index
	if ((rowIndex + 1) == maxVerticalLines) {
		rowIndex--;
	}

	if (
		horizontalLinesClaimed[rowIndex][columnIndex] != NEUTRAL_MARKER
	) {
		leftClaimed = true;
	}

	if (
		horizontalLinesClaimed[rowIndex][columnIndex + 1] != NEUTRAL_MARKER
	) {
		rightClaimed = true;	
	}

	if (
		verticalLinesClaimed[rowIndex][columnIndex] != NEUTRAL_MARKER
	) {
		topClaimed = true;
	}

	if (
		verticalLinesClaimed[rowIndex + 1][columnIndex] != NEUTRAL_MARKER
	) {
		bottomClaimed = true;
	}


	if (topClaimed && bottomClaimed && leftClaimed && rightClaimed) {
		return true;
	}
	return false;
}

function determineClaim(direction, columnIndex, rowIndex) {
	var maxHorizontalLines = horizontalLinesClaimed[0].length;
	var maxVerticalLines = verticalLinesClaimed[0].length;
	var boxClaimed = false;

	if (
		direction == HORIZONTAL
	) {
		boxClaimed = determineClaimHorizontal(columnIndex, rowIndex);
	}

	if (
		(direction == HORIZONTAL)
		&& boxClaimed == false
		&& columnIndex > 0
	) {
		console.log("secondary column check");
		return determineClaimHorizontal(columnIndex - 1, rowIndex);
	} else if (direction == HORIZONTAL) {
		console.log("checking box");
		return boxClaimed;
	}


	boxClaimed = determineClaimVertical(columnIndex, rowIndex);

	if (boxClaimed == false && rowIndex > 0) {
		console.log("secondary row check");
		return determineClaimVertical(columnIndex - 1, rowIndex);
	}
	return boxClaimed;
}


// function boxClaimed(direction, columnIndex, rowIndex) {

// 	return playerMarker;
// }

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// 
// [parameters]
// none
// [return]
// none
//==========================================================
function connectDots(direction, columnIndex, rowIndex) {
	//alert("Clicked.");
	console.log("Clicked");
	return nextPlayer;
}


function run(direction, columnIndex, rowIndex) {
	var validMove = false;

	if (direction == HORIZONTAL) {
		validMove = claim(
			markerForCurrentPlayer,
			horizontalLinesClaimed,
			columnIndex,
			rowIndex
		)
	} else {
		validMove = claim(
			markerForCurrentPlayer,
			verticalLinesClaimed,
			columnIndex,
			rowIndex
		)
	}

	if (validMove == false) {
		console.log("invalid move")
		return 0;
	}

	visuallyMarkClaim(markerForCurrentPlayer, direction, columnIndex, rowIndex);

	if (determineClaim(direction, columnIndex, rowIndex) == false) {
		markerForCurrentPlayer = (markerForCurrentPlayer != PLAYER_ONE_MARKER) ? PLAYER_ONE_MARKER : PLAYER_TWO_MARKER;
	}

	console.log("valid move");
	return 1;
}

window.onload = restartGame;