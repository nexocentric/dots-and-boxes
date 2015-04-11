var NEUTRAL_MARKER = 0;
var PLAYER_ONE_MARKER = 1;
var PLAYER_TWO_MARKER = 2;
var GAME_GRID_COLUMNS = 4;
var GAME_GRID_ROWS = 4;
var TOTAL_BOXES_AVAILABLE = GAME_GRID_COLUMNS * GAME_GRID_ROWS;
var BOX_OFFSET = 2;
var HORIZONTAL = "HORIZONTAL";
var VERTICAL = "VERTICAL";
var boxesClaimed = [];
var turnsTaken = 0;
var markerForCurrentPlayer = PLAYER_ONE_MARKER;
var TOP = "T";
var BOTTOM = "B";
var LEFT = "L";
var RIGHT = "R";
var scoreKeeper = [0, 0, 0];

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
		GAME_GRID_ROWS + BOX_OFFSET,
		GAME_GRID_COLUMNS + BOX_OFFSET
	);
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
function visuallyMarkClaim(playerMarker, claimType, columnIndex, rowIndex) {
	if (columnIndex == -1 || rowIndex == -1) {
		return "";
	}

	var resourceSelector = "." + claimType.toLowerCase() + "-" + columnIndex + "-" + rowIndex + " > img";
	var resourcePath = "images/" + playerMarker + "-" + claimType + ".svg";
	var resourceEvent = "";

	// switch (claimType) {
	// 	case HORIZONTAL:
	// 		resourceEvent = " onclick='turnsTaken += run(" + HORIZONTAL + ", " + columnIndex + ", " + rowIndex + ");'";
	// 		break;
	// 	case VERTICAL:
	// 		resourceEvent = " onclick='turnsTaken += run(" + VERTICAL + ", " + columnIndex + ", " + rowIndex + ");'";
	// 		break;
	// 	default:
	// 		resourceEvent = "";
	// 		break;
	// }
	var imageForClaim = "<img" + resourceEvent + ">";

	// console.log("resourceSelector :" + resourceSelector);
	// console.log("resourcePath :" + resourcePath);
	// console.log("resourceEvent :" + resourceEvent);
	// console.log("newImageTag :" + imageForClaim);

	var loadedImage = $(imageForClaim).attr("src", resourcePath).load(function() {
		$(resourceSelector).first().replaceWith(loadedImage);
	});

	return resourcePath;
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
function boxClaimedOn(side, xLineCoordinate, yLineCoordinate)
{
	if (boxesClaimed[xLineCoordinate][yLineCoordinate].indexOf(side) > -1) {
		return true;
	}
	return false;
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
function claimBoxSide(lineOrientation, xLineCoordinate, yLineCoordinate)
{
	var sideClaimed = false;
	var selectedBoxClaims = "";
	var adjacentBoxClaims = "";


	if (lineOrientation == HORIZONTAL) {
		sideClaimed = boxClaimedOn(TOP, xLineCoordinate, yLineCoordinate);
	} else {
		sideClaimed = boxClaimedOn(LEFT, xLineCoordinate, yLineCoordinate);
	}

	if (sideClaimed) {
		return true;
	}

	if (lineOrientation == HORIZONTAL) {
		selectedBoxClaims = boxesClaimed[xLineCoordinate][yLineCoordinate];
		adjacentBoxClaims = boxesClaimed[xLineCoordinate][yLineCoordinate - 1];

		boxesClaimed[xLineCoordinate][yLineCoordinate] = selectedBoxClaims + TOP;
		boxesClaimed[xLineCoordinate][yLineCoordinate - 1] = adjacentBoxClaims + BOTTOM;
		return false;
	}

	selectedBoxClaims = boxesClaimed[xLineCoordinate][yLineCoordinate];
	adjacentBoxClaims = boxesClaimed[xLineCoordinate - 1][yLineCoordinate];

	boxesClaimed[xLineCoordinate][yLineCoordinate] = selectedBoxClaims + LEFT;
	boxesClaimed[xLineCoordinate - 1][yLineCoordinate] = adjacentBoxClaims + RIGHT;
	return false;
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
function determineBoxOwner(lineOrientation, xBoxCoordinate, yBoxCoordinate)
{
	var topClaimed = boxClaimedOn(TOP, xBoxCoordinate, yBoxCoordinate);
	var bottomClaimed = boxClaimedOn(BOTTOM, xBoxCoordinate, yBoxCoordinate);
	var leftClaimed = boxClaimedOn(LEFT, xBoxCoordinate, yBoxCoordinate);
	var rightClaimed = boxClaimedOn(RIGHT, xBoxCoordinate, yBoxCoordinate);
	var topAdjacent = 0;
	var leftAdjacent = 0;
	var boxCoordinates = [-1, -1];
	var adjacentBoxCoodinates = [-1, -1];

	if (topClaimed && bottomClaimed && leftClaimed && rightClaimed) {
		//console.log("This box has an owner!!");
		boxCoordinates = [xBoxCoordinate, yBoxCoordinate];
	}

	if (lineOrientation == HORIZONTAL) {
		yBoxCoordinate--;
	} else {
		xBoxCoordinate--;
	}

	topClaimed = boxClaimedOn(TOP, xBoxCoordinate, yBoxCoordinate);
	bottomClaimed = boxClaimedOn(BOTTOM, xBoxCoordinate, yBoxCoordinate);
	leftClaimed = boxClaimedOn(LEFT, xBoxCoordinate, yBoxCoordinate);
	rightClaimed = boxClaimedOn(RIGHT, xBoxCoordinate, yBoxCoordinate);
	if (topClaimed && bottomClaimed && leftClaimed && rightClaimed) {
		//console.log("This box has an owner!!");
		adjacentBoxCoodinates = [xBoxCoordinate, yBoxCoordinate];
	}
	return boxCoordinates.concat(adjacentBoxCoodinates);
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
function playTurn(lineOrientation, xLineCoordinate, yLineCoordinate) {
	var sideClaimed = false;
	var positionOfBoxClaimed = false;
	var pointsAwarded = 0;
	var playerOneScore = 0;
	var playerTwoScore = 0;
	var finishedMessage = "";


	console.log(turnsTaken);
	sideClaimed = claimBoxSide(lineOrientation, xLineCoordinate, yLineCoordinate);
	if (sideClaimed) {
		//console.log("This line is already claimed.");
		return 0;
	}

	visuallyMarkClaim(markerForCurrentPlayer, lineOrientation, xLineCoordinate, yLineCoordinate);

	positionOfBoxClaimed = determineBoxOwner(lineOrientation, xLineCoordinate, yLineCoordinate);
	
	if (visuallyMarkClaim(markerForCurrentPlayer, "box", positionOfBoxClaimed[0], positionOfBoxClaimed[1])) {
		pointsAwarded++;
	}
	if (visuallyMarkClaim(markerForCurrentPlayer, "box", positionOfBoxClaimed[2], positionOfBoxClaimed[3])) {
		pointsAwarded++;
	}

	if (!pointsAwarded) {
		markerForCurrentPlayer = (markerForCurrentPlayer != PLAYER_ONE_MARKER) ? PLAYER_ONE_MARKER : PLAYER_TWO_MARKER;
	} else {
		scoreKeeper[markerForCurrentPlayer] += pointsAwarded;
		console.log(scoreKeeper[markerForCurrentPlayer])
	}

	playerOneScore = scoreKeeper[PLAYER_ONE_MARKER];
	playerTwoScore = scoreKeeper[PLAYER_TWO_MARKER];

	if ((playerOneScore + playerTwoScore) == TOTAL_BOXES_AVAILABLE) {
		if (playerOneScore > playerTwoScore) {
			finishedMessage = "Player One Wins!";
			return 1;
		} else if (playerOneScore < playerTwoScore) {
			finishedMessage = "Player Two Wins!";
			return 1;
		}
		finishedMessage = "Tie Game!";

		if (confirm(finishedMessage + "\n\nWould you like to play again?")) {
			window.location.reload(true);
		}
	}
	//console.log("valid move");
	return 1;
}

window.onload = startGame;