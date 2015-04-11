var NEUTRAL_MARKER = 0;
var PLAYER_ONE_MARKER = 1;
var PLAYER_TWO_MARKER = 2;
var GAME_GRID_COLUMNS = 4;
var GAME_GRID_ROWS = 4;
var LINE_OFFSET = 1;
var HORIZONTAL = "HORIZONTAL";
var VERTICAL = "VERTICAL";
var boxesClaimed = [];
var turnsTaken = 0;
var markerForCurrentPlayer = PLAYER_ONE_MARKER;
var TOP = "T";
var BOTTOM = "B";
var LEFT = "L";
var RIGHT = "R";

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
			createdArray[newRow][newColumn] = NEUTRAL_MARKER + "|";
		}
	}
	return createdArray;
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
function startGame() {
	boxesClaimed = createArray(
		GAME_GRID_ROWS,
		GAME_GRID_COLUMNS
	);
}

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

	// console.log("resourceSelector :" + resourceSelector);
	// console.log("resourcePath :" + resourcePath);
	// console.log("resourceEvent :" + resourceEvent);
	// console.log("newImageTag :" + imageForClaim);

	var loadedImage = $(imageForClaim).attr("src", resourcePath).load(function() {
		$(resourceSelector).first().replaceWith(loadedImage);
	});

	return imageForClaim;
}

function markBoxes(lineOrientation, xLineCoordinate, yLineCoordinate)
{

}

function run(lineOrientation, xLineCoordinate, yLineCoordinate) {
	var validMove = false;
	var positionOfBoxClaimed = false;
	var yes = boxesClaimed;
	// if (lineOrientation == HORIZONTAL) {
	// 	validMove = markClaims(
	// 		TOP,
	// 		boxesClaimed,
	// 		columnIndex,
	// 		rowIndex
	// 	)
	// } else {
	// 	validMove = markClaims(
	// 		LEFT,
	// 		boxesClaimed,
	// 		columnIndex,
	// 		rowIndex
	// 	)
	// }

	// if (validMove == false) {
	// 	console.log("invalid move")
	// 	return 0;
	// }

	visuallyMarkClaim(markerForCurrentPlayer, lineOrientation, xLineCoordinate, yLineCoordinate);

	// positionOfBoxClaimed = determineClaim(lineOrientation, columnIndex, rowIndex);
	// if (positionOfBoxClaimed == false) {
	// 	markerForCurrentPlayer = (markerForCurrentPlayer != PLAYER_ONE_MARKER) ? PLAYER_ONE_MARKER : PLAYER_TWO_MARKER;
	// } else {
	// 	visuallyMarkClaim(markerForCurrentPlayer, "box", positionOfBoxClaimed[0], positionOfBoxClaimed[1]);
	// }

	//console.log("valid move");
	return 1;
}

window.onload = startGame;