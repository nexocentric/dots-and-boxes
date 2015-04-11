var NEUTRAL_MARKER = 0;
var PLAYER_ONE_MARKER = 1;
var PLAYER_TWO_MARKER = 2;
var GAME_GRID_COLUMNS = 4;
var GAME_GRID_ROWS = 4;
var LINE_OFFSET = 1;
var HORIZONTALLY = "horizontal";
var VERTICALLY = "vertical";
var verticalLinesClaimed = [];
var horizontalLinesClaimed = [];
var squaresClaimed = [];
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
	squaresClaimed = createArray(
		GAME_GRID_ROWS,
		GAME_GRID_COLUMNS
	);
	
	return true;
}

function restartGame() {
	resetGameCounters();
}

//just need to convert this for image toggling
function replaceImage(imagePath, uploadTimestamp, jqueryObject, photoWidth, photoHeight) {
	//--------------------------------------
	// load the photo from its url and
	// add it to the photowall when loaded
	//--------------------------------------
	var frameClass = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
	var tooltip = $('<span data-tooltip aria-haspopup="true" class="has-tip" data-options="show_on:large" title="Large Screen Sizes"></span>');

	if (photoWidth > photoHeight) {
		var img = $('<img class="photo frame-style-' + frameClass + '" width="100%" data-width="' + photoWidth + '" data-height="' + photoHeight + '" alt="SOMETHING!">').attr('src', imagePath).attr(timestampAttribute, uploadTimestamp).load(function() {
			if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
				console.log('Image does not exist.');
			} else {
				$(jqueryObject).first().replaceWith(img);
			}
		});
	} else {
		var img = $('<img class="photo frame-style-' + frameClass + '" width="60%" data-width="' + photoWidth + '" data-height="' + photoHeight + '" alt="SOMETHING!">').attr('src', imagePath).attr(timestampAttribute, uploadTimestamp).load(function() {
		if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
				console.log('Image does not exist.');
			} else {
				$(jqueryObject).first().replaceWith(img);
			}
		});
	}
}

function resetImages() {

}

function resetGame() {

}

function gameFinished(playerOneScore, playerTwoScore) {

}

function displayWinner(playerMarker) {

}

function checkHorizontalClaims()
{
	
}

function checkVerticalClaims()
{
	
}

function determineClaim(direction, columnIndex, rowIndex) {
	var maxHorizontalLines = horizontalLinesClaimed[0].length;
	var maxVerticalLines = verticalLinesClaimed[0].length;
	var topClaimed = false;
	var bottomClaimed = false;
	var leftClaimed = false;
	var rightClamed = false;
	
	if (==) {
		topClaimed = true;
	}

	if (==) {
		bottomClaimed = true;
	}

	if (==) {
		leftClaimed = true;
	}

	if (==) {
		rightClaimed = true;
	}
}


function boxClaimed(direction, columnIndex, rowIndex) {

	return playerMarker;
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
function connectDots(direction, columnIndex, rowIndex) {
	//alert("Clicked.");
	console.log("Clicked");
	return nextPlayer;
}


function run(direction, columnIndex, rowIndex) {
	var validMove = false;

	if (direction == HORIZONTALLY) {
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
		return 0;
	}



	alert(validMove)
	return 1;
}

window.onload = restartGame;