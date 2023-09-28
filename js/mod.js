let modInfo = {
	name: 'Color Factory',
	id: 'Yrahcaz7-ModTree-ColorFactory',
	author: 'Yrahcaz7',
	pointsName: 'coins',
	modFiles: ['layers.js', 'technical/tree.js'],
	initialStartPoints: new Decimal(0),
	offlineLimit: 1, // In hours
	allowSmall: true,
};

const VERSION = {
	num: '3.0',
	name: 'The Reset',
};

let winText = '<h3>You won the game!</h3><br>However, it isn\'t the end yet...<br>Wait for more updates for further content.';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Determines if it should show points/sec
function canGenPoints() {
	return false;
};

// Calculate points/sec!
function getPointGen() {
	return new Decimal(0);
};

function addedPlayerData() { return {
}};

// Display extra things at the top of the page
var displayThings = [
];

// Determines when the game "ends"
function isEndgame() {
	return false;
};

// Style for the background, can be a function
var backgroundStyle = {
};

function maxTickLength() {
	return 1; // In seconds
};

function fixOldSave(oldVersion) {
	if (player.r) {
		player = null;
		save(true);
		window.location.reload();
	};
};
