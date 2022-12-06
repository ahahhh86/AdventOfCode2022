'use strict';



function solveDay03() {
	function getRucksackContent(value) {
		let result = [];

		for (let i in value) {
			let pocketContent = ["", ""];

			let buffer = value[i];
			const bufferHalf = value[i].length/2;
			pocketContent[0] = buffer.slice(0, bufferHalf);
			pocketContent[1] = buffer.slice(bufferHalf);

			result.push(pocketContent);
		}

		return result;
	}



	function getDoubleLetters(pairs) {
		// Finds the *first* letter, that is in both strings of pair
		function getDoubleLetter(pair) {
			for (let i in pair[0]) {
				for (let j in pair[1]) {
					if (pair[0][i] === pair[1][j]) {
						return pair[0][i];
					}
				}
			}

			alert("No pair found. getDoubleLetter()");
			return "";
		}



		let result = [];

		for (let i in pairs) {
			result.push(getDoubleLetter(pairs[i]));
		}

		return result;
	}



	function getGroupBadges(value) {
		// TODO: Refactor - One function that returns a string of all common letters of two strings, run two times / maybe merge with Method from part 1: value for exit early
		function getBadgeLetter(triplet) {
			for (let i in triplet[0]) {
				for (let j in triplet[1]) {
					if (triplet[0][i] === triplet[1][j]) {
						for (let k in triplet[2]) {
							if (triplet[0][i] === triplet[2][k]) {
								return triplet[0][i];
							}
						}
					}
				}
			}

			alert("No triplet found. getBadgeLetter()");
			return "";
		}



		let result = [];
		const GroupSize = 3;

		for (let i = 0; i < value.length; i += GroupSize) {
			result.push(getBadgeLetter([value[i], value[i+1], value[i+2]]));
		}

		return result;
	}



	function getPriorities(value) {
		function getPriority(charValue) {
			const ParseOffset = 9;
			const UppercaseOffset = 26;

			if (charValue.length !== 1) {
				alert("Invalid Input getPriority(). Only one letter allowed");
				return -1;
			}

			if (charValue === charValue.toUpperCase()) {
				return parseInt(charValue, 36) - ParseOffset + UppercaseOffset;
			} else {
				return parseInt(charValue, 36) - ParseOffset;
			}
		}



		let result = 0;

		for (let i in value) {
			result += getPriority(value[i]);
		}

		return result;
	}



	const input = document.getElementById("data_input").value.split("\n");
	const inputData = getRucksackContent(input);
	const doubleLetters = getDoubleLetters(inputData);
	const groupBadges = getGroupBadges(input);

	document.getElementById('solution_d03_p1').innerHTML = getPriorities(doubleLetters);
	document.getElementById('solution_d03_p2').innerHTML = getPriorities(groupBadges);
}
