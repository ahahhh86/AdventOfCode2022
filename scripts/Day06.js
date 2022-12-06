'use strict';



function solveDay06() {
	function findFirstMarker(value, markerLength) {
		function hasUniqueLetters(letters) {
			for (let i = 0; i < letters.length-1; ++i) {
				for (let j = i+1; j < letters.length; ++j) {
					if (letters[i] == letters[j]) {
						return false;
					}
				}
			}

			return true;
		}



		for (let i = markerLength; i <= value.length; ++i) {
			if (hasUniqueLetters(value.substr(i-markerLength, markerLength))) {
				return i;
			}
		}
	}



	const input = document.getElementById("data_input").value;

	document.getElementById('solution_d06_p1').innerHTML = findFirstMarker(input, 4);
	document.getElementById('solution_d06_p2').innerHTML = findFirstMarker(input, 14);
}
