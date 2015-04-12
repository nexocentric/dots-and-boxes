//----------------------------------------------------------
// script globals
//----------------------------------------------------------
var TESTING_MODE = false;
var NEUTRAL_MARKER = 0;
var PLAYER_ONE_MARKER = 1;
var PLAYER_TWO_MARKER = 2;
var GAME_GRID_COLUMNS = 4;
var GAME_GRID_ROWS = 4;
var TOTAL_BOXES_AVAILABLE = GAME_GRID_COLUMNS * GAME_GRID_ROWS;
var BOX_OFFSET = 2;
var HORIZONTAL = "HORIZONTAL";
var VERTICAL = "VERTICAL";
var IMAGES_FOLDER = "images/";
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
function createArray(numberOfColumns, numberOfRows)
{
	//--------------------------------------
	// declarations
	//--------------------------------------
	var createdArray = [];

	//--------------------------------------
	// initializations
	//--------------------------------------
	numberOfColumns = numberOfColumns || 0;
	numberOfRows = numberOfRows || 0;

	//--------------------------------------
	// safety check
	//--------------------------------------
	if ((numberOfColumns + numberOfRows) == 0) {
		return createdArray;
	}

	//--------------------------------------
	// if only columns were specified
	//--------------------------------------
	if (numberOfRows == 0 && numberOfColumns > 0) {
		createdArray = new Array(numberOfColumns);

		//--------------------------------------
		// create a single dimensional array
		//--------------------------------------
		for (var column = 0; column < numberOfColumns; column++) {
			createdArray[column] = "" + NEUTRAL_MARKER;
		}

		return createdArray;
	} else {
		createdArray = new Array(numberOfColumns);
	}

	//--------------------------------------
	// create a multidimensional array and
	// initialize it
	//--------------------------------------
	for (var newRow = 0; newRow < numberOfRows; newRow++) {
		//--------------------------------------
		// add columns to the row created
		//--------------------------------------
		createdArray[newRow] = new Array(numberOfColumns);

		//initialized
		for (var newColumn = 0; newColumn < numberOfColumns; newColumn++) {
			createdArray[newRow][newColumn] = "" + NEUTRAL_MARKER;
		}
	}
	return createdArray;
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// Used to notify the players of their respective turns.
// [parameters]
// none
// [return]
// none
//==========================================================
function alertPlayer(playerToAlert)
{
	//disable alerts when testing
	if (TESTING_MODE) {
		return;
	}
	alert("Go ahead player " + playerToAlert + "!");
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// Initializes the the array used for tracking boxes claimed
// on the grid.
// [parameters]
// none
// [return]
// none
//==========================================================
function startGame()
{
	//create the game board based on script parameters
	boxesClaimed = createArray(
		GAME_GRID_ROWS + BOX_OFFSET,
		GAME_GRID_COLUMNS + BOX_OFFSET
	);

	//show which player's turn it is initially
	alertPlayer(PLAYER_ONE_MARKER);

	//return the box grid for testing
	return boxesClaimed;
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// Dynamically loads an image to be used to mark an action
// on the board.
// [parameters]
// 1) a marker used to determine which player made the move
// 2) the type of resource to use (line|box)
// 3) the x coordinate of the resource to replace
// 4) the y coordinate of the resource to replace
// [return]
// 1) a path to the resource if coordinates are valid
// 2) a blank string if the resource coordinates are invalid
//==========================================================
function replaceResource(playerMarker, resourceType, xCoordinate, yCoordinate) {
	//--------------------------------------
	// safety check
	//--------------------------------------
	if (xCoordinate < 0 || yCoordinate < 0) {
		return "";
	}

	//--------------------------------------
	// initializations
	//--------------------------------------
	var resourceSelector = "." + resourceType.toLowerCase() + "-" + xCoordinate + "-" + yCoordinate + " > img";
	var resourcePath = IMAGES_FOLDER + playerMarker + "-" + resourceType + ".svg";
	var tagToReplace = "<img>";
	var imageExists = false;
				
	//--------------------------------------
	// replace the image
	//--------------------------------------
	var loadedImage = $(tagToReplace).attr("src", resourcePath).load(function() {
		//image exists replace the image on the board
		$(resourceSelector).first().replaceWith(loadedImage);
	});
	return resourcePath;
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// Checks a side of a grid box to check if it has been taken
// by a player.
// [parameters]
// 1) the side of the box to check
// 2) the column of the box
// 3) the row of the box
// [return]
// 1) true if claimed false otherwise
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
// Attempts to claim a side of the box selected.
// [parameters]
// 1) the orientation of the line selected
// 2) the column of the box
// 3) the row of the box
// [return]
// 1) true if the line was already claimed
// 2) false if was previously unclaimed
// 3) returns -1 if the coordinates are out of range
//==========================================================
function claimBoxSide(lineOrientation, xLineCoordinate, yLineCoordinate)
{
	//--------------------------------------
	// declarations
	//--------------------------------------
	var sideClaimed = false;
	var selectedBoxClaims = "";
	var adjacentBoxClaims = "";
	var xCoordinateMax = GAME_GRID_COLUMNS + BOX_OFFSET;
	var xCoordinateMin = 0;
	var yCoordinateMax = GAME_GRID_COLUMNS + BOX_OFFSET;
	var yCoordinateMin = 0;
	var xWithinRange = false;
	var yWithinRange = false;

	//--------------------------------------
	// setup range checks
	//--------------------------------------
	xWithinRange = (
		xCoordinateMin <= xLineCoordinate 
		&& xLineCoordinate < xCoordinateMax
	);
	yWithinRange = (
		yCoordinateMin <= yLineCoordinate
		&& yLineCoordinate < yCoordinateMax
	);

	//--------------------------------------
	// test range
	//--------------------------------------
	if (!xWithinRange || !yWithinRange) {
		return -1;
	}

	//--------------------------------------
	// use the orientation of the line
	// selected to perform the check
	//--------------------------------------
	if (lineOrientation == HORIZONTAL) {
		sideClaimed = boxClaimedOn(TOP, xLineCoordinate, yLineCoordinate);
	} else {
		sideClaimed = boxClaimedOn(LEFT, xLineCoordinate, yLineCoordinate);
	}

	//--------------------------------------
	// side was already claimed
	//--------------------------------------
	if (sideClaimed) {
		return true;
	}

	//--------------------------------------
	// if left side was unclaimed
	//--------------------------------------
	if (lineOrientation == HORIZONTAL) {
		//--------------------------------------
		// extract the current claims from the
		// selected box and its vertically
		// adjacent box
		//--------------------------------------
		selectedBoxClaims = boxesClaimed[xLineCoordinate][yLineCoordinate];
		adjacentBoxClaims = boxesClaimed[xLineCoordinate][yLineCoordinate - 1];

		//--------------------------------------
		// append the new claims to the selected
		// boxes
		//--------------------------------------
		boxesClaimed[xLineCoordinate][yLineCoordinate] = selectedBoxClaims + TOP;
		boxesClaimed[xLineCoordinate][yLineCoordinate - 1] = adjacentBoxClaims + BOTTOM;
		return false;
	}

	//--------------------------------------
	// extract the current claims from the
	// selected box and its horizontally
	// adjacent box
	//--------------------------------------
	selectedBoxClaims = boxesClaimed[xLineCoordinate][yLineCoordinate];
	adjacentBoxClaims = boxesClaimed[xLineCoordinate - 1][yLineCoordinate];
	
	//--------------------------------------
	// append new clainms to both boxes
	//--------------------------------------
	boxesClaimed[xLineCoordinate][yLineCoordinate] = selectedBoxClaims + LEFT;
	boxesClaimed[xLineCoordinate - 1][yLineCoordinate] = adjacentBoxClaims + RIGHT;
	return false;
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// Used to determine the owner of the box selected. This 
// also checks adjacent boxes just in case the line selected
// closes an adjacent box instead of the one selected.
// [parameters]
// 1) the orientation of the line
// 2) the column of the box
// 3) the row of the box
// [return]
// 1) a one dimensional array of coordinates for the box
//    that was selected and an adjacent box based on line
//    orientation [box1x, box1y, box2x, box2y]
//==========================================================
function determineBoxOwner(lineOrientation, xBoxCoordinate, yBoxCoordinate)
{
	//--------------------------------------
	// declarations
	//--------------------------------------
	var topClaimed = false;
	var bottomClaimed = false;
	var leftClaimed = false;
	var rightClaimed = false;
	var topAdjacent = 0;
	var leftAdjacent = 0;
	var boxCoordinates = [-1, -1];
	var adjacentBoxCoodinates = [-1, -1];

	//--------------------------------------
	// check the selected box first
	//--------------------------------------
	topClaimed = boxClaimedOn(TOP, xBoxCoordinate, yBoxCoordinate);
	bottomClaimed = boxClaimedOn(BOTTOM, xBoxCoordinate, yBoxCoordinate);
	leftClaimed = boxClaimedOn(LEFT, xBoxCoordinate, yBoxCoordinate);
	rightClaimed = boxClaimedOn(RIGHT, xBoxCoordinate, yBoxCoordinate);

	//--------------------------------------
	// if all sides are claimed return the
	// coordinates of the box
	//--------------------------------------
	if (topClaimed && bottomClaimed && leftClaimed && rightClaimed) {
		boxCoordinates = [xBoxCoordinate, yBoxCoordinate];
	}

	//--------------------------------------
	// select an adjacent box by negative
	// offset based on line orientation
	//--------------------------------------
	if (lineOrientation == HORIZONTAL) {
		yBoxCoordinate--;
	} else {
		xBoxCoordinate--;
	}

	//--------------------------------------
	// check adjacent box for claimed sides
	//--------------------------------------
	topClaimed = boxClaimedOn(TOP, xBoxCoordinate, yBoxCoordinate);
	bottomClaimed = boxClaimedOn(BOTTOM, xBoxCoordinate, yBoxCoordinate);
	leftClaimed = boxClaimedOn(LEFT, xBoxCoordinate, yBoxCoordinate);
	rightClaimed = boxClaimedOn(RIGHT, xBoxCoordinate, yBoxCoordinate);

	//--------------------------------------
	// if all sides are claimed return the
	// coordinates of the adjacent box
	//--------------------------------------
	if (topClaimed && bottomClaimed && leftClaimed && rightClaimed) {
		adjacentBoxCoodinates = [xBoxCoordinate, yBoxCoordinate];
	}

	//combine both coordinates for use
	return boxCoordinates.concat(adjacentBoxCoodinates);
}

//==========================================================
// [author]
// Dodzi Y. Dzakuma
// [summary]
// This function is run when a line is clicked. It takes the
// coordinates of the selected resource and calculates if 
// the selection of that line will cause a player to claim
// boxes on the grid.
// [parameters]
// 1) the orientation of the line that was clicked
// 2) the column of the selected line
// 3) the row of the selected line
// [return]
// 1) one if the move made by the player was allowed
// 2) zero if the move is not allowed
//==========================================================
function playTurn(lineOrientation, xLineCoordinate, yLineCoordinate)
{
	//--------------------------------------
	// declarations
	//--------------------------------------
	var sideClaimed = false;
	var positionOfBoxClaimed = false;
	var pointsAwarded = 0;
	var playerOneScore = 0;
	var playerTwoScore = 0;
	var finishedMessage = "";


	//--------------------------------------
	// attempt to claim a side of the box
	//--------------------------------------
	sideClaimed = claimBoxSide(lineOrientation, xLineCoordinate, yLineCoordinate);
	if (sideClaimed) {
		return 0;
	}

	//--------------------------------------
	// replace the line image with an image
	// representing the player who played
	// this turn
	//--------------------------------------
	replaceResource(markerForCurrentPlayer, lineOrientation, xLineCoordinate, yLineCoordinate);

	//--------------------------------------
	// check the box and an adjacent box to
	// see if the player could claim it
	//--------------------------------------
	positionOfBoxClaimed = determineBoxOwner(lineOrientation, xLineCoordinate, yLineCoordinate);
	if (replaceResource(markerForCurrentPlayer, "box", positionOfBoxClaimed[0], positionOfBoxClaimed[1])) {
		//points for the selected box
		pointsAwarded++;
	}
	if (replaceResource(markerForCurrentPlayer, "box", positionOfBoxClaimed[2], positionOfBoxClaimed[3])) {
		//points for the adjacent box
		pointsAwarded++;
	}

	//--------------------------------------
	// if no points were awarded it the next
	// player's turn otherwise the current
	// player gets another turn
	//--------------------------------------
	if (!pointsAwarded) {
		//next player
		markerForCurrentPlayer = (markerForCurrentPlayer != PLAYER_ONE_MARKER) ? PLAYER_ONE_MARKER : PLAYER_TWO_MARKER;
	} else {
		//add the points to the players tally and they
		scoreKeeper[markerForCurrentPlayer] += pointsAwarded;
		console.log(scoreKeeper[markerForCurrentPlayer])
	}

	//--------------------------------------
	// get the scores to determine when the
	// game ends
	//--------------------------------------
	playerOneScore = scoreKeeper[PLAYER_ONE_MARKER];
	playerTwoScore = scoreKeeper[PLAYER_TWO_MARKER];

	//--------------------------------------
	// check the end condition for the game
	//--------------------------------------
	if ((playerOneScore + playerTwoScore) == TOTAL_BOXES_AVAILABLE) {
		//--------------------------------------
		// set message for displaying a winner
		//--------------------------------------
		if (playerOneScore > playerTwoScore) {
			finishedMessage = "Player One Wins!";
		} else if (playerOneScore < playerTwoScore) {
			finishedMessage = "Player Two Wins!";
		} else {
			finishedMessage = "Tie Game!";
		}

		//--------------------------------------
		// display the message and ask if they
		// want to play another round
		//--------------------------------------
		if (
			TESTING_MODE == false 
			&& confirm(finishedMessage + "\n\nWould you like to play again?")) {
			window.location.reload(true);
		}
	}

	alertPlayer(markerForCurrentPlayer);
	return 1;
}

window.onload = startGame;