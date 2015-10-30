var totalMines;
var minesLeft;
var minesOnBoard;

var cols;
var rows;

var board = [];


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

function checkIfBomb(i, j) {
	var clickedCell = document.getElementById('cell-'+i+'-'+j);
	var value = parseInt(clickedCell.getAttribute('value'));
	if (value === -1) {
		console.log('You lose');
		clickedCell.classList.add('clicked-bomb');
	} else {
		clickedCell.classList.add('clicked');
		var cellText = clickedCell.firstChild;
		cellText.classList.remove('number-hidden');
		cellText.classList.add('number-active');
	}
}

function drawBoard() {

	var table = document.createElement('table');
	var tbody = document.createElement('tbody');

	table.classList.add('bordered');
	table.setAttribute('align', 'center');

	for (var i = 0; i < rows; i++) {
		var row = document.createElement('tr');
		for (var j = 0; j < cols; j++) {
			var cell = document.createElement('td');
			var cellWrapper = document.createElement('p');
			var cellValue = document.createTextNode(board[i][j]);
			var clickHandler = 'checkIfBomb('+i+','+j+')';

			cellWrapper.appendChild(cellValue);
			cellWrapper.classList.add('number-hidden');

			cell.appendChild(cellWrapper);
			cell.classList.add('bordered-cell');
			cell.setAttribute('id', 'cell-'+i+'-'+j);
			cell.setAttribute('value', board[i][j]);
			cell.setAttribute('onclick', clickHandler);
			row.appendChild(cell);
		}
		tbody.appendChild(row);
	}
	table.appendChild(tbody);
	document.getElementById('board').appendChild(table);
}

function checkNeighbors(i, j) {
	var xMin = i-1 < 0 ? 0 : i-1;
	var xMax = i+1 > rows-1 ? rows-1 : i+1;
	var yMin = j-1 < 0 ? 0 : j-1;
	var yMax = j+1 > cols-1 ? cols-1: j+1;

	if (board[xMin][yMin] === -1) board[i][j]++;
	if (board[xMin][j] === -1) board[i][j]++;
	if (board[xMin][yMax] === -1) board[i][j]++;
	if (board[xMax][yMin] === -1) board[i][j]++;
	if (board[xMax][j] === -1) board[i][j]++;
	if (board[xMax][yMax] === -1) board[i][j]++;
	if (board[i][yMin] === -1) board[i][j]++;
	if (board[i][yMax] === -1) board[i][j]++;

}

function init(difficulty) {
	console.log(difficulty);
	// Set the mine count
	switch (difficulty) {
		case 0:
			totalMines = 10;
			minesLeft = 10;
			cols = 8;
			rows = 8;
			break;
		case 1:
			totalMines = 40;
			minesLeft = 40;
			break;
		case 2:
			totalMines = 99;
			minesLeft = 99;
			break;
		default:
			totalMines = 10;
			minesLeft = 10;
			cols = 8;
			rows = 8;
			break;
	}
	minesOnBoard = 0;

	// Initialize game board with 0s
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (board[i] === undefined) {
				board[i] = [];
			}
			board[i].push(0);
		}
	}
	
	while (minesOnBoard <= totalMines) {
		var randomX = getRandomInt(0, rows);
		var randomY = getRandomInt(0, cols);

		board[randomX][randomY] = -1;
		minesOnBoard++;
	}

	// Now go through game board again and check neighbors
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (board[i][j] !== -1) {
				checkNeighbors(i, j);
			}
		}
	}

	// Remove the difficulty buttons for now
	var container = document.getElementById('game-container');
	container.removeChild(document.getElementById('options'));

	drawBoard();
}